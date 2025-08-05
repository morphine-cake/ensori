"use client";

import { AnimatePresence, motion } from "framer-motion";

interface LoadingScreenProps {
  isVisible: boolean;
}

const LoadingScreen = ({ isVisible }: LoadingScreenProps) => {
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

export default LoadingScreen;
