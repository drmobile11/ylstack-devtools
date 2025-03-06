import React, { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Component, Layout, ArrowRight, Check } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import GeneratorLayout from "../components/GeneratorLayout";

const ComponentGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedComponents, setGeneratedComponents] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("ui");
  const [componentName, setComponentName] = useState("");
  const [features, setFeatures] = useState({
    responsive: true,
    darkMode: true,
    animation: false,
    accessibility: true,
    typescript: true,
  });

  const steps = [
    "Analyzing component requirements...",
    "Creating component structure...",
    "Generating component code...",
    "Adding styles...",
    "Implementing features...",
    "Creating stories...",
    "Adding tests...",
    "Finalizing component...",
  ];

  const uiComponents = [
    "Button",
    "Card",
    "Modal",
    "Dropdown",
    "Tabs",
    "Form",
    "Table",
    "Pagination",
  ];

  const pageComponents = [
    "Header",
    "Footer",
    "Sidebar",
    "Hero",
    "Features",
    "Pricing",
    "Testimonials",
    "Contact",
  ];

  const generateComponent = async () => {
    if (!componentName) {
      // Show error message in the form
      document.getElementById("component-error")?.classList.remove("hidden");
      return;
    }

    setIsGenerating(true);
    setGeneratedComponents([]);
    setCurrentStep(0);

    // Process each step with a delay
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Add files at specific steps
      if (i === 2) {
        setGeneratedComponents((prev) => [
          ...prev,
          `src/components/${componentName}/${componentName}.tsx`,
        ]);
      } else if (i === 3) {
        if (features.darkMode) {
          setGeneratedComponents((prev) => [
            ...prev,
            `src/components/${componentName}/${componentName}.module.css`,
          ]);
        }
      } else if (i === 5) {
        if (features.typescript) {
          setGeneratedComponents((prev) => [
            ...prev,
            `src/components/${componentName}/${componentName}.stories.tsx`,
          ]);
        }
      } else if (i === 6) {
        setGeneratedComponents((prev) => [
          ...prev,
          `src/components/${componentName}/${componentName}.test.tsx`,
        ]);
      } else if (i === 7) {
        setGeneratedComponents((prev) => [
          ...prev,
          `src/components/${componentName}/index.ts`,
        ]);
      }
    }

    // Complete
    await new Promise((resolve) => setTimeout(resolve, 800));
    // Component generated successfully
    setIsGenerating(false);
  };

  const handleComponentSelect = (component: string) => {
    setComponentName(component);
  };

  const toggleFeature = (feature: keyof typeof features) => {
    setFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  return (
    <GeneratorLayout
      title="Component Generator"
      description="Generate reusable UI components and page sections"
      icon={<Component className="h-6 w-6 text-pink-500" />}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ui">UI Components</TabsTrigger>
          <TabsTrigger value="page">Page Sections</TabsTrigger>
        </TabsList>

        <TabsContent value="ui" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Component className="mr-2 h-5 w-5 text-pink-500" />
                UI Component Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="component-name" className="mb-2 block">
                    Component Name
                  </Label>
                  <Input
                    id="component-name"
                    value={componentName}
                    onChange={(e) => setComponentName(e.target.value)}
                    placeholder="Enter component name"
                    className="mb-1"
                  />
                  <p
                    id="component-error"
                    className="text-sm text-red-500 mt-1 mb-2 hidden"
                  >
                    Please enter a component name
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {uiComponents.map((component) => (
                      <Button
                        key={component}
                        variant="outline"
                        className={`justify-start ${component === componentName ? "border-primary bg-primary/10" : ""}`}
                        onClick={() => handleComponentSelect(component)}
                      >
                        {component === componentName && (
                          <Check className="mr-2 h-4 w-4" />
                        )}
                        {component}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Component Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="responsive"
                        checked={features.responsive}
                        onCheckedChange={() => toggleFeature("responsive")}
                      />
                      <Label htmlFor="responsive">Responsive Design</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="darkMode"
                        checked={features.darkMode}
                        onCheckedChange={() => toggleFeature("darkMode")}
                      />
                      <Label htmlFor="darkMode">Dark Mode Support</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="animation"
                        checked={features.animation}
                        onCheckedChange={() => toggleFeature("animation")}
                      />
                      <Label htmlFor="animation">Animations</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="accessibility"
                        checked={features.accessibility}
                        onCheckedChange={() => toggleFeature("accessibility")}
                      />
                      <Label htmlFor="accessibility">
                        Accessibility (a11y)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="typescript"
                        checked={features.typescript}
                        onCheckedChange={() => toggleFeature("typescript")}
                      />
                      <Label htmlFor="typescript">TypeScript Types</Label>
                    </div>
                  </div>
                </div>
              </div>

              {!isGenerating ? (
                <Button
                  onClick={() => {
                    const message = document.createElement("div");
                    message.className =
                      "fixed top-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded z-50";
                    message.innerHTML =
                      "<p>Starting component generation...</p>";
                    document.body.appendChild(message);

                    setTimeout(() => {
                      message.remove();
                      generateComponent();
                    }, 500);
                  }}
                  className="w-full"
                >
                  Generate Component
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-t-pink-600 border-pink-200 rounded-full animate-spin mr-3"></div>
                    <p className="font-medium">{steps[currentStep]}</p>
                  </div>
                  <div className="mt-4 text-center">
                    <p>Generating component. Please wait...</p>
                  </div>

                  {generatedComponents.length > 0 && (
                    <div className="border rounded-md p-3 bg-muted/30">
                      <h3 className="font-medium mb-2">Generated Files:</h3>
                      <ul className="space-y-1 text-sm">
                        {generatedComponents.map((file, index) => (
                          <li key={index} className="flex items-center">
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            {file}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="page" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layout className="mr-2 h-5 w-5 text-orange-500" />
                Page Section Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="section-name" className="mb-2 block">
                    Section Name
                  </Label>
                  <Input
                    id="section-name"
                    value={componentName}
                    onChange={(e) => setComponentName(e.target.value)}
                    placeholder="Enter section name"
                    className="mb-4"
                  />

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {pageComponents.map((component) => (
                      <Button
                        key={component}
                        variant="outline"
                        className={`justify-start ${component === componentName ? "border-primary bg-primary/10" : ""}`}
                        onClick={() => handleComponentSelect(component)}
                      >
                        {component === componentName && (
                          <Check className="mr-2 h-4 w-4" />
                        )}
                        {component}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Section Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="responsive-page"
                        checked={features.responsive}
                        onCheckedChange={() => toggleFeature("responsive")}
                      />
                      <Label htmlFor="responsive-page">Responsive Design</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="darkMode-page"
                        checked={features.darkMode}
                        onCheckedChange={() => toggleFeature("darkMode")}
                      />
                      <Label htmlFor="darkMode-page">Dark Mode Support</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="animation-page"
                        checked={features.animation}
                        onCheckedChange={() => toggleFeature("animation")}
                      />
                      <Label htmlFor="animation-page">Animations</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="accessibility-page"
                        checked={features.accessibility}
                        onCheckedChange={() => toggleFeature("accessibility")}
                      />
                      <Label htmlFor="accessibility-page">
                        Accessibility (a11y)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="typescript-page"
                        checked={features.typescript}
                        onCheckedChange={() => toggleFeature("typescript")}
                      />
                      <Label htmlFor="typescript-page">TypeScript Types</Label>
                    </div>
                  </div>
                </div>
              </div>

              {!isGenerating ? (
                <Button
                  onClick={() => {
                    const message = document.createElement("div");
                    message.className =
                      "fixed top-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded z-50";
                    message.innerHTML =
                      "<p>Starting page section generation...</p>";
                    document.body.appendChild(message);

                    setTimeout(() => {
                      message.remove();
                      generateComponent();
                    }, 500);
                  }}
                  className="w-full"
                >
                  Generate Page Section
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-t-orange-600 border-orange-200 rounded-full animate-spin mr-3"></div>
                    <p className="font-medium">{steps[currentStep]}</p>
                  </div>

                  {generatedComponents.length > 0 && (
                    <div className="border rounded-md p-3 bg-muted/30">
                      <h3 className="font-medium mb-2">Generated Files:</h3>
                      <ul className="space-y-1 text-sm">
                        {generatedComponents.map((file, index) => (
                          <li key={index} className="flex items-center">
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            {file}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </GeneratorLayout>
  );
};

export default ComponentGenerator;
