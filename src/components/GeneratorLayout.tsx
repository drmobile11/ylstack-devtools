import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  Server,
  Component,
  Layers,
  Database,
  Palette,
  PenTool,
  Workflow,
  LayoutGrid,
  Cpu,
  ArrowLeft,
} from "lucide-react";

interface GeneratorLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  icon?: ReactNode;
}

import Header from "./Header";
import Footer from "./Footer";
import ThemeToggle from "./ThemeToggle";
import { useState, useEffect } from "react";

const GeneratorLayout = ({
  children,
  title,
  description,
  icon,
}: GeneratorLayoutProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);
  const navigate = useNavigate();

  const generators = [
    {
      id: "api-generator",
      name: "API Generator",
      description: "Generate RESTful or GraphQL APIs",
      icon: <Server className="h-5 w-5 text-blue-500" />,
      path: "/api-generator",
    },
    {
      id: "component-generator",
      name: "Component Generator",
      description: "Generate reusable UI components",
      icon: <Component className="h-5 w-5 text-pink-500" />,
      path: "/component-generator",
    },
    {
      id: "fullstack-generator",
      name: "Full Stack Generator",
      description: "Generate complete applications",
      icon: <Layers className="h-5 w-5 text-indigo-500" />,
      path: "/fullstack-generator",
    },
    {
      id: "crud-generator",
      name: "CRUD Generator",
      description: "Generate complete CRUD operations",
      icon: <Database className="h-5 w-5 text-green-500" />,
      path: "/crud-generator",
    },
    {
      id: "backend-generator",
      name: "Backend Generator",
      description: "Generate server-side code and routes",
      icon: <Cpu className="h-5 w-5 text-purple-500" />,
      path: "/backend-generator",
    },
    {
      id: "frontend-generator",
      name: "Frontend Generator",
      description: "Generate UI components and pages",
      icon: <LayoutGrid className="h-5 w-5 text-orange-500" />,
      path: "/frontend-generator",
    },
  ];

  const handleGeneratorClick = (path: string) => {
    // Show a message on screen before navigating
    const message = document.createElement("div");
    message.className =
      "fixed top-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded z-50";
    message.innerHTML = `<p>Opening ${path.replace("/", "")}...</p>`;
    document.body.appendChild(message);

    setTimeout(() => {
      message.remove();
      navigate(path);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle onToggle={toggleTheme} isDarkMode={isDarkMode} />
      </div>
      <Header />
      <main className="flex-1">
        <div className="w-full max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-6 bg-background text-foreground min-h-screen">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <Button
                variant="outline"
                className="mb-4 w-full justify-start"
                onClick={() => navigate("/generator-hub")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hub
              </Button>

              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3 text-sm">All Generators</h3>
                <div className="space-y-1">
                  {generators.map((generator) => (
                    <Button
                      key={generator.id}
                      variant="ghost"
                      className={`w-full justify-start text-sm ${window.location.pathname === generator.path ? "bg-primary/10 text-primary" : ""}`}
                      onClick={() => handleGeneratorClick(generator.path)}
                    >
                      {generator.icon}
                      <span className="ml-2">{generator.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                {icon && (
                  <div className="p-2 rounded-md bg-primary/10">{icon}</div>
                )}
                <div>
                  <h1 className="text-3xl font-bold">{title}</h1>
                  {description && (
                    <p className="text-muted-foreground mt-1">{description}</p>
                  )}
                </div>
              </div>
            </div>

            {children}
          </div>
        </div>
        );
      </main>
      <Footer />
    </div>
  );
};

export default GeneratorLayout;
