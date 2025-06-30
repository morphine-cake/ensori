"use client";

import TodoItem, { Todo, TodoStatus } from "@/components/TodoItem";
import TopBar from "@/components/TopBar";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "sjofn-todos";
const LAST_DATE_KEY = "sjofn-last-date";

// Loading Screen Component
const LoadingScreen = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg-default backdrop-blur-sm"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "var(--bg-default)",
            zIndex: 9999,
          }}
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
              width="40"
              height="40"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-sf-fg-default drop-shadow-sm"
            >
              <path
                d="M3.5224 14.3462C4.52749 11.9197 6.00068 9.71488 7.85786 7.85771C9.71503 6.00054 11.9198 4.52735 14.3463 3.52225C16.7728 2.51716 19.3736 1.99985 22 1.99985C24.6264 1.99985 27.2272 2.51716 29.6537 3.52226C32.0802 4.52736 34.285 6.00055 36.1421 7.85772C37.9993 9.71489 39.4725 11.9197 40.4776 14.3462"
                stroke="currentColor"
                strokeWidth="3.33333"
                strokeLinecap="round"
              />
              <path
                d="M2 22L22 22L42 22"
                stroke="currentColor"
                strokeWidth="3.33333"
                strokeLinecap="round"
              />
              <path
                d="M5.33331 28.6667H38.6666"
                stroke="currentColor"
                strokeWidth="3.33333"
                strokeLinecap="round"
              />
              <path
                d="M8.66669 35.3333H35.3334"
                stroke="currentColor"
                strokeWidth="3.33333"
                strokeLinecap="round"
              />
              <path
                d="M18.6667 42H25.3334"
                stroke="currentColor"
                strokeWidth="3.33333"
                strokeLinecap="round"
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
  name: "Sjöfn - Daily Productivity Todo App",
  description:
    "A beautiful, minimalist todo app with daily workflow system. Automatically resets completed tasks at midnight while preserving ongoing work.",
  url: "https://morphine-cake.github.io/sjofn-todo-app",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Any",
  browserRequirements: "Modern web browser with JavaScript enabled",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "Sjöfn Team",
  },
  datePublished: new Date().toISOString(),
  inLanguage: "en-US",
  isAccessibleForFree: true,
  keywords:
    "todo app, productivity, task management, daily workflow, minimalist",
  screenshot:
    "https://morphine-cake.github.io/sjofn-todo-app/screenshot-wide.png",
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [autoFocusId, setAutoFocusId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [showLoading, setShowLoading] = useState(true);

  // Function to handle daily reset - remove done items, keep todo and inprogress
  const handleDailyReset = useCallback(() => {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem(LAST_DATE_KEY);

    if (lastDate !== today) {
      console.log("🌅 New day detected! Clearing done items...");

      // Filter out done items, keep todo and inprogress
      setTodos((prevTodos) => {
        const persistedTodos = prevTodos.filter(
          (todo) => todo.status !== "done"
        );

        // Save updated todos to localStorage
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedTodos));
          localStorage.setItem(LAST_DATE_KEY, today);
        } catch (error) {
          console.error("Error saving after daily reset:", error);
        }

        return persistedTodos;
      });

      setCurrentDate(today);
    }
  }, []);

  // Load todos from localStorage on mount
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem(STORAGE_KEY);
      const lastDate = localStorage.getItem(LAST_DATE_KEY);
      const today = new Date().toDateString();

      // Set current date
      setCurrentDate(today);

      if (savedTodos && savedTodos !== "[]") {
        const parsedTodos = JSON.parse(savedTodos);

        // Check if it's a new day
        if (lastDate !== today) {
          // Remove done items, keep todo and inprogress
          const persistedTodos = parsedTodos.filter(
            (todo: Todo) => todo.status !== "done"
          );
          setTodos(persistedTodos);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedTodos));
          localStorage.setItem(LAST_DATE_KEY, today);
          console.log("🌅 Daily reset completed on page load");
        } else {
          setTodos(parsedTodos);
        }
      } else {
        // Create three default todo items on first load
        const defaultTodos: Todo[] = [
          {
            id: Date.now().toString(),
            text: "",
            status: "todo",
          },
          {
            id: (Date.now() + 1).toString(),
            text: "",
            status: "todo",
          },
          {
            id: (Date.now() + 2).toString(),
            text: "",
            status: "todo",
          },
        ];
        setTodos(defaultTodos);
        setAutoFocusId(defaultTodos[0].id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTodos));
        localStorage.setItem(LAST_DATE_KEY, today);
      }
    } catch (error) {
      console.error("Error loading todos from localStorage:", error);
      // Fallback to default todos if localStorage fails
      const defaultTodos: Todo[] = [
        {
          id: Date.now().toString(),
          text: "",
          status: "todo",
        },
      ];
      setTodos(defaultTodos);
      setAutoFocusId(defaultTodos[0].id);
      setCurrentDate(new Date().toDateString());
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save todos to localStorage whenever todos change (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch (error) {
        console.error("Error saving todos to localStorage:", error);
      }
    }
  }, [todos, isLoaded]);

  // Automatic date checking - runs every minute to detect new day
  useEffect(() => {
    const checkDateChange = () => {
      handleDailyReset();

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
  }, [handleDailyReset, currentDate]);

  // Clear autoFocusId after it's been used
  useEffect(() => {
    if (autoFocusId) {
      const timer = setTimeout(() => {
        setAutoFocusId(null);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocusId]);

  const addTodo = useCallback(() => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: "",
      status: "todo",
    };
    setTodos((prevTodos) => [newTodo, ...prevTodos]); // Add to top instead of bottom
    setAutoFocusId(newTodo.id);
  }, []);

  const updateTodoStatus = (id: string, newStatus: TodoStatus) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  const updateTodoText = (id: string, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

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
      <div className="sf-app min-h-screen bg-bg-default">
        <TopBar userInitial="B" onAddItem={addTodo} currentDate={currentDate} />

        <main
          className="sf-main-content w-full mx-auto"
          style={{ padding: "0 16px 20vh 16px" }}
        >
          <div className="sf-todo-list space-y-2 mx-auto w-full max-w-sjofn">
            <AnimatePresence mode="popLayout">
              {todos.map((todo) => (
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
      </div>
    </>
  );
}
