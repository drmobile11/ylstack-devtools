import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Check, Code, Server } from "lucide-react";

interface Framework {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  type: "frontend" | "backend";
}

interface FrameworkSelectorProps {
  selectedFrontend?: string;
  selectedBackend?: string;
  onSelectFrontend?: (id: string) => void;
  onSelectBackend?: (id: string) => void;
}

const FrameworkSelector: React.FC<FrameworkSelectorProps> = ({
  selectedFrontend = "nextjs",
  selectedBackend = "nodejs",
  onSelectFrontend = () => {},
  onSelectBackend = () => {},
}) => {
  const frontendFrameworks: Framework[] = [
    {
      id: "nextjs",
      name: "Next.js",
      description:
        "React framework with server-side rendering and static site generation",
      icon: <Code className="h-8 w-8 text-blue-500" />,
      type: "frontend",
    },
    {
      id: "vue",
      name: "Vue",
      description:
        "Progressive JavaScript framework for building user interfaces",
      icon: <Code className="h-8 w-8 text-green-500" />,
      type: "frontend",
    },
    {
      id: "react",
      name: "React",
      description: "JavaScript library for building user interfaces",
      icon: <Code className="h-8 w-8 text-cyan-500" />,
      type: "frontend",
    },
  ];

  const backendFrameworks: Framework[] = [
    {
      id: "nodejs",
      name: "Node.js",
      description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
      icon: <Server className="h-8 w-8 text-green-600" />,
      type: "backend",
    },
    {
      id: "honojs",
      name: "Hono.js",
      description:
        "Small, simple, and ultrafast web framework for Cloudflare Workers",
      icon: <Server className="h-8 w-8 text-purple-500" />,
      type: "backend",
    },
  ];

  const FrameworkCard = ({
    framework,
    isSelected,
    onSelect,
  }: {
    framework: Framework;
    isSelected: boolean;
    onSelect: (id: string) => void;
  }) => (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? "ring-2 ring-primary" : ""}`}
      onClick={() => onSelect(framework.id)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="p-2 rounded-lg bg-muted">{framework.icon}</div>
          {isSelected && <Check className="h-5 w-5 text-primary" />}
        </div>
        <CardTitle className="mt-2">{framework.name}</CardTitle>
        <CardDescription>{framework.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-8"></div> {/* Placeholder for additional content */}
      </CardContent>
      <CardFooter>
        <Button
          variant={isSelected ? "default" : "outline"}
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(framework.id);
          }}
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Frontend Framework</h2>
        <p className="text-muted-foreground mb-4">
          Select the frontend framework for your project
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {frontendFrameworks.map((framework) => (
            <FrameworkCard
              key={framework.id}
              framework={framework}
              isSelected={selectedFrontend === framework.id}
              onSelect={onSelectFrontend}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">Backend Framework</h2>
        <p className="text-muted-foreground mb-4">
          Select the backend framework for your project
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {backendFrameworks.map((framework) => (
            <FrameworkCard
              key={framework.id}
              framework={framework}
              isSelected={selectedBackend === framework.id}
              onSelect={onSelectBackend}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrameworkSelector;
