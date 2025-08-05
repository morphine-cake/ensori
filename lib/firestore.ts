import { Todo } from "@/components/TodoItem";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export interface FirestoreTodo extends Omit<Todo, "id"> {
  id?: string;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastActiveDate?: string; // For daily reset tracking
  completedAt?: Timestamp; // Track when todo was marked as done
}

const TODOS_COLLECTION = "todos";

// Get user's todos
export async function getUserTodos(userId: string): Promise<Todo[]> {
  try {
    const todosRef = collection(db, TODOS_COLLECTION);
    const q = query(
      todosRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const todos: Todo[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as FirestoreTodo;
      todos.push({
        id: doc.id,
        text: data.text,
        status: data.status,
      });
    });

    return todos;
  } catch (error) {
    console.error("Error getting user todos:", error);
    throw error;
  }
}

// Add a new todo
export async function addTodo(
  userId: string,
  todo: Omit<Todo, "id">
): Promise<string> {
  try {
    const todosRef = collection(db, TODOS_COLLECTION);
    const docRef = await addDoc(todosRef, {
      ...todo,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastActiveDate: new Date().toDateString(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
}

// Update a todo
export async function updateTodo(
  todoId: string,
  updates: Partial<Omit<Todo, "id">>
): Promise<void> {
  try {
    const todoRef = doc(db, TODOS_COLLECTION, todoId);
    const updateData: any = {
      ...updates,
      updatedAt: serverTimestamp(),
      lastActiveDate: new Date().toDateString(),
    };

    // Track when todo is marked as done
    if (updates.status === "done") {
      updateData.completedAt = serverTimestamp();
    }

    await updateDoc(todoRef, updateData);
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
}

// Delete a todo
export async function deleteTodo(todoId: string): Promise<void> {
  try {
    const todoRef = doc(db, TODOS_COLLECTION, todoId);
    await deleteDoc(todoRef);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
}

// Subscribe to user's todos for real-time updates
export function subscribeToUserTodos(
  userId: string,
  callback: (todos: Todo[]) => void
): () => void {
  const todosRef = collection(db, TODOS_COLLECTION);
  const q = query(
    todosRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (querySnapshot) => {
      const todos: Todo[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as FirestoreTodo;
        todos.push({
          id: doc.id,
          text: data.text,
          status: data.status,
        });
      });
      callback(todos);
    },
    (error) => {
      console.error("Error in todos subscription:", error);
    }
  );
}

// Handle daily reset - remove done todos that were completed before today
export async function handleDailyReset(userId: string): Promise<void> {
  try {
    const todosRef = collection(db, TODOS_COLLECTION);
    const q = query(
      todosRef,
      where("userId", "==", userId),
      where("status", "==", "done")
    );

    const querySnapshot = await getDocs(q);
    const deletePromises: Promise<void>[] = [];

    // Get start of today (midnight)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = Timestamp.fromDate(today);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as FirestoreTodo;
      // Only delete todos that were completed before today
      if (data.completedAt && data.completedAt.toDate() < today) {
        deletePromises.push(deleteDoc(doc.ref));
      }
    });

    if (deletePromises.length > 0) {
      await Promise.all(deletePromises);
      console.log(
        `🌅 Daily reset completed - removed ${deletePromises.length} done todos from previous days`
      );
    }
  } catch (error) {
    console.error("Error during daily reset:", error);
    throw error;
  }
}

// Get user's last active date (simplified)
export async function getUserLastActiveDate(
  userId: string
): Promise<string | null> {
  try {
    // Use localStorage for simple date tracking to avoid complex queries
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem(`lastActiveDate_${userId}`);

    if (lastDate !== today) {
      localStorage.setItem(`lastActiveDate_${userId}`, today);
      return lastDate;
    }

    return today;
  } catch (error) {
    console.error("Error getting user last active date:", error);
    return null;
  }
}
