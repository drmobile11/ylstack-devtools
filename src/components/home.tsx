import React, { useState, useEffect } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import FeatureShowcase from "./FeatureShowcase";
import VideoShowcase from "./VideoShowcase";
import NextjsTemplate from "../templates/NextjsTemplate";
import ReactTemplate from "../templates/ReactTemplate";
import NodejsTemplate from "../templates/NodejsTemplate";
import CloudflareTemplate from "../templates/CloudflareTemplate";
import ProjectGenerator from "./ProjectGenerator";
import GenerationResults from "./GenerationResults";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
import { ApiKeys } from "./ApiKeyDialog";
import ThemeToggle from "./ThemeToggle";
import PricingSection from "./PricingSection";
import AuthForm from "./AuthForm";

const Home = () => {
  const [showGenerator, setShowGenerator] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projectData, setProjectData] = useState(null);
  const [apiKeys, setApiKeys] = useState<ApiKeys>({});
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleStartProject = () => {
    setShowGenerator(true);
    setShowResults(false);
    // Scroll to generator section
    document
      .getElementById("generator-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGenerationComplete = (data: any) => {
    setProjectData(data);
    setShowResults(true);
    setShowGenerator(false);
  };

  const handleBackToGenerator = () => {
    setShowResults(false);
    setShowGenerator(true);
  };

  const handleNewProject = () => {
    setShowResults(false);
    setShowGenerator(true);
    setProjectData(null);
  };

  const handleApiKeysChange = (keys: ApiKeys) => {
    setApiKeys(keys);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleShowDashboard = () => {
    if (isLoggedIn) {
      setShowDashboard(true);
      setShowGenerator(false);
      setShowResults(false);
      setShowAuth(false);
    } else {
      setShowAuth(true);
    }
  };

  const handleLogin = (values: any) => {
    console.log("Login values:", values);
    // Mock login - in production this would call an API
    setIsLoggedIn(true);
    setShowAuth(false);
    setShowDashboard(true);
  };

  const handleRegister = (values: any) => {
    console.log("Register values:", values);
    // Mock registration - in production this would call an API
    setIsLoggedIn(true);
    setShowAuth(false);
    setShowDashboard(true);
  };

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200`}
    >
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle onToggle={toggleTheme} isDarkMode={isDarkMode} />
      </div>
      <Header
        onApiKeysChange={handleApiKeysChange}
        onDashboardClick={handleShowDashboard}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowAuth(true)}
      />

      <main className="flex-1">
        {showAuth ? (
          <div className="py-16 px-4 bg-muted/30 dark:bg-muted/10 min-h-[80vh] flex items-center justify-center">
            <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
          </div>
        ) : showDashboard ? (
          <Dashboard onNewProject={handleStartProject} apiKeys={apiKeys} />
        ) : (
          <>
            {/* Hero Section */}
            <HeroSection onStartProject={handleStartProject} />

            {/* Video Showcase */}
            <VideoShowcase />

            {/* Features Section */}
            <section id="features">
              <FeatureSection />
            </section>

            {/* Feature Showcase */}
            <FeatureShowcase />

            {/* Pricing Section */}
            <section id="pricing">
              <PricingSection />
            </section>

            {/* Generator Section */}
            <section
              id="generator-section"
              className="py-16 px-4 bg-muted/30 dark:bg-muted/10"
            >
              <div className="max-w-6xl mx-auto">
                {showGenerator && !showResults && (
                  <ProjectGenerator
                    onComplete={handleGenerationComplete}
                    apiKeys={apiKeys}
                  />
                )}

                {showResults && (
                  <GenerationResults
                    projectName={
                      projectData?.specification?.projectName ||
                      "my-fullstack-project"
                    }
                    onBack={handleBackToGenerator}
                    onNewProject={handleNewProject}
                  />
                )}

                {!showGenerator && !showResults && (
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-400 inline-block">
                      Ready to Generate Your Project?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                      Start building your full-stack application with our
                      AI-powered generator. Select your frameworks, configure
                      Cloudflare integrations, and get production-ready code in
                      minutes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => {
                          const message = document.createElement("div");
                          message.className =
                            "fixed top-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded z-50";
                          message.innerHTML = "<p>Opening Generator Hub...</p>";
                          document.body.appendChild(message);
                          setTimeout(() => {
                            message.remove();
                            window.location.href = "/generator-hub";
                          }, 500);
                        }}
                        className="px-5 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium group relative overflow-hidden"
                      >
                        <span className="relative z-10">
                          Explore All Generators
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </button>
                      <button
                        onClick={handleShowDashboard}
                        className="px-5 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-medium border border-primary/20 hover:border-primary/40"
                      >
                        View Dashboard
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
