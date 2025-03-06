import React, { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Database, ArrowRight, Plus, Trash } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import GeneratorLayout from "../components/GeneratorLayout";

interface Field {
  name: string;
  type: string;
  required: boolean;
}

const CrudGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedFiles, setGeneratedFiles] = useState<string[]>([]);
  const [modelName, setModelName] = useState("");
  const [fields, setFields] = useState<Field[]>([
    { name: "id", type: "string", required: true },
    { name: "name", type: "string", required: true },
    { name: "createdAt", type: "date", required: true },
  ]);

  const steps = [
    "Analyzing model structure...",
    "Creating database schema...",
    "Generating model...",
    "Creating controller...",
    "Generating routes...",
    "Creating frontend components...",
    "Adding validation...",
    "Finalizing CRUD operations...",
  ];

  const fieldTypes = ["string", "number", "boolean", "date", "object", "array"];

  const addField = () => {
    setFields([...fields, { name: "", type: "string", required: false }]);
  };

  const removeField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const updateField = (index: number, field: Partial<Field>) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], ...field };
    setFields(newFields);
  };

  const generateCrud = async () => {
    if (!modelName) {
      // Show error message in the form
      document.getElementById("model-error")?.classList.remove("hidden");
      return;
    }

    if (fields.some((field) => !field.name)) {
      // Show error message in the form
      document.getElementById("fields-error")?.classList.remove("hidden");
      return;
    }

    setIsGenerating(true);
    setGeneratedFiles([]);
    setCurrentStep(0);

    const capitalizedModel =
      modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const pluralModel = modelName.endsWith("s") ? modelName : `${modelName}s`;

    // Process each step with a delay
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Add files at specific steps
      if (i === 1) {
        setGeneratedFiles((prev) => [
          ...prev,
          `src/database/migrations/create_${pluralModel}_table.ts`,
        ]);
      } else if (i === 2) {
        setGeneratedFiles((prev) => [
          ...prev,
          `src/models/${capitalizedModel}.ts`,
        ]);
      } else if (i === 3) {
        setGeneratedFiles((prev) => [
          ...prev,
          `src/controllers/${modelName}Controller.ts`,
        ]);
      } else if (i === 4) {
        setGeneratedFiles((prev) => [
          ...prev,
          `src/routes/${modelName}Routes.ts`,
        ]);
      } else if (i === 5) {
        setGeneratedFiles((prev) => [
          ...prev,
          `src/components/${capitalizedModel}/${capitalizedModel}List.tsx`,
          `src/components/${capitalizedModel}/${capitalizedModel}Form.tsx`,
          `src/components/${capitalizedModel}/${capitalizedModel}Detail.tsx`,
        ]);
      } else if (i === 6) {
        setGeneratedFiles((prev) => [
          ...prev,
          `src/validation/${modelName}Validation.ts`,
        ]);
      }
    }

    // Complete
    await new Promise((resolve) => setTimeout(resolve, 800));
    // CRUD operations generated successfully
    setIsGenerating(false);
  };

  return (
    <GeneratorLayout
      title="CRUD Generator"
      description="Generate complete CRUD operations for your data models"
      icon={<Database className="h-6 w-6 text-green-500" />}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="mr-2 h-5 w-5 text-green-500" />
            Generate CRUD Operations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isGenerating ? (
            <div className="space-y-6">
              <div>
                <Label htmlFor="model-name" className="mb-2 block">
                  Model Name (singular)
                </Label>
                <Input
                  id="model-name"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  placeholder="user, product, post, etc."
                  className="mb-1"
                />
                <p
                  id="model-error"
                  className="text-sm text-red-500 mt-1 mb-2 hidden"
                >
                  Please enter a model name
                </p>
                <p
                  id="fields-error"
                  className="text-sm text-red-500 mt-1 mb-2 hidden"
                >
                  All fields must have a name
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Model Fields</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addField}
                    className="flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Field
                  </Button>
                </div>

                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-1">
                        <Input
                          value={field.name}
                          onChange={(e) =>
                            updateField(index, { name: e.target.value })
                          }
                          placeholder="Field name"
                        />
                      </div>

                      <div className="w-32">
                        <Select
                          value={field.type}
                          onValueChange={(value) =>
                            updateField(index, { type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {fieldTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`required-${index}`}
                          checked={field.required}
                          onChange={(e) =>
                            updateField(index, { required: e.target.checked })
                          }
                          className="mr-2"
                        />
                        <Label
                          htmlFor={`required-${index}`}
                          className="text-sm"
                        >
                          Required
                        </Label>
                      </div>

                      {index > 2 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeField(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-100"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => {
                  const message = document.createElement("div");
                  message.className =
                    "fixed top-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded z-50";
                  message.innerHTML =
                    "<p>Starting CRUD operations generation...</p>";
                  document.body.appendChild(message);

                  setTimeout(() => {
                    message.remove();
                    generateCrud();
                  }, 500);
                }}
                className="w-full"
              >
                Generate CRUD Operations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-t-green-600 border-green-200 rounded-full animate-spin mr-3"></div>
                <p className="font-medium">{steps[currentStep]}</p>
              </div>
              <div className="mt-4 text-center">
                <p>Generating CRUD operations. Please wait...</p>
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
    </GeneratorLayout>
  );
};

export default CrudGenerator;
