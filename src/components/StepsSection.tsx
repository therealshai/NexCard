
import { motion } from "framer-motion";
import { CheckCircle, Upload, Edit, Share2, Globe, TrendingUp, Video } from "lucide-react";
import { BentoGrid, BentoItem } from "@/components/ui/bento-grid";

const stepsItems: BentoItem[] = [
  {
    title: "Upload Your Photo",
    description: "Choose your professional profile picture and upload it to your social card.",
    icon: <Upload className="w-4 h-4 text-primary" />,
    status: "Step 1",
    tags: ["Image", "Profile"],
  },
  {
    title: "Add Your Details",
    description: "Fill in your contact information and links to your professional profiles.",
    icon: <Edit className="w-4 h-4 text-primary" />,
    status: "Step 2",
    tags: ["Details", "Contact"],
    colSpan: 2,
    hasPersistentHover: true,
  },
  {
    title: "Share Your Card",
    description: "Generate a shareable link or download your social card as PNG or JPG.",
    icon: <Share2 className="w-4 h-4 text-primary" />,
    status: "Step 3",
    tags: ["Share", "Download"],
    colSpan: 2,
  },
  {
    title: "Track Engagement",
    description: "Monitor who views and interacts with your professional card.",
    icon: <TrendingUp className="w-4 h-4 text-primary" />,
    status: "Step 4",
    tags: ["Analytics", "Stats"],
  }
];

export function StepsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">How It Works</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Create your professional social card in four simple steps
          </p>
        </div>
        
        <BentoGrid items={stepsItems} />
      </div>
    </section>
  );
}
