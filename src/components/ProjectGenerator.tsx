import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Code,
  Cog,
  FileCode,
  Layers,
  Rocket,
  AlertTriangle,
} from "lucide-react";
import ProjectSpecificationForm from "./ProjectSpecificationForm";
import FrameworkSelector from "./FrameworkSelector";
import AIModelSelector from "./AIModelSelector";
import CloudflareIntegrations from "./CloudflareIntegrations";
import { Progress } from "./ui/progress";
import { ApiKeys } from "./ApiKeyDialog";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface ProjectGeneratorProps {
  onComplete?: (projectData: ProjectData) => void;
  initialStep?: number;
  apiKeys?: ApiKeys;
}

interface ProjectData {
  specification: {
    projectName: string;
    projectDescription: string;
    features?: string;
    routes?: string;
    dataModels?: string;
    apiEndpoints?: string;
    additionalRequirements?: string;
  };
  frameworks: {
    frontend: string;
    backend: string;
  };
  aiModel: string;
  cloudflareIntegrations: {
    [key: string]: boolean;
  };
}

const ProjectGenerator: React.FC<ProjectGeneratorProps> = ({
  onComplete = () => {},
  initialStep = 0,
  apiKeys = {},
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [projectData, setProjectData] = useState<ProjectData>({
    specification: {
      projectName: "",
      projectDescription: "",
    },
    frameworks: {
      frontend: "nextjs",
      backend: "nodejs",
    },
    aiModel: "cloudflare",
    cloudflareIntegrations: {
      pages: true,
      d1: false,
      kv: false,
      r2: false,
      "durable-objects": false,
    },
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const steps = [
    {
      id: "specification",
      label: "Project Specification",
      icon: <FileCode className="h-4 w-4" />,
    },
    {
      id: "frameworks",
      label: "Frameworks",
      icon: <Layers className="h-4 w-4" />,
    },
    { id: "ai-model", label: "AI Model", icon: <Code className="h-4 w-4" /> },
    {
      id: "integrations",
      label: "Cloudflare Integrations",
      icon: <Cog className="h-4 w-4" />,
    },
    { id: "generate", label: "Generate", icon: <Rocket className="h-4 w-4" /> },
  ];

  const handleSpecificationSubmit = (values: any) => {
    setProjectData({
      ...projectData,
      specification: values,
    });
    nextStep();
  };

  const handleSelectFrontend = (id: string) => {
    setProjectData({
      ...projectData,
      frameworks: {
        ...projectData.frameworks,
        frontend: id,
      },
    });
  };

  const handleSelectBackend = (id: string) => {
    setProjectData({
      ...projectData,
      frameworks: {
        ...projectData.frameworks,
        backend: id,
      },
    });
  };

  const handleSelectAIModel = (modelId: string) => {
    setProjectData({
      ...projectData,
      aiModel: modelId,
    });
  };

  const handleToggleIntegration = (id: string, enabled: boolean) => {
    setProjectData({
      ...projectData,
      cloudflareIntegrations: {
        ...projectData.cloudflareIntegrations,
        [id]: enabled,
      },
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);

    // Check if API key is required but not provided
    const selectedModel = projectData.aiModel;
    const needsApiKey = selectedModel !== "cloudflare";
    const hasApiKey = apiKeys[selectedModel as keyof ApiKeys];

    if (needsApiKey && !hasApiKey) {
      // Show error for 3 seconds then reset
      setGenerationProgress(-1); // Use -1 to indicate error state
      setTimeout(() => {
        setIsGenerating(false);
        setGenerationProgress(0);
      }, 3000);
      return;
    }

    // Create specific files based on project configuration
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

    // Simulate real file creation with alerts
    for (const file of filesToCreate) {
      setGenerationProgress(file.progress);
      // Update progress message for each major file being created
      if (file.progress % 20 === 0 || file.progress === 95) {
        setGenerationProgress(file.progress);
      }
      // Wait a bit between files
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // Final step to 100%
    setGenerationProgress(100);
    // Project generation complete

    setTimeout(() => {
      setIsGenerating(false);
      onComplete(projectData);
    }, 500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ProjectSpecificationForm onSubmit={handleSpecificationSubmit} />
        );
      case 1:
        return (
          <FrameworkSelector
            selectedFrontend={projectData.frameworks.frontend}
            selectedBackend={projectData.frameworks.backend}
            onSelectFrontend={handleSelectFrontend}
            onSelectBackend={handleSelectBackend}
          />
        );
      case 2:
        return (
          <>
            {Object.keys(apiKeys).length === 0 && (
              <Alert className="mb-4 border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700/30">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-800">
                  API Keys Required
                </AlertTitle>
                <AlertDescription className="text-amber-700">
                  For full functionality, configure your API keys in the
                  settings menu in the header.
                </AlertDescription>
              </Alert>
            )}
            <AIModelSelector
              selectedModel={projectData.aiModel}
              onSelectModel={handleSelectAIModel}
              apiKeys={apiKeys}
            />
          </>
        );
      case 3:
        return (
          <CloudflareIntegrations
            integrations={Object.entries(
              projectData.cloudflareIntegrations,
            ).map(([id, enabled]) => ({
              id,
              name:
                id === "pages"
                  ? "Cloudflare Pages"
                  : id === "d1"
                    ? "Cloudflare D1"
                    : id === "kv"
                      ? "Cloudflare KV"
                      : id === "r2"
                        ? "Cloudflare R2"
                        : "Durable Objects",
              description:
                id === "pages"
                  ? "Deploy static sites and frontend applications"
                  : id === "d1"
                    ? "SQLite database at the edge"
                    : id === "kv"
                      ? "Key-value storage for global data"
                      : id === "r2"
                        ? "Object storage for files and assets"
                        : "Stateful serverless computing",
              enabled,
              tooltip:
                id === "pages"
                  ? "Automatically deploy and host your static site or frontend application"
                  : id === "d1"
                    ? "Serverless SQL database built on SQLite, optimized for Cloudflare Workers"
                    : id === "kv"
                      ? "Global, low-latency key-value data store"
                      : id === "r2"
                        ? "S3-compatible object storage with no egress fees"
                        : "Maintain state and coordinate across multiple requests",
            }))}
            onToggle={handleToggleIntegration}
          />
        );
      case 4:
        return (
          <div className="w-full bg-card text-card-foreground p-6 rounded-lg shadow-sm border border-border">
            <h2 className="text-2xl font-bold mb-4">Generate Your Project</h2>
            <p className="text-muted-foreground mb-6">
              Review your project configuration and generate your full-stack
              code
            </p>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">Project Name</h3>
                    <p className="text-muted-foreground">
                      {projectData.specification.projectName ||
                        "My Awesome Project"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium">Frontend Framework</h3>
                    <p className="text-muted-foreground">
                      {projectData.frameworks.frontend === "nextjs"
                        ? "Next.js"
                        : projectData.frameworks.frontend === "vue"
                          ? "Vue"
                          : "React"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium">Backend Framework</h3>
                    <p className="text-muted-foreground">
                      {projectData.frameworks.backend === "nodejs"
                        ? "Node.js"
                        : "Hono.js"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium">AI Model</h3>
                    <p className="text-muted-foreground">
                      {projectData.aiModel === "cloudflare"
                        ? "Cloudflare Workers AI"
                        : projectData.aiModel === "openai"
                          ? "OpenAI"
                          : projectData.aiModel === "deepseek"
                            ? "DeepSeek"
                            : "Google Gemini"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium">Cloudflare Integrations</h3>
                    <ul className="list-disc list-inside text-muted-foreground">
                      {Object.entries(projectData.cloudflareIntegrations)
                        .filter(([_, enabled]) => enabled)
                        .map(([id]) => (
                          <li key={id}>
                            {id === "pages"
                              ? "Cloudflare Pages"
                              : id === "d1"
                                ? "Cloudflare D1"
                                : id === "kv"
                                  ? "Cloudflare KV"
                                  : id === "r2"
                                    ? "Cloudflare R2"
                                    : "Durable Objects"}
                          </li>
                        ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {isGenerating ? (
                <div className="space-y-4">
                  {generationProgress === -1 ? (
                    <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-700/30">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertTitle className="text-red-800">
                        API Key Required
                      </AlertTitle>
                      <AlertDescription className="text-red-700">
                        Please configure your{" "}
                        {projectData.aiModel === "openai"
                          ? "OpenAI"
                          : projectData.aiModel === "deepseek"
                            ? "DeepSeek"
                            : projectData.aiModel === "gemini"
                              ? "Google Gemini"
                              : ""}{" "}
                        API key in settings.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <>
                      <p className="text-center font-medium">
                        Generating your full-stack project...
                      </p>
                      <Progress value={generationProgress} className="w-full" />
                      <p className="text-center text-sm text-muted-foreground">
                        {generationProgress < 30
                          ? "Analyzing project specifications..."
                          : generationProgress < 60
                            ? "Creating project structure and components..."
                            : generationProgress < 90
                              ? "Configuring frameworks and integrations..."
                              : "Finalizing code generation..."}
                      </p>
                    </>
                  )}
                </div>
              ) : (
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
                      handleGenerate();
                    }, 500);
                  }}
                  className="w-full py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Generate Full-Stack Project
                </Button>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-card text-card-foreground rounded-xl shadow-md overflow-hidden border border-border">
      <div className="p-6 bg-card border-b border-border">
        <h1 className="text-3xl font-bold text-foreground">
          AI Full-Stack Generator
        </h1>
        <p className="text-muted-foreground mt-2">
          Generate production-ready full-stack code based on your specifications
        </p>
      </div>

      <div className="p-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${index <= currentStep ? "text-primary" : "text-muted-foreground"}`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 ${index <= currentStep ? "bg-primary/20" : "bg-muted"}`}
                >
                  {step.icon}
                </div>
                <span className="text-xs font-medium">{step.label}</span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 h-1 bg-muted w-full"></div>
            <div
              className="absolute top-0 left-0 h-1 bg-primary transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="mt-6">
          <Tabs value={steps[currentStep].id} className="w-full">
            <TabsList className="hidden">
              {steps.map((step) => (
                <TabsTrigger key={step.id} value={step.id}>
                  {step.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {steps.map((step, index) => (
              <TabsContent key={step.id} value={step.id} className="mt-0">
                {currentStep === index && renderStepContent()}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Navigation Buttons */}
        {currentStep !== 0 && currentStep !== 4 && (
          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={nextStep} className="flex items-center">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectGenerator;
