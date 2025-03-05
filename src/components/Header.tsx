import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Code, Menu, X, Settings, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import ApiKeyDialog, { ApiKeys } from "./ApiKeyDialog";

interface HeaderProps {
  logoText?: string;
  navItems?: Array<{
    label: string;
    href: string;
  }>;
  onApiKeysChange?: (keys: ApiKeys) => void;
  onDashboardClick?: () => void;
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
}

const Header = ({
  logoText = "AI Full-Stack Generator",
  navItems = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Documentation", href: "/docs" },
    { label: "Examples", href: "/examples" },
  ],
  onApiKeysChange = () => {},
  onDashboardClick = () => {},
  isLoggedIn = false,
  onLoginClick = () => {},
}: HeaderProps) => {
  const [apiKeys, setApiKeys] = useState<ApiKeys>({});

  useEffect(() => {
    // Load saved API keys from localStorage
    const savedKeys = localStorage.getItem("ai-generator-api-keys");
    if (savedKeys) {
      try {
        const parsedKeys = JSON.parse(savedKeys);
        setApiKeys(parsedKeys);
      } catch (e) {
        console.error("Failed to parse saved API keys");
      }
    }
  }, []);

  const handleSaveApiKeys = (keys: ApiKeys) => {
    setApiKeys(keys);
    localStorage.setItem("ai-generator-api-keys", JSON.stringify(keys));
    onApiKeysChange(keys);
  };
  return (
    <header className="w-full h-20 border-b border-border bg-background text-foreground sticky top-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-md">
            <Code size={24} />
          </div>
          <span className="font-bold text-xl">{logoText}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
              onClick={(e) => {
                e.preventDefault();
                const targetId = item.href.split("#")[1];
                if (targetId) {
                  const element = document.getElementById(targetId);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                } else {
                  window.location.href = item.href;
                }
              }}
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center space-x-2">
            <ApiKeyDialog onSaveKeys={handleSaveApiKeys} savedKeys={apiKeys} />
            {isLoggedIn ? (
              <Button
                variant="outline"
                onClick={onDashboardClick}
                className="mr-2 text-sm px-4 py-1.5 h-auto"
              >
                Dashboard
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={onLoginClick}
                className="mr-2 flex items-center text-sm px-4 py-1.5 h-auto"
              >
                <LogIn className="h-3.5 w-3.5 mr-1.5" />
                Login
              </Button>
            )}
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground group relative overflow-hidden text-sm px-4 py-1.5 h-auto"
              onClick={() => {
                // Scroll to generator section
                const generatorSection =
                  document.getElementById("generator-section");
                if (generatorSection) {
                  generatorSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <span className="relative z-10">Start New Project</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-2">
                  <div className="bg-primary text-primary-foreground p-1 rounded-md">
                    <Code size={18} />
                  </div>
                  <span className="font-bold text-lg">{logoText}</span>
                </div>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col space-y-4 mt-6">
                {navItems.map((item, index) => (
                  <SheetClose asChild key={index}>
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors font-medium py-2"
                      onClick={(e) => {
                        e.preventDefault();
                        const targetId = item.href.split("#")[1];
                        if (targetId) {
                          const element = document.getElementById(targetId);
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                          }
                        } else {
                          window.location.href = item.href;
                        }
                      }}
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4 w-full text-sm py-1.5 h-auto"
                    onClick={() => {
                      // Scroll to generator section
                      const generatorSection =
                        document.getElementById("generator-section");
                      if (generatorSection) {
                        generatorSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Start New Project
                  </Button>
                </SheetClose>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
