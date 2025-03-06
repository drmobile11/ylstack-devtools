import React, { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Layers, ArrowRight, Check } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Progress } from "../components/ui/progress";
import GeneratorLayout from "../components/GeneratorLayout";

const FullStackGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedFiles, setGeneratedFiles] = useState<string[]>([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedFramework, setSelectedFramework] = useState("react");
  const [selectedBackend, setSelectedBackend] = useState("nodejs");

  const frameworks = [
    { id: "react", name: "React" },
    { id: "nextjs", name: "Next.js" },
    { id: "vue", name: "Vue" },
  ];

  const backends = [
    { id: "nodejs", name: "Node.js" },
    { id: "honojs", name: "Hono.js" },
  ];

  const filesToCreate = [
    { name: "index.html", progress: 10 },
    { name: "package.json", progress: 20 },
    { name: "tsconfig.json", progress: 30 },
    { name: "src/main.tsx", progress: 40 },
    { name: "src/App.tsx", progress: 50 },
    { name: "src/components/Header.tsx", progress: 60 },
    { name: "src/components/Footer.tsx", progress: 70 },
    { name: "src/pages/Home.tsx", progress: 80 },
    { name: "src/api/index.ts", progress: 90 },
    { name: "README.md", progress: 95 },
  ];

  const generateProject = async () => {
    if (!projectName) {
      alert("Please enter a project name");
      return;
    }

    setIsGenerating(true);
    setGeneratedFiles([]);
    setGenerationProgress(0);

    // Simulate real file creation with progress
    for (const file of filesToCreate) {
      setGenerationProgress(file.progress);
      setGeneratedFiles((prev) => [...prev, file.name]);

      // Update progress message for major milestones
      if (file.progress % 30 === 0 || file.progress === 95) {
        setGenerationProgress(file.progress);
      }

      // Wait between files
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    // Complete
    setGenerationProgress(100);
    // Full-stack project generated successfully
    setIsGenerating(false);
  };

  return (
    <GeneratorLayout
      title="Full-Stack Project Generator"
      description="Generate complete full-stack applications with frontend and backend"
      icon={<Layers className="h-6 w-6 text-indigo-500" />}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Layers className="mr-2 h-5 w-5 text-indigo-500" />
            Generate Complete Full-Stack Application
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isGenerating ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="project-name" className="mb-2 block">
                    Project Name
                  </Label>
                  <Input
                    id="project-name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="my-awesome-project"
                    className="mb-4"
                  />

                  <Label htmlFor="project-description" className="mb-2 block">
                    Project Description
                  </Label>
                  <Textarea
                    id="project-description"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="A full-stack application that..."
                    className="mb-4 min-h-[100px]"
                  />
                </div>

                <div>
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Frontend Framework</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {frameworks.map((framework) => (
                        <Button
                          key={framework.id}
                          variant="outline"
                          className={`justify-start ${framework.id === selectedFramework ? "border-primary bg-primary/10" : ""}`}
                          onClick={() => setSelectedFramework(framework.id)}
                        >
                          {framework.id === selectedFramework && (
                            <Check className="mr-2 h-4 w-4" />
                          )}
                          {framework.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Backend Framework</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {backends.map((backend) => (
                        <Button
                          key={backend.id}
                          variant="outline"
                          className={`justify-start ${backend.id === selectedBackend ? "border-primary bg-primary/10" : ""}`}
                          onClick={() => setSelectedBackend(backend.id)}
                        >
                          {backend.id === selectedBackend && (
                            <Check className="mr-2 h-4 w-4" />
                          )}
                          {backend.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  const message = document.createElement("div");
                  message.className =
                    "fixed top-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded z-50";
                  message.innerHTML =
                    "<p>Starting full-stack project generation...</p>";
                  document.body.appendChild(message);

                  setTimeout(() => {
                    message.remove();
                    generateProject();
                  }, 500);
                }}
                className="w-full"
              >
                Generate Full-Stack Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">
                  Generating {projectName}
                </h3>
                <p className="text-muted-foreground mb-4">
                  Please wait while we create your full-stack project...
                </p>
                <div className="mt-2 mb-4">
                  <p>
                    Creating project files and setting up your application...
                  </p>
                </div>
              </div>

              <Progress value={generationProgress} className="w-full h-2" />

              <p className="text-center text-sm text-muted-foreground">
                {generationProgress < 30
                  ? "Setting up project structure..."
                  : generationProgress < 60
                    ? "Creating frontend components..."
                    : generationProgress < 90
                      ? "Setting up backend API..."
                      : "Finalizing project..."}
              </p>

              {generatedFiles.length > 0 && (
                <div className="border rounded-md p-4 bg-muted/30">
                  <h3 className="font-medium mb-2">Generated Files:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {generatedFiles.map((file, index) => (
                      <div key={index} className="flex items-center">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-sm">{file}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </GeneratorLayout>
  );
};

export default FullStackGenerator;
