import React from "react";

const ReactTemplate = () => {
  return (
    <div className="font-mono text-sm overflow-auto max-h-[600px] bg-gray-900 text-gray-200 p-4 rounded-md">
      <div className="text-blue-400">// React project structure</div>
      <div className="mt-2">
        <span className="text-yellow-400">project-root/</span>
        <div className="pl-4">
          <div>
            <span className="text-yellow-400">├── src/</span>
          </div>
          <div className="pl-4">
            <div>
              <span className="text-green-400">├── main.tsx</span>{" "}
              <span className="text-gray-500">// Entry point</span>
            </div>
            <div>
              <span className="text-green-400">├── App.tsx</span>{" "}
              <span className="text-gray-500">// Main app component</span>
            </div>
            <div>
              <span className="text-yellow-400">├── components/</span>
            </div>
            <div className="pl-8">
              <div>
                <span className="text-green-400">├── Header.tsx</span>
              </div>
              <div>
                <span className="text-green-400">├── Footer.tsx</span>
              </div>
              <div>
                <span className="text-green-400">└── ui/</span>
              </div>
            </div>
            <div>
              <span className="text-yellow-400">├── pages/</span>
            </div>
            <div className="pl-8">
              <div>
                <span className="text-green-400">├── Home.tsx</span>
              </div>
              <div>
                <span className="text-green-400">├── About.tsx</span>
              </div>
              <div>
                <span className="text-green-400">└── Dashboard.tsx</span>
              </div>
            </div>
            <div>
              <span className="text-yellow-400">├── hooks/</span>
            </div>
            <div>
              <span className="text-yellow-400">├── utils/</span>
            </div>
            <div>
              <span className="text-yellow-400">└── assets/</span>
            </div>
          </div>
          <div>
            <span className="text-yellow-400">├── public/</span>
          </div>
          <div>
            <span className="text-green-400">├── package.json</span>
          </div>
          <div>
            <span className="text-green-400">├── vite.config.ts</span>
          </div>
          <div>
            <span className="text-green-400">├── tailwind.config.js</span>
          </div>
          <div>
            <span className="text-green-400">└── tsconfig.json</span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-blue-400">// Sample App.tsx</div>
      <pre className="mt-2 bg-gray-800 p-3 rounded">
        {`import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App`}
      </pre>
    </div>
  );
};

export default ReactTemplate;
