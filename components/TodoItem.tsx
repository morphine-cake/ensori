"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export type TodoStatus = "todo" | "inprogress" | "done";

export interface Todo {
  id: string;
  text: string;
  status: TodoStatus;
}

interface TodoItemProps {
  todo: Todo;
  onStatusChange: (id: string, newStatus: TodoStatus) => void;
  onTextChange: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
  autoFocus?: boolean;
}

// SVG Components for status icons
const TodoIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.5 0.0224609C9.57969 0.276611 12 2.85472 12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.85472 2.42031 0.276611 5.5 0.0224609V0H6.5V0.0224609ZM5.5 1.02441C2.97333 1.27526 1 3.40732 1 6C1 8.59265 2.97337 10.7237 5.5 10.9746V1.02441ZM6.5 10.9746C9.02663 10.7237 11 8.59265 11 6C11 3.40732 9.02667 1.27526 6.5 1.02441V10.9746Z"
      fill="currentColor"
    />
  </svg>
);

const InProgressIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 0C9.31371 1.44847e-07 12 2.68629 12 6C12 9.21021 9.47889 11.8316 6.30859 11.9922L6 12L5.70508 11.9932C5.70084 11.993 5.69662 11.9924 5.69238 11.9922C5.64727 11.9899 5.60246 11.9847 5.55762 11.9814C5.50809 11.9778 5.45857 11.9746 5.40918 11.9697C4.3121 11.8625 3.30218 11.4604 2.45898 10.8428C2.44506 10.8326 2.43083 10.8228 2.41699 10.8125C2.28734 10.7158 2.16229 10.6135 2.04102 10.5068C1.94403 10.4216 1.84933 10.3337 1.75781 10.2422C1.53107 10.0154 1.3236 9.77143 1.13672 9.5127C0.478171 8.60253 0.0669512 7.501 0.00683594 6.30664C0.00161715 6.20464 3.65936e-09 6.10236 0 6C1.72804e-08 5.80234 0.00990293 5.60517 0.0292969 5.40918C0.136299 4.31452 0.538066 3.30691 1.15332 2.46484C1.33593 2.21449 1.53769 1.97794 1.75781 1.75781C1.86684 1.64879 1.97995 1.54435 2.09668 1.44434C2.20068 1.35515 2.307 1.26853 2.41699 1.18652C2.43982 1.16953 2.46327 1.15338 2.48633 1.13672C3.32395 0.53049 4.32402 0.135371 5.40918 0.0292969C5.45856 0.0244104 5.5081 0.02124 5.55762 0.0175781C5.60246 0.0143096 5.64728 0.00911355 5.69238 0.00683594C5.79471 0.00158395 5.89732 -1.34654e-08 6 0ZM6 11C8.76142 11 11 8.76142 11 6C11 3.32472 8.89889 1.14053 6.25684 1.00684L6 1V11Z"
      fill="currentColor"
    />
  </svg>
);

const DoneIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 0C9.31371 1.44847e-07 12 2.68629 12 6C12 9.31371 9.31371 12 6 12C2.68629 12 1.38644e-07 9.31371 0 6C1.44847e-07 2.68629 2.68629 -1.44847e-07 6 0Z"
      fill="currentColor"
    />
  </svg>
);

const statusIcons = {
  todo: <TodoIcon />,
  inprogress: <InProgressIcon />,
  done: <DoneIcon />,
};

const statusOrder: TodoStatus[] = ["todo", "inprogress", "done"];

