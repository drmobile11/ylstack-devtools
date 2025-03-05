import React from "react";
import { Download, Copy, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface DownloadOptionsProps {
  projectName?: string;
  downloadUrl?: string;
  deploymentInstructions?: string;
  onDownloadZip?: () => void;
  onCopyInstructions?: () => void;
  onViewDeployment?: () => void;
}

const DownloadOptions = ({
  projectName = "my-fullstack-project",
  downloadUrl = "#",
  deploymentInstructions = "# Deployment Instructions\n\n1. Download the ZIP file\n2. Extract the contents\n3. Run 'npm install'\n4. Configure your Cloudflare account\n5. Deploy with 'npm run deploy'",
  onDownloadZip = () => console.log("Downloading ZIP..."),
  onCopyInstructions = () => console.log("Copying deployment instructions..."),
  onViewDeployment = () => console.log("Viewing deployment options..."),
}: DownloadOptionsProps) => {
  return (
    <Card className="w-full bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Download & Deploy</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600">
          Your project <span className="font-semibold">{projectName}</span> is
          ready to download and deploy.
        </div>

        <div className="flex flex-wrap gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    onDownloadZip();
                    // In a real app, this would trigger a file download
                    console.log("Downloading project as ZIP");
                    // Mock download with a timeout
                    setTimeout(() => {
                      alert(
                        "Your project has been downloaded. In a real app, this would save a ZIP file to your device.",
                      );
                    }, 1500);
                  }}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Download size={16} />
                  Download as ZIP
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download the complete project as a ZIP file</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    onCopyInstructions();
                    // In a real app, this would copy instructions to clipboard
                    const instructions = `# Deployment Instructions

1. Download the ZIP file
2. Extract the contents
3. Run 'npm install'
4. Configure your Cloudflare account
5. Deploy with 'npm run deploy'`;
                    navigator.clipboard.writeText(instructions);
                    alert("Deployment instructions copied to clipboard!");
                  }}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Copy size={16} />
                  Copy Deployment Instructions
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy instructions to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    onViewDeployment();
                    // In a real app, this would open deployment documentation
                    const deploymentUrl =
                      "https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-application/";
                    window.open(deploymentUrl, "_blank");
                  }}
                  variant="secondary"
                  className="flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  View Deployment Options
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>See additional deployment options</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="text-xs text-gray-500">
          Ready for Cloudflare deployment
        </div>
        <Button
          variant="link"
          size="sm"
          className="text-blue-600"
          onClick={() => {
            // In a real app, this would open deployment documentation
            const deploymentDocsUrl =
              "https://developers.cloudflare.com/pages/";
            window.open(deploymentDocsUrl, "_blank");
          }}
        >
          Learn more about deployment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DownloadOptions;
