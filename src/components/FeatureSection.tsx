import React from "react";
import { Code, Cloud, Zap, Database } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <Card className="h-full bg-card text-card-foreground border-2 border-primary/10 transition-all hover:shadow-[0_5px_30px_rgba(59,130,246,0.3)] group overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <CardHeader className="pb-2 relative z-10">
      <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
        {icon}
      </div>
      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
        {title}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="relative z-10">
      <div className="text-sm text-muted-foreground">
        {/* Placeholder for additional feature details */}
      </div>
    </CardContent>
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 to-blue-600/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
  </Card>
);

interface FeatureSectionProps {
  features?: FeatureCardProps[];
}

const FeatureSection = ({
  features = [
    {
      icon: <Code className="h-6 w-6 text-blue-600" />,
      title: "Multiple Frameworks",
      description:
        "Support for Next.js, Vue, React, and Node.js with optimized templates",
    },
    {
      icon: <Cloud className="h-6 w-6 text-purple-600" />,
      title: "AI-Powered Generation",
      description:
        "Choose from Cloudflare Workers AI, OpenAI, DeepSeek, or Google Gemini",
    },
    {
      icon: <Zap className="h-6 w-6 text-amber-600" />,
      title: "Cloudflare Integration",
      description:
        "Seamless integration with Cloudflare Pages, D1, KV, R2, and Durable Objects",
    },
    {
      icon: <Database className="h-6 w-6 text-green-600" />,
      title: "Production Ready",
      description:
        "Generate complete, deployable projects with proper documentation",
    },
  ],
}: FeatureSectionProps) => {
  return (
    <section className="w-full py-12 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Generate production-ready full-stack code with our AI-powered
            platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium text-sm">
            Start Building Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
