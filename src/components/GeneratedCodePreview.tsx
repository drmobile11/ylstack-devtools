import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { FileText, FolderTree, Terminal } from "lucide-react";
import CodeEditor from "./CodeEditor";

interface GeneratedCodePreviewProps {
  files: {
    name: string;
    content: string;
    language: string;
  }[];
  onDownload?: () => void;
}

const GeneratedCodePreview: React.FC<GeneratedCodePreviewProps> = ({
  files = [],
  onDownload = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("code");
  const [selectedFile, setSelectedFile] = useState(files[0]?.name || "");

  const currentFile =
    files.find((file) => file.name === selectedFile) || files[0];

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const getLanguageFromFilename = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "js":
        return "javascript";
      case "jsx":
        return "jsx";
      case "ts":
        return "typescript";
      case "tsx":
        return "tsx";
      case "css":
        return "css";
      case "html":
        return "html";
      case "json":
        return "json";
      default:
        return "javascript";
    }
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Generated Code</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs
          defaultValue="code"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="border-b px-4">
            <TabsList className="mb-0">
              <TabsTrigger
                value="code"
                className="data-[state=active]:bg-muted/50 dark:data-[state=active]:bg-muted/20"
              >
                <FileText className="h-4 w-4 mr-2" />
                Code
              </TabsTrigger>
              <TabsTrigger
                value="structure"
                className="data-[state=active]:bg-muted/50 dark:data-[state=active]:bg-muted/20"
              >
                <FolderTree className="h-4 w-4 mr-2" />
                Structure
              </TabsTrigger>
              <TabsTrigger
                value="terminal"
                className="data-[state=active]:bg-muted/50 dark:data-[state=active]:bg-muted/20"
              >
                <Terminal className="h-4 w-4 mr-2" />
                Terminal
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="code" className="mt-0">
            <div className="grid grid-cols-5 h-[600px]">
              <div className="col-span-1 border-r">
                <ScrollArea className="h-full">
                  <div className="p-2">
                    {files.map((file) => (
                      <Button
                        key={file.name}
                        variant="ghost"
                        size="sm"
                        className={`w-full justify-start text-left mb-1 ${selectedFile === file.name ? "bg-muted/50 dark:bg-muted/20" : ""}`}
                        onClick={() => setSelectedFile(file.name)}
                      >
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <span className="truncate">{file.name}</span>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <div className="col-span-4">
                {currentFile && (
                  <CodeEditor
                    code={currentFile.content}
                    language={
                      currentFile.language ||
                      getLanguageFromFilename(currentFile.name)
                    }
                    title={currentFile.name}
                    onCopy={() => handleCopy(currentFile.content)}
                    onDownload={onDownload}
                    height="600px"
                  />
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="structure" className="mt-0">
            <div className="p-4 h-[600px]">
              <h3 className="font-medium mb-4">Project Structure</h3>
              <div className="border rounded-md p-4 bg-muted/30 dark:bg-muted/10">
                <pre className="text-sm font-mono">
                  {`project-root/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── index.tsx
│   │   └── ...
│   ├── styles/
│   │   └── globals.css
│   └── utils/
│       └── api.ts
├── public/
│   └── assets/
├── package.json
└── README.md`}
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="terminal" className="mt-0">
            <div className="p-0 h-[600px] bg-black text-green-400 font-mono text-sm">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <p>
                    $ npm create vite@latest my-project -- --template react-ts
                  </p>
                  <p className="opacity-80">
                    Scaffolding project in ./my-project...
                  </p>
                  <p className="opacity-80">Done. Now run:</p>
                  <p className="opacity-80"> cd my-project</p>
                  <p className="opacity-80"> npm install</p>
                  <p className="opacity-80"> npm run dev</p>
                  <p>$ cd my-project</p>
                  <p>$ npm install</p>
                  <p className="opacity-80">
                    added 1421 packages, and audited 1422 packages in 25s
                  </p>
                  <p className="opacity-80">
                    231 packages are looking for funding
                  </p>
                  <p className="opacity-80">found 0 vulnerabilities</p>
                  <p>$ npm install tailwindcss postcss autoprefixer</p>
                  <p className="opacity-80">
                    added 38 packages, and audited 1460 packages in 3s
                  </p>
                  <p>$ npx tailwindcss init -p</p>
                  <p className="opacity-80">
                    Created Tailwind CSS config file: tailwind.config.js
                  </p>
                  <p className="opacity-80">
                    Created PostCSS config file: postcss.config.js
                  </p>
                  <p>$ npm install @supabase/supabase-js</p>
                  <p className="opacity-80">
                    added 24 packages, and audited 1484 packages in 2s
                  </p>
                  <p>$ npm run dev</p>
                  <p className="opacity-80">VITE v5.0.10 ready in 237 ms</p>
                  <p className="opacity-80">➜ Local: http://localhost:5173/</p>
                  <p className="opacity-80">➜ Network: use --host to expose</p>
                  <p className="opacity-80">➜ press h to show help</p>
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GeneratedCodePreview;
