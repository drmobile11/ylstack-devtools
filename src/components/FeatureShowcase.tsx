import React from "react";
import AnimatedFeature from "./AnimatedFeature";

const FeatureShowcase: React.FC = () => {
  return (
    <section className="w-full py-16 px-4 bg-muted/30 dark:bg-muted/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Powerful Features in Action
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how our AI-powered generator creates production-ready code
          </p>
        </div>

        <div className="space-y-20">
          <AnimatedFeature
            title="AI-Powered Code Generation"
            description="Watch as our AI transforms your specifications into complete, production-ready code in seconds. Support for multiple frameworks including Next.js, React, Vue, and Node.js."
            gifUrl="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtY2JlNGF1ZWx5ZnVlNnRnM2VlNnRpbDVxbWF0aGJxcnVlcWppZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13HBDT4QSTpveU/giphy.gif"
            altText="AI code generation demonstration"
          />

          <AnimatedFeature
            title="Cloudflare Integration"
            description="Seamlessly deploy your projects with Cloudflare Pages, D1 database, KV storage, R2 object storage, and Durable Objects for stateful applications."
            gifUrl="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWRnZnRnZWJnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPsx2VAYAgEHC12/giphy.gif"
            altText="Cloudflare integration demonstration"
            reversed={true}
          />

          <AnimatedFeature
            title="Component Library Generation"
            description="Generate complete component libraries with proper styling, accessibility, and responsive design. Perfect for kickstarting your design system."
            gifUrl="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWRnZnRnZWJnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9IgzoKnwFNmISR8I/giphy.gif"
            altText="Component library generation"
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
