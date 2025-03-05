import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Code, FileCode, Layers, Settings, Terminal } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

// Form schema using zod for validation
const formSchema = z.object({
  projectName: z
    .string()
    .min(3, { message: "Project name must be at least 3 characters" }),
  projectDescription: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  features: z.string().optional(),
  routes: z.string().optional(),
  dataModels: z.string().optional(),
  apiEndpoints: z.string().optional(),
  additionalRequirements: z.string().optional(),
});

type ProjectSpecificationFormProps = {
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
};

const ProjectSpecificationForm = ({
  onSubmit = () => {},
}: ProjectSpecificationFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectDescription: "",
      features: "",
      routes: "",
      dataModels: "",
      apiEndpoints: "",
      additionalRequirements: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Project Specification</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Project" {...field} />
                  </FormControl>
                  <FormDescription>
                    A short, descriptive name for your project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A web application that allows users to..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe what your project does and its main purpose
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="features" className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Features
              </TabsTrigger>
              <TabsTrigger value="routes" className="flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                Routes
              </TabsTrigger>
              <TabsTrigger
                value="dataModels"
                className="flex items-center gap-2"
              >
                <FileCode className="h-4 w-4" />
                Data Models
              </TabsTrigger>
              <TabsTrigger
                value="apiEndpoints"
                className="flex items-center gap-2"
              >
                <Code className="h-4 w-4" />
                API Endpoints
              </TabsTrigger>
              <TabsTrigger
                value="additional"
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Additional
              </TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Features</CardTitle>
                  <CardDescription>
                    List the main features and functionality of your application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="- User authentication\n- Dashboard with analytics\n- File upload functionality\n- Real-time notifications"
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Use bullet points to list features clearly
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="routes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Routes</CardTitle>
                  <CardDescription>
                    Define the main routes and pages of your application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="routes"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="- / (Home page)\n- /dashboard\n- /profile\n- /settings\n- /auth/login\n- /auth/register"
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          List the routes with a brief description if needed
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dataModels" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Models</CardTitle>
                  <CardDescription>
                    Define the data models and their relationships
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="dataModels"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="User:\n- id: string\n- name: string\n- email: string\n- password: string\n\nPost:\n- id: string\n- title: string\n- content: string\n- authorId: string (references User.id)"
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Describe your data models with fields and
                          relationships
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="apiEndpoints" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Endpoints</CardTitle>
                  <CardDescription>
                    Define the API endpoints your application will use
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="apiEndpoints"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="GET /api/users - Get all users\nGET /api/users/:id - Get user by ID\nPOST /api/users - Create a new user\nPUT /api/users/:id - Update a user\nDELETE /api/users/:id - Delete a user"
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          List API endpoints with HTTP methods and descriptions
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="additional" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Additional Requirements</CardTitle>
                  <CardDescription>
                    Any additional requirements or specifications for your
                    project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="additionalRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="- Mobile responsive design\n- Dark mode support\n- Accessibility requirements\n- Performance considerations\n- SEO optimization"
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Include any other requirements not covered in the
                          previous sections
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Specification
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectSpecificationForm;
