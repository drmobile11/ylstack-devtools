import React from "react";
import RotatingFeatureCards from "./RotatingFeatureCards";

interface FeatureCarouselProps {
  title?: string;
  description?: string;
  features?: Array<{
    title: string;
    description: string;
    color: string;
  }>;
}

const FeatureCarousel: React.FC<FeatureCarouselProps> = ({
  title = "Our Generator Features",
  description = "Explore our powerful AI-powered code generators",
  features = [
    {
      title: "API Generator",
      description: "Generate RESTful or GraphQL APIs",
      color: "59, 130, 246",
    },
    {
      title: "Component Generator",
      description: "Create reusable UI components",
      color: "236, 72, 153",
    },
    {
      title: "Full Stack Generator",
      description: "Complete applications with frontend and backend",
      color: "99, 102, 241",
    },
    {
      title: "CRUD Generator",
      description: "Generate database operations",
      color: "34, 197, 94",
    },
    {
      title: "Backend Generator",
      description: "Server-side code and routes",
      color: "168, 85, 247",
    },
    {
      title: "Frontend Generator",
      description: "Generate UI components and pages",
      color: "249, 115, 22",
    },
    {
      title: "Color Generator",
      description: "Generate color palettes and themes",
      color: "234, 179, 8",
    },
  ],
}) => {
  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="h-[600px] relative">
          <RotatingFeatureCards features={features} />
        </div>
      </div>
    </section>
  );
};

export default FeatureCarousel;