// Delete Icon Component
const DeleteIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 3L3 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M3 3L9 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const TodoItem = React.forwardRef<HTMLDivElement, TodoItemProps>(
  function TodoItem(
    { todo, onStatusChange, onTextChange, onDelete, autoFocus = false },
    ref
  ) {
    const [isEditing, setIsEditing] = useState(false);
    const [localText, setLocalText] = useState(todo.text);
    const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      setLocalText(todo.text);
    }, [todo.text]);

    useEffect(() => {
      if (autoFocus) {
        setIsEditing(true);
      }
    }, [autoFocus]);

    const handleStatusClick = () => {
      const currentIndex = statusOrder.indexOf(todo.status);
      const nextIndex = (currentIndex + 1) % statusOrder.length;
      const newStatus = statusOrder[nextIndex];
      onStatusChange(todo.id, newStatus);
    };

    const handleTextClick = () => {
      setIsEditing(true);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newText = e.target.value;
      setLocalText(newText);

      // Clear existing timeout
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }

      // Set new timeout for auto-save
      const timeout = setTimeout(() => {
        onTextChange(todo.id, newText);
      }, 2000);

      setSaveTimeout(timeout);
    };

    const handleBlur = () => {
      setIsEditing(false);
      // Save immediately on blur
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }
      onTextChange(todo.id, localText);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        // Prevent Shift+Enter from doing anything
        if (e.shiftKey) {
          e.preventDefault();
          return;
        }
        handleBlur();
      }
    };

    const handleDelete = () => {
      onDelete(todo.id);
    };

    useEffect(() => {
      if (isEditing && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isEditing]);

    return (
      <motion.div
        ref={ref}
        className="sf-todo-item-wrapper mt-0"
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{
          opacity: 0,
          scale: 0.95,
          height: 0,
          marginTop: 0,
          marginBottom: 0,
          transition: {
            duration: 0.3,
            ease: "easeInOut",
            height: { duration: 0.2, delay: 0.1 },
            opacity: { duration: 0.15 },
            scale: { duration: 0.15 },
          },
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 1,
          layout: { duration: 0.3, ease: "easeInOut" },
        }}
        layout
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="sf-todo-item flex items-center gap-2 relative h-[40px]">
          {/* Status Icon */}
          <button
            className="sf-todo-status-icon flex items-center justify-center text-fg-default h-full flex-[0_0_auto]"
            onClick={handleStatusClick}
            type="button"
          >
            {statusIcons[todo.status]}
          </button>

          {/* Todo Text */}
          <div className="sf-todo-text flex items-center h-full w-full flex-[1_1_auto] min-w-0">
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={localText}
                onChange={handleTextChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none font-caveat font-normal text-lg text-sf-fg-default leading-[40px] whitespace-nowrap overflow-hidden font-normal caret-sf-fg-default"
                placeholder="Enter todo item..."
              />
            ) : (
              <span
                onClick={handleTextClick}
                className={`font-caveat font-normal text-lg cursor-text block w-full sf-todo-text-span text-sf-fg-default leading-[40px] whitespace-nowrap overflow-x-auto scrollbar-none font-normal ${
                  todo.status === "done" ? "line-through" : ""
                } ${todo.text ? "opacity-100" : "opacity-[0.4]"}`}
              >
                {todo.text || "Enter todo item..."}
              </span>
            )}
          </div>

          {/* Delete Button - shows on hover */}
          {isHovered && (
            <button
              className="sf-delete-button flex items-center justify-center transition-all duration-150 ease-out text-sf-fg-default hover:text-red-500 w-[20px] h-[20px] rounded-[4px] bg-sf-bg-default border-none cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10"
              onClick={handleDelete}
              type="button"
              onMouseEnter={(e) => {
                // Light red tint for light mode, darker red tint for dark mode
                e.currentTarget.style.backgroundColor =
                  "color-mix(in srgb, var(--bg-default) 85%, #ef4444 15%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-default)";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.backgroundColor =
                  "color-mix(in srgb, var(--bg-default) 70%, #ef4444 30%)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.backgroundColor =
                  "color-mix(in srgb, var(--bg-default) 85%, #ef4444 15%)";
              }}
            >
              <DeleteIcon />
            </button>
          )}
        </div>

        {/* Bottom divider with same width and alignment as sf-todo-text */}
        <div className="bg-sf-fg-soft h-[0.5px] ml-[calc(12px+8px)]"></div>
      </motion.div>
    );
  }
);

export default TodoItem;
