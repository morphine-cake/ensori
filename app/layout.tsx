import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sjöfn - Todo App",
  description: "A beautiful todo app built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-inter bg-bg-default text-fg-default">
        {children}
      </body>
    </html>
  );
}
