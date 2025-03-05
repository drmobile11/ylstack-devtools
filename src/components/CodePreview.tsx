import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Copy, Download, Code, FileText, FolderTree } from "lucide-react";
import CodeEditor from "./CodeEditor";

interface CodePreviewProps {
  files?: {
    name: string;
    content: string;
    language: string;
  }[];
  activeFile?: string;
  onFileSelect?: (fileName: string) => void;
  onCopyCode?: (content: string) => void;
  onDownload?: () => void;
}

const CodePreview = ({
  files = [
    {
      name: "index.js",
      content: `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);`,
      language: "javascript",
    },
    {
      name: "App.js",
      content: `import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My App</h1>
        <p>Edit <code>src/App.js</code> and save to reload.</p>
      </header>
    </div>
  );
}

export default App;`,
      language: "javascript",
    },
    {
      name: "styles.css",
      content: `.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}`,
      language: "css",
    },
  ],
  activeFile = "index.js",
  onFileSelect = () => {},
  onCopyCode = () => {},
  onDownload = () => {},
}: CodePreviewProps) => {
  const [selectedFile, setSelectedFile] = useState(activeFile);

  const handleFileSelect = (fileName: string) => {
    setSelectedFile(fileName);
    onFileSelect(fileName);
  };

  const handleCopyCode = () => {
    const currentFile = files.find((file) => file.name === selectedFile);
    if (currentFile) {
      onCopyCode(currentFile.content);
    }
  };

  const currentFile =
    files.find((file) => file.name === selectedFile) || files[0];

  return (
    <Card className="w-full h-full bg-background border-border">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Code Preview</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleCopyCode}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={onDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="code" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="code">
              <Code className="h-4 w-4 mr-2" />
              Code
            </TabsTrigger>
            <TabsTrigger value="files">
              <FileText className="h-4 w-4 mr-2" />
              Files
            </TabsTrigger>
            <TabsTrigger value="structure">
              <FolderTree className="h-4 w-4 mr-2" />
              Structure
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="code"
            className="border rounded-md p-0 overflow-hidden"
          >
            <div className="bg-muted p-2 border-b flex items-center overflow-x-auto">
              {files.map((file) => (
                <Button
                  key={file.name}
                  variant={selectedFile === file.name ? "secondary" : "ghost"}
                  size="sm"
                  className="mr-1 text-xs"
                  onClick={() => handleFileSelect(file.name)}
                >
                  {file.name}
                </Button>
              ))}
            </div>
            <CodeEditor
              code={currentFile.content}
              language={currentFile.language}
              title={currentFile.name}
              onCopy={() => onCopyCode(currentFile.content)}
              onDownload={onDownload}
              height="400px"
            />
          </TabsContent>

          <TabsContent value="files" className="border rounded-md">
            <ScrollArea className="h-[400px] w-full">
              <div className="p-4">
                <h3 className="font-medium mb-2">Project Files</h3>
                <ul className="space-y-1">
                  {files.map((file) => (
                    <li key={file.name} className="flex items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-left"
                        onClick={() => handleFileSelect(file.name)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        {file.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="structure" className="border rounded-md">
            <ScrollArea className="h-[400px] w-full">
              <div className="p-4">
                <h3 className="font-medium mb-2">Project Structure</h3>
                <div className="pl-4 border-l border-border">
                  <div className="mb-2">
                    <div className="flex items-center">
                      <FolderTree className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">src/</span>
                    </div>
                    <div className="pl-6 mt-1 space-y-1">
                      {files.map((file) => (
                        <div key={file.name} className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{file.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <FolderTree className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">public/</span>
                    </div>
                    <div className="pl-6 mt-1">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>index.html</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CodePreview;
