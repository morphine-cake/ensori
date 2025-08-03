"use client";

import Footer from "@/components/Footer";
import LandingPage from "@/components/LandingPage";

import TodoItem, { Todo, TodoStatus } from "@/components/TodoItem";
import TopBar from "@/components/TopBar";
import { useAuth } from "@/contexts/AuthContext";
import {
  addTodo as firestoreAddTodo,
  deleteTodo as firestoreDeleteTodo,
  updateTodo as firestoreUpdateTodo,
  getUserLastActiveDate,
  handleDailyReset,
  subscribeToUserTodos,
} from "@/lib/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

// Loading Screen Component
const LoadingScreen = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg-default backdrop-blur-sm w-screen h-screen"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="flex items-center justify-center"
          >
            <svg
              width="27"
              height="27"
              viewBox="0 0 54 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-sf-fg-default drop-shadow-sm"
            >
              <path
                d="M28.2812 0.00671387C42.5975 0.673119 53.9999 12.4906 54 26.9716C54 41.8805 41.9138 53.9666 27.0049 53.9667C12.0959 53.9667 0.00976562 41.8805 0.00976562 26.9716C0.00986887 12.5116 11.3791 0.70742 25.666 0.00964355C11.9114 0.720031 9.04005 12.519 9.04004 26.9706C9.04004 41.8795 12.096 53.9656 27.0049 53.9657C41.9138 53.9657 43.8477 41.8795 43.8477 26.9706C43.8477 12.4981 42.0255 0.685921 28.2812 0.00671387Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Ensori - Daily Productivity Todo App",
  description:
    "A beautiful, minimalist todo app with daily workflow system. Automatically resets completed tasks at midnight while preserving ongoing work.",
  url: "https://ensori.today",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Any",
  browserRequirements: "Modern web browser with JavaScript enabled",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Burak Başcı",
  },
  datePublished: "2024-01-01T00:00:00.000Z", // Static date instead of dynamic
  inLanguage: "en-US",
  isAccessibleForFree: true,
  keywords:
    "todo app, productivity, task management, daily workflow, minimalist",
  screenshot: "https://ensori.today/thumbnail.png",
};

function HomeContent() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [autoFocusId, setAutoFocusId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [showLoading, setShowLoading] = useState(true);

  // Function to handle daily reset - remove done items for current user
  const handleUserDailyReset = useCallback(async () => {
    if (!user?.uid) return;

    const today = new Date().toDateString();

    try {
      const lastActiveDate = await getUserLastActiveDate(user.uid);

      if (lastActiveDate !== today) {
        console.log("🌅 New day detected! Clearing done items for user...");
        await handleDailyReset(user.uid);
      }

      setCurrentDate(today);
    } catch (error) {
      console.error("Error during daily reset:", error);
    }
  }, [user?.uid]);

  // Load user's todos and setup real-time subscription
  useEffect(() => {
    if (!user?.uid) return;

    let unsubscribe: (() => void) | undefined;

    const initializeUserData = async () => {
      try {
        const today = new Date().toDateString();
        setCurrentDate(today);

        // Check for daily reset first
        await handleUserDailyReset();

        // Setup real-time subscription to user's todos
        unsubscribe = subscribeToUserTodos(user.uid, (userTodos) => {
          if (userTodos.length === 0) {
            // Create three default todo items for new users
            const createDefaultTodos = async () => {
              try {
                const defaultTodos = [
                  { text: "", status: "todo" as TodoStatus },
                  { text: "", status: "todo" as TodoStatus },
                  { text: "", status: "todo" as TodoStatus },
                ];

                const todoPromises = defaultTodos.map((todo) =>
                  firestoreAddTodo(user.uid, todo)
                );

                const todoIds = await Promise.all(todoPromises);
                setAutoFocusId(todoIds[0]);
              } catch (error) {
                console.error("Error creating default todos:", error);
              }
            };

            createDefaultTodos();
          } else {
            setTodos(userTodos);
          }

          setIsLoaded(true);
        });
      } catch (error) {
        console.error("Error initializing user data:", error);
        setIsLoaded(true);
      }
    };

    initializeUserData();

    // Cleanup subscription on unmount or user change
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user?.uid, handleUserDailyReset]);

  // Automatic date checking - runs every minute to detect new day
  useEffect(() => {
    const checkDateChange = () => {
      handleUserDailyReset();

      // Also update current date display every minute
      const now = new Date().toDateString();
      if (currentDate !== now) {
        setCurrentDate(now);
      }
    };

    // Check immediately
    checkDateChange();

    // Then check every minute (60000ms)
    const interval = setInterval(checkDateChange, 60000);

    return () => clearInterval(interval);
  }, [handleUserDailyReset, currentDate]);

  // Clear autoFocusId after it's been used
  useEffect(() => {
    if (autoFocusId) {
      const timer = setTimeout(() => {
        setAutoFocusId(null);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocusId]);

  const addTodo = useCallback(async () => {
    if (!user?.uid) return;

    try {
      const newTodoId = await firestoreAddTodo(user.uid, {
        text: "",
        status: "todo",
      });
      setAutoFocusId(newTodoId);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }, [user?.uid]);

  const updateTodoStatus = useCallback(
    async (id: string, newStatus: TodoStatus) => {
      try {
        await firestoreUpdateTodo(id, { status: newStatus });
      } catch (error) {
        console.error("Error updating todo status:", error);
      }
    },
    []
  );

  const updateTodoText = useCallback(async (id: string, newText: string) => {
    try {
      await firestoreUpdateTodo(id, { text: newText });
    } catch (error) {
      console.error("Error updating todo text:", error);
    }
  }, []);

  const deleteTodo = useCallback(async (id: string) => {
    try {
      await firestoreDeleteTodo(id);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }, []);

  // Keyboard shortcut for new item (⌘ + Enter)
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // Cmd+Enter on Mac or Ctrl+Enter on Windows
      if (
        e.key === "Enter" &&
        (e.metaKey || e.ctrlKey) &&
        !e.shiftKey &&
        !e.altKey
      ) {
        e.preventDefault();
        addTodo();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [addTodo]);

  // Loading screen timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000); // Show loading for 1 second

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <LoadingScreen isVisible={showLoading} />
      <div className="sf-app min-h-screen bg-bg-default flex flex-col">
        <TopBar onAddItem={addTodo} currentDate={currentDate} />

        <main className="sf-main-content w-full mx-auto flex-1 p-[0_16px_40px_16px]">
          <div className="sf-todo-list mx-auto w-full max-w-sjofn">
            <AnimatePresence initial={false}>
              {todos.map((todo, index) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onStatusChange={updateTodoStatus}
                  onTextChange={updateTodoText}
                  onDelete={deleteTodo}
                  autoFocus={todo.id === autoFocusId}
                />
              ))}
            </AnimatePresence>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default function Home() {
  const { user, loading } = useAuth();

  // Show todo app for authenticated users
  if (user) {
    return <HomeContent />;
  }

  // Show landing page immediately for unauthenticated users (no loading screen)
  return <LandingPage />;
}
