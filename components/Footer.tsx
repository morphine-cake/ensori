"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Twitter/X",
      url: "https://x.com/burak_basci",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/brkbsc/",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Share",
      url: "#",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Ensori - Daily Productivity Todo App",
          text: "A beautiful, minimalist todo app with daily workflow system",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="sf-footer w-full p-[12px_16px]"
    >
      <div className="sf-footer-content w-full max-w-sjofn mx-auto">
        <div className="sf-footer-main flex flex-col items-center justify-center gap-4">
          {/* Text and Social Links Row */}
          <div className="sf-footer-bottom flex flex-row items-center justify-center gap-4">
            {/* Main text */}
            <div className="sf-footer-text text-center">
              <p
                className="font-dm-mono font-light text-sf-fg-default opacity-50"
                style={{ fontSize: "10px" }}
              >
                made by{" "}
                <span className="font-dm-mono font-normal">burak başcı</span>{" "}
                with <span className="font-dm-mono font-normal">figma</span> &{" "}
                <span className="font-dm-mono font-normal">cursor ai</span>
              </p>
            </div>

            {/* Social media icons */}
            <div className="sf-footer-social flex items-center gap-2">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.name === "Share" ? "#" : link.url}
                  onClick={link.name === "Share" ? handleShare : undefined}
                  target={link.name === "Share" ? undefined : "_blank"}
                  rel={
                    link.name === "Share" ? undefined : "noopener noreferrer"
                  }
                  className="sf-social-link opacity-50 hover:opacity-100 transition-opacity duration-[168ms] ease-in-out text-sf-fg-default flex items-center justify-center"
                  style={{ width: "12px", height: "12px" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox={link.icon.props.viewBox}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[12px] h-[12px]"
                  >
                    {link.icon.props.children}
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
