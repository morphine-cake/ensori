"use client";

import Footer from "@/components/Footer";
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
  url: "https://morphine-cake.github.io/ensori",
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
  screenshot: "https://morphine-cake.github.io/ensori/screenshot-wide.png",
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

  const updateTodoStatus = useCallback((id: string, newStatus: TodoStatus) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  }, []);

  const updateTodoText = useCallback((id: string, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
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
        <TopBar userInitial="B" onAddItem={addTodo} currentDate={currentDate} />

        <main className="sf-main-content w-full mx-auto flex-1 p-[0_16px_40px_16px]">
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

        <Footer />
      </div>
    </>
  );
}
