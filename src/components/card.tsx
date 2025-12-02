export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
