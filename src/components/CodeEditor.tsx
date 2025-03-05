import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Copy, Download } from "lucide-react";

interface CodeEditorProps {
  code: string;
  language?: string;
  title?: string;
  onCopy?: () => void;
  onDownload?: () => void;
  height?: string;
}

declare global {
  interface Window {
    Prism: any;
  }
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language = "javascript",
  title = "Code Editor",
  onCopy = () => {},
  onDownload = () => {},
  height = "400px",
}) => {
  const codeRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    // Load Prism.js dynamically if it's not already loaded
    if (!window.Prism) {
      const prismCss = document.createElement("link");
      prismCss.rel = "stylesheet";
      prismCss.href =
        "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css";
      document.head.appendChild(prismCss);

      const prismScript = document.createElement("script");
      prismScript.src =
        "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js";
      prismScript.async = true;
      prismScript.onload = loadLanguages;
      document.body.appendChild(prismScript);
    } else {
      highlightCode();
    }

    function loadLanguages() {
      const languageScript = document.createElement("script");
      languageScript.src =
        "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-typescript.min.js";
      languageScript.async = true;
      languageScript.onload = () => {
        const jsxScript = document.createElement("script");
        jsxScript.src =
          "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-jsx.min.js";
        jsxScript.async = true;
        jsxScript.onload = () => {
          const tsxScript = document.createElement("script");
          tsxScript.src =
            "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-tsx.min.js";
          tsxScript.async = true;
          tsxScript.onload = highlightCode;
          document.body.appendChild(tsxScript);
        };
        document.body.appendChild(jsxScript);
      };
      document.body.appendChild(languageScript);
    }
  }, []);

  useEffect(() => {
    highlightCode();
  }, [code, language]);

  const highlightCode = () => {
    if (window.Prism && codeRef.current) {
      window.Prism.highlightElement(codeRef.current);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    onCopy();
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4 bg-slate-900 dark:bg-slate-950 text-white">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 text-xs text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Copy className="h-3.5 w-3.5 mr-1" />
            Copy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDownload}
            className="h-7 text-xs text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Download className="h-3.5 w-3.5 mr-1" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div
          className="overflow-auto bg-[#2d2d2d] dark:bg-[#1e1e1e] text-white"
          style={{ height }}
        >
          <pre
            className={`language-${language} h-full m-0 p-4 text-sm`}
            ref={codeRef}
          >
            <code className={`language-${language}`}>{code}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeEditor;
