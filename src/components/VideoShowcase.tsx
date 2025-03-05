import React, { useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface VideoShowcaseProps {
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
}

const VideoShowcase: React.FC<VideoShowcaseProps> = ({
  title = "See AI Full-Stack Generator in Action",
  description = "Watch how our AI generates production-ready code in minutes",
  thumbnailUrl = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full py-16 px-4 bg-muted/30 dark:bg-muted/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="relative rounded-xl overflow-hidden group transform perspective-1000 hover:scale-[1.01] transition-all duration-300 shadow-xl">
          {/* Device mockup with video */}
          <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 z-0"></div>

            {/* Laptop mockup frame */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-[95%] h-[85%] bg-gray-900 rounded-lg shadow-2xl overflow-hidden border-4 border-gray-800 relative">
                {/* Browser mockup */}
                <div className="h-6 bg-gray-800 flex items-center px-2">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto bg-gray-700 rounded-md px-2 py-0.5 text-[8px] text-gray-300">
                    ai-fullstack-generator.app
                  </div>
                </div>

                {/* Video content - autoplaying silently and looping */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-[calc(100%-24px)] object-cover"
                >
                  <source
                    src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Reflections and highlights */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 z-20 pointer-events-none"></div>
          </div>

          {/* 3D Card Effect with enhanced glow */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/30 to-blue-600/30 transform -z-10 translate-y-2 translate-x-2 blur-2xl opacity-70 animate-pulse"></div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <FeatureHighlight
            number="01"
            title="Specify Your Project"
            description="Define your project requirements, select frameworks and features"
          />
          <FeatureHighlight
            number="02"
            title="AI Generates Code"
            description="Our AI models create production-ready code based on your specifications"
          />
          <FeatureHighlight
            number="03"
            title="Deploy & Scale"
            description="Download your project or deploy directly to Cloudflare"
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureHighlightProps {
  number: string;
  title: string;
  description: string;
}

const FeatureHighlight: React.FC<FeatureHighlightProps> = ({
  number,
  title,
  description,
}) => {
  return (
    <div className="flex items-start space-x-4 group">
      <div className="text-3xl font-bold text-primary/70 bg-primary/5 h-12 w-12 flex items-center justify-center rounded-full group-hover:bg-primary/20 transition-colors duration-300">
        {number}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};

export default VideoShowcase;
