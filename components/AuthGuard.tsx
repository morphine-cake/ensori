"use client";

import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import React, { useState } from "react";
import AuthForm from "./AuthForm";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const [showAuthForm, setShowAuthForm] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-default flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          <svg
            width="27"
            height="27"
            viewBox="0 0 54 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-sf-fg-default drop-shadow-sm animate-pulse"
          >
            <path
              d="M28.2812 0.00671387C42.5975 0.673119 53.9999 12.4906 54 26.9716C54 41.8805 41.9138 53.9666 27.0049 53.9667C12.0959 53.9667 0.00976562 41.8805 0.00976562 26.9716C0.00986887 12.5116 11.3791 0.70742 25.666 0.00964355C11.9114 0.720031 9.04005 12.519 9.04004 26.9706C9.04004 41.8795 12.096 53.9656 27.0049 53.9657C41.9138 53.9657 43.8477 41.8795 43.8477 26.9706C43.8477 12.4981 42.0255 0.685921 28.2812 0.00671387Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-bg-default flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <svg
                width="54"
                height="54"
                viewBox="0 0 54 54"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-sf-fg-default drop-shadow-sm mx-auto mb-6"
              >
                <path
                  d="M28.2812 0.00671387C42.5975 0.673119 53.9999 12.4906 54 26.9716C54 41.8805 41.9138 53.9666 27.0049 53.9667C12.0959 53.9667 0.00976562 41.8805 0.00976562 26.9716C0.00986887 12.5116 11.3791 0.70742 25.666 0.00964355C11.9114 0.720031 9.04005 12.519 9.04004 26.9706C9.04004 41.8795 12.096 53.9656 27.0049 53.9657C41.9138 53.9657 43.8477 41.8795 43.8477 26.9706C43.8477 12.4981 42.0255 0.685921 28.2812 0.00671387Z"
                  fill="currentColor"
                />
              </svg>
              <h1 className="text-4xl font-semibold text-sf-fg-default mb-4">
                Ensori
              </h1>
              <p className="text-sf-fg-default opacity-70 text-lg mb-8">
                A beautiful, minimalist todo app with daily workflow system.
                Sign in to access your personal productivity space.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button
                onClick={() => setShowAuthForm(true)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg shadow-lg"
              >
                Get Started
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 grid grid-cols-1 gap-4 text-sm text-sf-fg-default opacity-60"
            >
              <div className="flex items-center justify-center gap-2">
                <span>✓</span>
                <span>Daily workflow system</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>✓</span>
                <span>Automatic task reset at midnight</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>✓</span>
                <span>Sync across all your devices</span>
              </div>
            </motion.div>
          </div>
        </div>

        <AuthForm
          isOpen={showAuthForm}
          onClose={() => setShowAuthForm(false)}
        />
      </div>
    );
  }

  return <>{children}</>;
}
