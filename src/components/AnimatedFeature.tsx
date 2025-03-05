import React, { useEffect, useRef } from "react";
import { Card } from "./ui/card";

interface AnimatedFeatureProps {
  title: string;
  description: string;
  gifUrl: string;
  altText?: string;
  reversed?: boolean;
}

const AnimatedFeature: React.FC<AnimatedFeatureProps> = ({
  title,
  description,
  gifUrl,
  altText = "Feature demonstration",
  reversed = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-center opacity-0 transform translate-y-8 transition-all duration-700 ease-out`}
    >
      <div className="md:w-1/2 space-y-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="md:w-1/2">
        <div className="relative transform perspective-1000 group">
          {/* Device mockup */}
          <div className="relative rounded-xl overflow-hidden border-8 border-gray-800 shadow-2xl bg-gray-900 transform group-hover:scale-[1.02] transition-all duration-500">
            {/* Browser-like top bar */}
            <div className="h-6 bg-gray-800 flex items-center px-2">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
            </div>

            {/* Auto-playing GIF/video content */}
            <div className="relative overflow-hidden">
              <img
                src={gifUrl}
                alt={altText}
                className="w-full h-auto object-cover"
              />

              {/* Screen reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none"></div>
            </div>
          </div>

          {/* 3D shadow effect */}
          <div className="absolute -bottom-4 -right-4 left-4 top-4 rounded-xl bg-gradient-to-br from-primary/30 to-blue-600/30 -z-10 blur-xl opacity-70 transform group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-500"></div>

          {/* Floating elements for 3D effect */}
          <div className="absolute -top-3 -right-3 w-16 h-16 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
          <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedFeature;
