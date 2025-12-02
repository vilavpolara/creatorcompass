export default function GradientHeader({ title }: { title: string }) {
  return (
    <div className="mb-10 p-8 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-xl">
      <h1 className="text-4xl font-bold">{title}</h1>
    </div>
  );
}
