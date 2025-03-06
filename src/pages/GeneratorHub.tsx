import React from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
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
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";
import { useState, useEffect } from "react";

const GeneratorHub = () => {
  const navigate = useNavigate();
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

  const generators = [
    {
      id: "api-generator",
      name: "API Generator",
      description: "Generate RESTful or GraphQL APIs",
      icon: <Server className="h-10 w-10 text-blue-500" />,
      path: "/api-generator",
    },
    {
      id: "component-generator",
      name: "Component Generator",
      description: "Generate reusable UI components",
      icon: <Component className="h-10 w-10 text-pink-500" />,
      path: "/component-generator",
    },
    {
      id: "fullstack-generator",
      name: "Full Stack Generator",
      description: "Generate complete applications",
      icon: <Layers className="h-10 w-10 text-indigo-500" />,
      path: "/fullstack-generator",
    },
    {
      id: "crud-generator",
      name: "CRUD Generator",
      description: "Generate complete CRUD operations",
      icon: <Database className="h-10 w-10 text-green-500" />,
      path: "/crud-generator",
    },
    {
      id: "color-generator",
      name: "Color Generator",
      description: "Generate color palettes and themes",
      icon: <Palette className="h-10 w-10 text-yellow-500" />,
      path: "/color-generator",
    },
    {
      id: "svg-generator",
      name: "SVG Generator",
      description: "Generate and optimize SVG graphics",
      icon: <PenTool className="h-10 w-10 text-cyan-500" />,
      path: "/svg-generator",
    },
    {
      id: "workflow-generator",
      name: "Workflow Generator",
      description: "Generate no-code workflow automations",
      icon: <Workflow className="h-10 w-10 text-red-500" />,
      path: "/workflow-generator",
    },
    {
      id: "frontend-generator",
      name: "Frontend Generator",
      description: "Generate UI components and pages",
      icon: <LayoutGrid className="h-10 w-10 text-orange-500" />,
      path: "/frontend-generator",
    },
    {
      id: "backend-generator",
      name: "Backend Generator",
      description: "Generate server-side code and routes",
      icon: <Cpu className="h-10 w-10 text-purple-500" />,
      path: "/backend-generator",
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
        <div className="w-full max-w-7xl mx-auto p-6 bg-background text-foreground min-h-screen">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">AI Generator Hub</h1>
              <p className="text-muted-foreground mt-1">
                Choose a generator to create production-ready code for your
                project
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generators.map((generator) => (
              <Card
                key={generator.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleGeneratorClick(generator.path)}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      {generator.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        {generator.name}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {generator.description}
                  </CardDescription>
                  <Button className="w-full">Start Generating</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GeneratorHub;
