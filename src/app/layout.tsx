import "./globals.css";

export const metadata = {
  title: "🧭 CreatorCompass",
  description: "AI-powered YouTube creator dashboard."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
