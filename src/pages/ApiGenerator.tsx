import React, { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Server, Database, ArrowRight } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import GeneratorLayout from "../components/GeneratorLayout";

const ApiGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedFiles, setGeneratedFiles] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("rest");

  const steps = [
    "Analyzing API requirements...",
    "Creating API structure...",
    "Generating controllers...",
    "Generating routes...",
    "Implementing authentication...",
    "Adding validation...",
    "Creating documentation...",
    "Finalizing API...",
  ];

  const restApiFiles = [
    "src/controllers/userController.ts",
    "src/controllers/productController.ts",
    "src/routes/userRoutes.ts",
    "src/routes/productRoutes.ts",
    "src/middleware/auth.ts",
    "src/middleware/validation.ts",
    "src/models/User.ts",
    "src/models/Product.ts",
  ];

  const graphqlFiles = [
    "src/graphql/schema.ts",
    "src/graphql/resolvers/userResolvers.ts",
    "src/graphql/resolvers/productResolvers.ts",
    "src/graphql/typeDefs/userTypes.ts",
    "src/graphql/typeDefs/productTypes.ts",
    "src/models/User.ts",
    "src/models/Product.ts",
  ];

  const generateApi = async () => {
    setIsGenerating(true);
    setGeneratedFiles([]);
    setCurrentStep(0);

    const filesToCreate = activeTab === "rest" ? restApiFiles : graphqlFiles;

    // Process each step with a delay
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Add files at specific steps
      if (i === 2) {
        setGeneratedFiles((prev) => [
          ...prev,
          filesToCreate[0],
          filesToCreate[1],
        ]);
      } else if (i === 3) {
        setGeneratedFiles((prev) => [
          ...prev,
          filesToCreate[2],
          filesToCreate[3],
        ]);
      } else if (i === 4) {
        setGeneratedFiles((prev) => [...prev, filesToCreate[4]]);
      } else if (i === 5) {
        setGeneratedFiles((prev) => [...prev, filesToCreate[5]]);
      } else if (i === 6) {
        setGeneratedFiles((prev) => [
          ...prev,
          filesToCreate[6],
          filesToCreate[7],
        ]);
      }
    }

    // Complete
    await new Promise((resolve) => setTimeout(resolve, 800));
    // API generation complete
    setIsGenerating(false);
  };

  return (
    <GeneratorLayout
      title="API Generator"
      description="Generate RESTful or GraphQL APIs for your application"
      icon={<Server className="h-6 w-6 text-blue-500" />}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rest">RESTful API</TabsTrigger>
          <TabsTrigger value="graphql">GraphQL API</TabsTrigger>
        </TabsList>

        <TabsContent value="rest" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5 text-blue-500" />
                RESTful API Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Generate a complete RESTful API with controllers, routes,
                middleware, and models.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-medium mb-2">Endpoints to generate:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>GET /api/users - Get all users</li>
                    <li>GET /api/users/:id - Get user by ID</li>
                    <li>POST /api/users - Create a new user</li>
                    <li>PUT /api/users/:id - Update a user</li>
                    <li>DELETE /api/users/:id - Delete a user</li>
                    <li>GET /api/products - Get all products</li>
                    <li>GET /api/products/:id - Get product by ID</li>
                    <li>POST /api/products - Create a product</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Features:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>JWT Authentication</li>
                    <li>Request validation</li>
                    <li>Error handling middleware</li>
                    <li>Rate limiting</li>
                    <li>Swagger documentation</li>
                    <li>TypeScript interfaces</li>
                  </ul>
                </div>
              </div>

              {!isGenerating ? (
                <Button
                  onClick={() => {
                    const message = document.createElement("div");
                    message.className =
                      "fixed top-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded z-50";
                    message.innerHTML =
                      "<p>Starting RESTful API generation...</p>";
                    document.body.appendChild(message);

                    setTimeout(() => {
                      message.remove();
                      generateApi();
                    }, 500);
                  }}
                  className="w-full"
                >
                  Generate RESTful API
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mr-3"></div>
                    <p className="font-medium">{steps[currentStep]}</p>
                  </div>
                  <div className="mt-4 text-center">
                    <p>Generating API code. Please wait...</p>
                  </div>

                  {generatedFiles.length > 0 && (
                    <div className="border rounded-md p-3 bg-muted/30">
                      <h3 className="font-medium mb-2">Generated Files:</h3>
                      <ul className="space-y-1 text-sm">
                        {generatedFiles.map((file, index) => (
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

        <TabsContent value="graphql" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5 text-purple-500" />
                GraphQL API Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Generate a complete GraphQL API with schema, resolvers, and type
                definitions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-medium mb-2">Types to generate:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>User type with CRUD operations</li>
                    <li>Product type with CRUD operations</li>
                    <li>Authentication types (login, register)</li>
                    <li>Custom input types</li>
                    <li>Pagination types</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Features:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>JWT Authentication</li>
                    <li>Input validation</li>
                    <li>Error handling</li>
                    <li>DataLoader for batching</li>
                    <li>GraphQL Shield for permissions</li>
                    <li>TypeScript interfaces</li>
                  </ul>
                </div>
              </div>

              {!isGenerating ? (
                <Button
                  onClick={() => {
                    const message = document.createElement("div");
                    message.className =
                      "fixed top-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded z-50";
                    message.innerHTML =
                      "<p>Starting GraphQL API generation...</p>";
                    document.body.appendChild(message);

                    setTimeout(() => {
                      message.remove();
                      generateApi();
                    }, 500);
                  }}
                  className="w-full"
                >
                  Generate GraphQL API
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-t-purple-600 border-purple-200 rounded-full animate-spin mr-3"></div>
                    <p className="font-medium">{steps[currentStep]}</p>
                  </div>

                  {generatedFiles.length > 0 && (
                    <div className="border rounded-md p-3 bg-muted/30">
                      <h3 className="font-medium mb-2">Generated Files:</h3>
                      <ul className="space-y-1 text-sm">
                        {generatedFiles.map((file, index) => (
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

export default ApiGenerator;
