import GradientHeader from "@/components/GradientHeader";
import Card from "@/components/card";
import FadeIn from "@/components/FadeIn";

export default function DraftsPage() {
  return (
    <FadeIn>
      <GradientHeader title="Draft Ideas" />

      <Card>
        <p className="text-gray-600 dark:text-gray-300">
          AI-generated script, titles, and content ideas will appear here.
        </p>
      </Card>
    </FadeIn>
  );
}
