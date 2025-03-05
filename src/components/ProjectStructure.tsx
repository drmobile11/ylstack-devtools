import React from "react";
import { Folder, File, ChevronRight, ChevronDown } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface FileNode {
  name: string;
  type: "file" | "directory";
  children?: FileNode[];
}

interface ProjectStructureProps {
  projectStructure?: FileNode[];
  onFileSelect?: (filePath: string) => void;
}

const ProjectStructure = ({
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
  onFileSelect = () => {},
}: ProjectStructureProps) => {
  // Function to render file tree recursively
  const renderFileTree = (nodes: FileNode[], basePath: string = "") => {
    return nodes.map((node, index) => {
      const currentPath = `${basePath}${basePath ? "/" : ""}${node.name}`;

      if (node.type === "file") {
        return (
          <div key={`${currentPath}-${index}`} className="pl-4 py-1">
            <Button
              variant="ghost"
              className="h-7 px-2 justify-start w-full hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => onFileSelect(currentPath)}
            >
              <File className="h-4 w-4 mr-2 text-blue-500" />
              <span className="text-sm">{node.name}</span>
            </Button>
          </div>
        );
      }

      return (
        <AccordionItem
          key={`${currentPath}-${index}`}
          value={currentPath}
          className="border-0"
        >
          <AccordionTrigger className="py-1 px-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
            <div className="flex items-center">
              <Folder className="h-4 w-4 mr-2 text-yellow-500" />
              <span className="text-sm">{node.name}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-0">
            {node.children && renderFileTree(node.children, currentPath)}
          </AccordionContent>
        </AccordionItem>
      );
    });
  };

  return (
    <div className="w-full h-full border rounded-md bg-white dark:bg-slate-950 flex flex-col">
      <div className="p-3 border-b">
        <h3 className="font-medium text-sm">Project Structure</h3>
      </div>
      <ScrollArea className="flex-1 p-2">
        <Accordion type="multiple" defaultValue={["src"]} className="w-full">
          {renderFileTree(projectStructure)}
        </Accordion>
      </ScrollArea>
    </div>
  );
};

export default ProjectStructure;
