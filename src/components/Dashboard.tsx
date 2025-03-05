import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  Code,
  Database,
  FileCode,
  Layers,
  LayoutGrid,
  Palette,
  Plus,
  Server,
  Settings,
  Workflow,
  Zap,
  PenTool,
  Component,
  RefreshCw,
  BarChart,
  Clock,
  Cpu,
} from "lucide-react";
import CodeEditor from "./CodeEditor";

interface DashboardProps {
  onNewProject?: () => void;
  apiKeys?: Record<string, string>;
}

const Dashboard: React.FC<DashboardProps> = ({
  onNewProject = () => {},
  apiKeys = {},
}) => {
  const [activeTab, setActiveTab] = useState("projects");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const projects = [
    {
      id: "proj-1",
      name: "E-commerce Platform",
      description: "Full-stack e-commerce site with React and Node.js",
      date: "2 days ago",
      framework: "React",
      backend: "Node.js",
    },
    {
      id: "proj-2",
      name: "Task Management App",
      description: "Kanban-style task manager with Vue and Hono.js",
      date: "1 week ago",
      framework: "Vue",
      backend: "Hono.js",
    },
    {
      id: "proj-3",
      name: "Personal Blog",
      description: "Static blog with Next.js and Cloudflare Pages",
      date: "2 weeks ago",
      framework: "Next.js",
      backend: "Cloudflare Pages",
    },
  ];

  const generatorTools = [
    {
      id: "api-generator",
      name: "API Generator",
      description: "Generate RESTful or GraphQL APIs",
      icon: <Server className="h-5 w-5 text-blue-500" />,
    },
    {
      id: "crud-generator",
      name: "CRUD Generator",
      description: "Generate complete CRUD operations",
      icon: <Database className="h-5 w-5 text-green-500" />,
    },
    {
      id: "backend-generator",
      name: "Backend Generator",
      description: "Generate server-side code and routes",
      icon: <Cpu className="h-5 w-5 text-purple-500" />,
    },
    {
      id: "frontend-generator",
      name: "Frontend Generator",
      description: "Generate UI components and pages",
      icon: <LayoutGrid className="h-5 w-5 text-orange-500" />,
    },
    {
      id: "fullstack-generator",
      name: "Full Stack Generator",
      description: "Generate complete applications",
      icon: <Layers className="h-5 w-5 text-indigo-500" />,
    },
    {
      id: "component-generator",
      name: "Component Generator",
      description: "Generate reusable UI components",
      icon: <Component className="h-5 w-5 text-pink-500" />,
    },
    {
      id: "color-generator",
      name: "Color Generator",
      description: "Generate color palettes and themes",
      icon: <Palette className="h-5 w-5 text-yellow-500" />,
    },
    {
      id: "svg-generator",
      name: "SVG Generator",
      description: "Generate and optimize SVG graphics",
      icon: <PenTool className="h-5 w-5 text-cyan-500" />,
    },
    {
      id: "workflow-generator",
      name: "Workflow Generator",
      description: "Generate no-code workflow automations",
      icon: <Workflow className="h-5 w-5 text-red-500" />,
    },
  ];

  const recentActivity = [
    {
      id: "activity-1",
      action: "Generated API endpoints",
      project: "E-commerce Platform",
      time: "2 hours ago",
      icon: <Server className="h-4 w-4 text-blue-500" />,
    },
    {
      id: "activity-2",
      action: "Created new components",
      project: "Task Management App",
      time: "Yesterday",
      icon: <Component className="h-4 w-4 text-pink-500" />,
    },
    {
      id: "activity-3",
      action: "Updated color scheme",
      project: "Personal Blog",
      time: "3 days ago",
      icon: <Palette className="h-4 w-4 text-yellow-500" />,
    },
  ];

  const stats = [
    {
      title: "Total Projects",
      value: "12",
      icon: <FileCode className="h-4 w-4 text-blue-500" />,
    },
    {
      title: "Components Generated",
      value: "87",
      icon: <Component className="h-4 w-4 text-pink-500" />,
    },
    {
      title: "API Endpoints",
      value: "34",
      icon: <Server className="h-4 w-4 text-green-500" />,
    },
    {
      title: "Time Saved",
      value: "128h",
      icon: <Clock className="h-4 w-4 text-purple-500" />,
    },
  ];

  const sampleCode = `// Generated API endpoint
import express from 'express';
import { validateUser } from '../middleware/auth';
import { Product } from '../models/Product';

const router = express.Router();

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single product
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create product
router.post('/products', validateUser, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    inStock: req.body.inStock
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;`;

  return (
    <div className="w-full bg-background text-foreground">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">AI Generator Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your projects and generate new code
            </p>
          </div>
          <Button
            onClick={onNewProject}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs
          defaultValue="projects"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-6">
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-primary/10"
            >
              <FileCode className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="generators"
              className="data-[state=active]:bg-primary/10"
            >
              <Zap className="h-4 w-4 mr-2" />
              Generators
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="data-[state=active]:bg-primary/10"
            >
              <BarChart className="h-4 w-4 mr-2" />
              Activity
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-primary/10"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${selectedProject === project.id ? "ring-2 ring-primary" : ""}`}
                  onClick={() => {
                    setSelectedProject(project.id);
                    // In a real app, this would fetch the project details from the backend
                    console.log(`Loading project details for ${project.id}`);
                  }}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm">
                      <div className="flex space-x-2">
                        <span className="px-2 py-1 bg-primary/10 rounded-md">
                          {project.framework}
                        </span>
                        <span className="px-2 py-1 bg-primary/10 rounded-md">
                          {project.backend}
                        </span>
                      </div>
                      <span className="text-muted-foreground">
                        {project.date}
                      </span>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          // In a real app, this would open the code editor for this project
                          console.log(`Opening code editor for ${project.id}`);
                        }}
                      >
                        <Code className="h-4 w-4 mr-1" /> View Code
                      </Button>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          // In a real app, this would open the generation options
                          console.log(
                            `Opening generation options for ${project.id}`,
                          );
                        }}
                      >
                        <RefreshCw className="h-4 w-4 mr-1" /> Generate More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Card
                className="flex items-center justify-center h-[200px] border-dashed cursor-pointer hover:border-primary/50 transition-colors"
                onClick={onNewProject}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-medium">Create New Project</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Start building with AI assistance
                  </p>
                </CardContent>
              </Card>
            </div>

            {selectedProject && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Project Structure</h3>
                        <div className="border rounded-md p-3 bg-muted/30">
                          <ScrollArea className="h-[300px]">
                            <ul className="space-y-1 text-sm">
                              <li className="font-medium">src/</li>
                              <li className="pl-4">components/</li>
                              <li className="pl-8">Header.tsx</li>
                              <li className="pl-8">Footer.tsx</li>
                              <li className="pl-8">ProductCard.tsx</li>
                              <li className="pl-4">pages/</li>
                              <li className="pl-8">index.tsx</li>
                              <li className="pl-8">products/index.tsx</li>
                              <li className="pl-8">products/[id].tsx</li>
                              <li className="pl-4">api/</li>
                              <li className="pl-8">products.ts</li>
                              <li className="pl-8">users.ts</li>
                              <li className="pl-4">utils/</li>
                              <li className="pl-4">styles/</li>
                              <li className="font-medium">public/</li>
                              <li className="font-medium">package.json</li>
                              <li className="font-medium">tsconfig.json</li>
                            </ul>
                          </ScrollArea>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">
                          Generated Components
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-primary/10 rounded-md text-sm">
                            Header
                          </span>
                          <span className="px-2 py-1 bg-primary/10 rounded-md text-sm">
                            Footer
                          </span>
                          <span className="px-2 py-1 bg-primary/10 rounded-md text-sm">
                            ProductCard
                          </span>
                          <span className="px-2 py-1 bg-primary/10 rounded-md text-sm">
                            ProductList
                          </span>
                          <span className="px-2 py-1 bg-primary/10 rounded-md text-sm">
                            ProductDetail
                          </span>
                          <span className="px-2 py-1 bg-primary/10 rounded-md text-sm">
                            Cart
                          </span>
                          <span className="px-2 py-1 bg-primary/10 rounded-md text-sm">
                            Checkout
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="font-medium mb-2">Generated Code</h3>
                      <CodeEditor
                        code={sampleCode}
                        language="javascript"
                        title="api/products.js"
                        height="300px"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="generators" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {generatorTools.map((tool) => (
                <Card
                  key={tool.id}
                  className="cursor-pointer hover:shadow-md transition-all"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-primary/10">
                        {tool.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {tool.description}
                    </p>
                    <Button
                      className="w-full"
                      onClick={() => {
                        // In a real app, this would open the generator for this tool
                        console.log(`Starting generator for ${tool.id}`);
                        // Redirect to the generator section
                        const generatorSection =
                          document.getElementById("generator-section");
                        if (generatorSection) {
                          generatorSection.scrollIntoView({
                            behavior: "smooth",
                          });
                        }
                      }}
                    >
                      <Zap className="mr-2 h-4 w-4" /> Start Generating
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {recentActivity.map((activity, index) => (
                    <div key={activity.id}>
                      <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                            {activity.icon}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.project} • {activity.time}
                          </p>
                        </div>
                      </div>
                      {index < recentActivity.length - 1 && (
                        <div className="ml-4 pl-4 mt-4 border-l h-8 border-border"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generation Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Components</span>
                      <span className="text-sm text-muted-foreground">
                        87/100
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: "87%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">API Endpoints</span>
                      <span className="text-sm text-muted-foreground">
                        34/50
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: "68%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        Database Models
                      </span>
                      <span className="text-sm text-muted-foreground">
                        12/20
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className="bg-purple-600 h-2.5 rounded-full"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">
                      OpenAI API Key
                    </label>
                    <div className="flex">
                      <input
                        type="password"
                        value={apiKeys.openai || ""}
                        readOnly
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                      />
                      <Button variant="outline" className="ml-2">
                        Update
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {apiKeys.openai
                        ? "API key configured"
                        : "No API key configured"}
                    </p>
                  </div>

                  <Separator />

                  <div className="grid gap-2">
                    <label className="text-sm font-medium">
                      Cloudflare API Token
                    </label>
                    <div className="flex">
                      <input
                        type="password"
                        value={apiKeys.cloudflare || ""}
                        readOnly
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                      />
                      <Button variant="outline" className="ml-2">
                        Update
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {apiKeys.cloudflare
                        ? "API token configured"
                        : "No API token configured"}
                    </p>
                  </div>

                  <Separator />

                  <div className="grid gap-2">
                    <label className="text-sm font-medium">
                      DeepSeek API Key
                    </label>
                    <div className="flex">
                      <input
                        type="password"
                        value={apiKeys.deepseek || ""}
                        readOnly
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                      />
                      <Button variant="outline" className="ml-2">
                        Update
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {apiKeys.deepseek
                        ? "API key configured"
                        : "No API key configured"}
                    </p>
                  </div>

                  <Separator />

                  <div className="grid gap-2">
                    <label className="text-sm font-medium">
                      Google Gemini API Key
                    </label>
                    <div className="flex">
                      <input
                        type="password"
                        value={apiKeys.gemini || ""}
                        readOnly
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                      />
                      <Button variant="outline" className="ml-2">
                        Update
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {apiKeys.gemini
                        ? "API key configured"
                        : "No API key configured"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
