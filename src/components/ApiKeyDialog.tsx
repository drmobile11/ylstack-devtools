import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Settings, Key, Save, Check } from "lucide-react";

interface ApiKeyDialogProps {
  onSaveKeys: (keys: ApiKeys) => void;
  savedKeys: ApiKeys;
}

export interface ApiKeys {
  openai?: string;
  cloudflare?: string;
  deepseek?: string;
  gemini?: string;
}

const ApiKeyDialog = ({ onSaveKeys, savedKeys }: ApiKeyDialogProps) => {
  const [keys, setKeys] = useState<ApiKeys>(savedKeys || {});
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSaveKeys(keys);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChange = (provider: keyof ApiKeys, value: string) => {
    setKeys((prev) => ({ ...prev, [provider]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Settings className="h-4 w-4" />
          <span className="sr-only">API Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" /> API Key Configuration
          </DialogTitle>
          <DialogDescription>
            Enter your API keys for the AI models you want to use. Your keys are
            stored locally in your browser and never sent to our servers.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="openai" className="flex items-center gap-2">
              OpenAI API Key
            </Label>
            <Input
              id="openai"
              type="password"
              placeholder="sk-..."
              value={keys.openai || ""}
              onChange={(e) => handleChange("openai", e.target.value)}
              className="font-mono"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cloudflare" className="flex items-center gap-2">
              Cloudflare API Token
            </Label>
            <Input
              id="cloudflare"
              type="password"
              placeholder="..."
              value={keys.cloudflare || ""}
              onChange={(e) => handleChange("cloudflare", e.target.value)}
              className="font-mono"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="deepseek" className="flex items-center gap-2">
              DeepSeek API Key
            </Label>
            <Input
              id="deepseek"
              type="password"
              placeholder="..."
              value={keys.deepseek || ""}
              onChange={(e) => handleChange("deepseek", e.target.value)}
              className="font-mono"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="gemini" className="flex items-center gap-2">
              Google Gemini API Key
            </Label>
            <Input
              id="gemini"
              type="password"
              placeholder="..."
              value={keys.gemini || ""}
              onChange={(e) => handleChange("gemini", e.target.value)}
              className="font-mono"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave} className="flex items-center gap-2">
            {saved ? (
              <>
                <Check className="h-4 w-4" /> Saved
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Save Keys
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
