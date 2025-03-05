import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Switch } from "./ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Info } from "lucide-react";

interface CloudflareIntegrationOption {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  tooltip: string;
}

interface CloudflareIntegrationsProps {
  integrations?: CloudflareIntegrationOption[];
  onToggle?: (id: string, enabled: boolean) => void;
}

const CloudflareIntegrations = ({
  integrations = [
    {
      id: "pages",
      name: "Cloudflare Pages",
      description: "Deploy static sites and frontend applications",
      enabled: true,
      tooltip:
        "Automatically deploy and host your static site or frontend application",
    },
    {
      id: "d1",
      name: "Cloudflare D1",
      description: "SQLite database at the edge",
      enabled: false,
      tooltip:
        "Serverless SQL database built on SQLite, optimized for Cloudflare Workers",
    },
    {
      id: "kv",
      name: "Cloudflare KV",
      description: "Key-value storage for global data",
      enabled: false,
      tooltip: "Global, low-latency key-value data store",
    },
    {
      id: "r2",
      name: "Cloudflare R2",
      description: "Object storage for files and assets",
      enabled: false,
      tooltip: "S3-compatible object storage with no egress fees",
    },
    {
      id: "durable-objects",
      name: "Durable Objects",
      description: "Stateful serverless computing",
      enabled: false,
      tooltip: "Maintain state and coordinate across multiple requests",
    },
  ],
  onToggle = () => {},
}: CloudflareIntegrationsProps) => {
  const handleToggle = (id: string, enabled: boolean) => {
    onToggle(id, enabled);
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Cloudflare Integrations
        </h2>
        <p className="text-gray-600">
          Configure Cloudflare-specific integrations for your project
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration) => (
          <Card key={integration.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{integration.name}</CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Info size={16} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{integration.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <CardDescription>{integration.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {integration.enabled ? "Enabled" : "Disabled"}
                </span>
                <Switch
                  checked={integration.enabled}
                  onCheckedChange={(checked) =>
                    handleToggle(integration.id, checked)
                  }
                  aria-label={`Toggle ${integration.name}`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
        <p className="text-sm text-blue-700">
          Cloudflare integrations will be configured in your project with
          appropriate bindings and environment variables.
        </p>
      </div>
    </div>
  );
};

export default CloudflareIntegrations;
