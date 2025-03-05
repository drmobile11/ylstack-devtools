import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { Brain, Cloud, Sparkles, Bot } from "lucide-react";

interface AIModel {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

import { ApiKeys } from "./ApiKeyDialog";

interface AIModelSelectorProps {
  selectedModel?: string;
  onSelectModel?: (modelId: string) => void;
  apiKeys?: ApiKeys;
}

const AIModelSelector = ({
  selectedModel = "cloudflare",
  onSelectModel = () => {},
  apiKeys = {},
}: AIModelSelectorProps) => {
  const aiModels: AIModel[] = [
    {
      id: "cloudflare",
      name: "Cloudflare Workers AI",
      description: "Optimized for edge computing with low latency responses",
      icon: <Cloud className="h-8 w-8 text-blue-500" />,
    },
    {
      id: "openai",
      name: "OpenAI",
      description: "Powerful models with advanced reasoning capabilities",
      icon: <Sparkles className="h-8 w-8 text-green-500" />,
    },
    {
      id: "deepseek",
      name: "DeepSeek",
      description: "Specialized in code generation and technical tasks",
      icon: <Brain className="h-8 w-8 text-purple-500" />,
    },
    {
      id: "gemini",
      name: "Google Gemini",
      description: "Multimodal capabilities with strong reasoning",
      icon: <Bot className="h-8 w-8 text-amber-500" />,
    },
  ];

  const handleModelChange = (value: string) => {
    onSelectModel(value);
  };

  return (
    <div className="w-full bg-card text-card-foreground p-6 rounded-lg shadow-sm border border-border">
      <h2 className="text-2xl font-bold mb-4">Select AI Model</h2>
      <p className="text-muted-foreground mb-6">
        Choose the AI model that will generate your full-stack code
      </p>

      <RadioGroup
        value={selectedModel}
        onValueChange={handleModelChange}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {aiModels.map((model) => (
          <Card
            key={model.id}
            className={`cursor-pointer border-2 transition-all ${selectedModel === model.id ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"} ${!apiKeys[model.id as keyof ApiKeys] && model.id !== "cloudflare" ? "opacity-60" : ""}`}
          >
            <label htmlFor={model.id} className="cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="p-2 rounded-full bg-muted">{model.icon}</div>
                <div>
                  <CardTitle className="text-xl">{model.name}</CardTitle>
                </div>
                <div className="ml-auto">
                  <RadioGroupItem value={model.id} id={model.id} />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {model.description}
                  {!apiKeys[model.id as keyof ApiKeys] &&
                    model.id !== "cloudflare" && (
                      <div className="mt-2 text-amber-600 text-xs">
                        API key required. Configure in settings.
                      </div>
                    )}
                </CardDescription>
              </CardContent>
            </label>
          </Card>
        ))}
      </RadioGroup>

      <CardFooter className="flex justify-end mt-6 px-0">
        <Button variant="outline" className="mr-2">
          Back
        </Button>
        <Button>Continue</Button>
      </CardFooter>
    </div>
  );
};

export default AIModelSelector;
