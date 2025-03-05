import React, { useEffect, useRef } from "react";
import { ArrowRight, Code, Database, Server, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface HeroSectionProps {
  title?: string;
  description?: string;
  onStartProject?: () => void;
}

const HeroSection = ({
  title = "AI-Powered Full-Stack Generator",
  description = "Create production-ready full stack applications in minutes with our AI-powered code generator. Support for multiple frameworks and Cloudflare-compatible infrastructure.",
  onStartProject = () => console.log("Start new project clicked"),
}: HeroSectionProps) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate border on load
    const container = containerRef.current;
    if (container) {
      container.classList.add("animate-border");
    }

    // Animate text on load
    const text = textRef.current;
    if (text) {
      text.classList.add("animate-in");
    }

    // Animate description with slight delay
    const description = descriptionRef.current;
    if (description) {
      setTimeout(() => {
        description.classList.add("animate-in");
      }, 300);
    }
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-primary/5 via-primary/2 to-background py-12 md:py-20 px-4 dark:from-primary/10 dark:via-primary/5 dark:to-background overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-60 h-60 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="inline-block mb-3">
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
            <Sparkles className="h-4 w-4 mr-2" />
            Production-Ready Code Generation
          </span>
        </div>

        <h1
          ref={textRef}
          className="text-3xl md:text-5xl font-bold text-foreground mb-4 opacity-0 transform translate-y-8 transition-all duration-700 ease-out"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-400 relative inline-block">
            AI-Powered
            <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 blur-xl -z-10"></span>
          </span>{" "}
          Full-Stack Generator
        </h1>

        <p
          ref={descriptionRef}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 opacity-0 transform translate-y-8 transition-all duration-700 ease-out delay-100"
        >
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 items-center">
          <Button
            onClick={onStartProject}
            className="text-sm md:text-base px-6 py-2.5 h-auto bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Start New Project
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>

          <Button
            variant="outline"
            className="text-sm md:text-base px-6 py-2.5 h-auto font-medium rounded-lg border-primary/20 hover:border-primary/40 transition-all duration-300"
            onClick={() => {
              // In a real app, this would open a demo video or interactive demo
              const demoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Replace with actual demo URL
              window.open(demoUrl, "_blank");
            }}
          >
            View Demo
          </Button>
        </div>

        <div
          ref={containerRef}
          className="mt-8 p-6 border-2 border-primary/20 dark:border-primary/30 rounded-2xl bg-card/50 backdrop-blur-sm relative before:absolute before:inset-0 before:border-2 before:border-primary/10 before:rounded-2xl transition-all duration-700 animate-border before:animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.2)] dark:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <FeatureCard
              icon={<Code className="h-10 w-10 text-blue-500" />}
              title="Multiple Frameworks"
              description="Support for Next.js, Vue, React, and more"
            />

            <FeatureCard
              icon={<Server className="h-10 w-10 text-purple-500" />}
              title="Backend Support"
              description="Node.js and Hono.js for powerful backends"
            />

            <FeatureCard
              icon={<Database className="h-10 w-10 text-green-500" />}
              title="Cloudflare Integration"
              description="Pages, D1, KV, R2, and Durable Objects"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-xl shadow-lg border-2 border-primary/10 hover:border-primary/30 hover:shadow-[0_5px_30px_rgba(59,130,246,0.3)] transition-all duration-300 group transform hover:-translate-y-1">
      <div className="flex flex-col items-center text-center">
        <div className="p-3 bg-muted rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default HeroSection;
