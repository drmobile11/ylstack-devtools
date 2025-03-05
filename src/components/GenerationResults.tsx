import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle, Download, ArrowLeft, ArrowRight } from "lucide-react";

import GeneratedCodePreview from "./GeneratedCodePreview";
import ProjectStructure from "./ProjectStructure";
import DownloadOptions from "./DownloadOptions";

interface GenerationResultsProps {
  projectName?: string;
  generationStatus?: "generating" | "success" | "error";
  generatedFiles?: {
    name: string;
    content: string;
    language: string;
  }[];
  projectStructure?: {
    name: string;
    type: "file" | "directory";
    children?: any[];
  }[];
  onDownload?: () => void;
  onCopyCode?: (content: string) => void;
  onCopyInstructions?: () => void;
  onViewDeployment?: () => void;
  onBack?: () => void;
  onNewProject?: () => void;
}

const GenerationResults = ({
  projectName = "my-fullstack-project",
  generationStatus = "success",
  generatedFiles = [
    {
      name: "index.js",
      content: `import React from 'react';\nimport ReactDOM from 'react-dom';\nimport App from './App';\n\nReactDOM.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n  document.getElementById('root')\n);`,
      language: "javascript",
    },
    {
      name: "App.js",
      content: `import React from 'react';\n\nfunction App() {\n  return (\n    <div className="App">\n      <header className="App-header">\n        <h1>Welcome to My App</h1>\n        <p>Edit <code>src/App.js</code> and save to reload.</p>\n      </header>\n    </div>\n  );\n}\n\nexport default App;`,
      language: "javascript",
    },
    {
      name: "styles.css",
      content: `.App {\n  text-align: center;\n}\n\n.App-header {\n  background-color: #282c34;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: calc(10px + 2vmin);\n  color: white;\n}`,
      language: "css",
    },
  ],
  projectStructure = [
    {
      name: "src",
      type: "directory",
      children: [
        {
          name: "components",
          type: "directory",
          children: [
            { name: "Header.tsx", type: "file" },
            { name: "Footer.tsx", type: "file" },
            { name: "Button.tsx", type: "file" },
          ],
        },
        {
          name: "pages",
          type: "directory",
          children: [
            { name: "index.tsx", type: "file" },
            { name: "about.tsx", type: "file" },
          ],
        },
        { name: "App.tsx", type: "file" },
        { name: "main.tsx", type: "file" },
      ],
    },
    {
      name: "public",
      type: "directory",
      children: [
        { name: "index.html", type: "file" },
        { name: "favicon.ico", type: "file" },
      ],
    },
    { name: "package.json", type: "file" },
    { name: "tsconfig.json", type: "file" },
    { name: "README.md", type: "file" },
  ],
  onDownload = () => {},
  onCopyCode = () => {},
  onCopyInstructions = () => {},
  onViewDeployment = () => {},
  onBack = () => {},
  onNewProject = () => {},
}: GenerationResultsProps) => {
  const [activeFile, setActiveFile] = useState(generatedFiles[0]?.name || "");
  const [activeTab, setActiveTab] = useState("code");

  const handleFileSelect = (fileName: string) => {
    setActiveFile(fileName);
    setActiveTab("code");
  };

  if (generationStatus === "generating") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-16 h-16 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold mb-2">Generating Your Project</h2>
        <p className="text-gray-600 text-center max-w-md">
          Please wait while we generate your full-stack project based on your
          specifications. This may take a few moments...
        </p>
      </div>
    );
  }

  if (generationStatus === "error") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Generation Failed</h2>
        <p className="text-gray-600 text-center max-w-md mb-6">
          We encountered an error while generating your project. Please try
          again or adjust your specifications.
        </p>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Specifications
          </Button>
          <Button onClick={onNewProject}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-card text-card-foreground p-6 rounded-lg shadow-sm border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Generation Complete</h2>
            <p className="text-muted-foreground">
              Your project <span className="font-semibold">{projectName}</span>{" "}
              has been successfully generated
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={onNewProject}>
            <ArrowRight className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="preview">Preview & Code</TabsTrigger>
          <TabsTrigger value="download">Download & Deploy</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <ProjectStructure
                projectStructure={projectStructure}
                onFileSelect={handleFileSelect}
              />
            </div>
            <div className="lg:col-span-3">
              <GeneratedCodePreview
                files={generatedFiles}
                onDownload={onDownload}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="download">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-1">
              <DownloadOptions
                projectName={projectName}
                onDownloadZip={onDownload}
                onCopyInstructions={onCopyInstructions}
                onViewDeployment={onViewDeployment}
              />
            </div>
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Project Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Project Configuration</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <span className="font-medium mr-2">Frontend:</span>{" "}
                        React
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium mr-2">Backend:</span>{" "}
                        Node.js
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium mr-2">AI Model:</span>{" "}
                        Cloudflare Workers AI
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">
                      Cloudflare Integrations
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Cloudflare Pages
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Cloudflare D1 Database
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Cloudflare KV Storage
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Project Statistics</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <span className="font-medium mr-2">
                          Files Generated:
                        </span>{" "}
                        {generatedFiles.length}
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium mr-2">Components:</span> 12
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium mr-2">API Endpoints:</span>{" "}
                        8
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GenerationResults;
