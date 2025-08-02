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
    await updateDoc(todoRef, {
      ...updates,
      updatedAt: serverTimestamp(),
      lastActiveDate: new Date().toDateString(),
    });
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

// Handle daily reset - remove done todos for user
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

    querySnapshot.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
    });

    await Promise.all(deletePromises);
    console.log("🌅 Daily reset completed - removed done todos");
  } catch (error) {
    console.error("Error during daily reset:", error);
    throw error;
  }
}

// Get user's last active date
export async function getUserLastActiveDate(
  userId: string
): Promise<string | null> {
  try {
    const todosRef = collection(db, TODOS_COLLECTION);
    const q = query(
      todosRef,
      where("userId", "==", userId),
      orderBy("updatedAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const latestTodo = querySnapshot.docs[0].data() as FirestoreTodo;
      return latestTodo.lastActiveDate || null;
    }

    return null;
  } catch (error) {
    console.error("Error getting user last active date:", error);
    return null;
  }
}
