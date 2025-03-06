import React from "react";

const NextjsTemplate = () => {
  return (
    <div className="font-mono text-sm overflow-auto max-h-[600px] bg-gray-900 text-gray-200 p-4 rounded-md">
      <div className="text-blue-400">// Next.js project structure</div>
      <div className="mt-2">
        <span className="text-yellow-400">project-root/</span>
        <div className="pl-4">
          <div>
            <span className="text-yellow-400">├── src/</span>
          </div>
          <div className="pl-4">
            <div>
              <span className="text-yellow-400">├── app/</span>
            </div>
            <div className="pl-8">
              <div>
                <span className="text-green-400">├── page.tsx</span>{" "}
                <span className="text-gray-500">// Home page</span>
              </div>
              <div>
                <span className="text-green-400">├── layout.tsx</span>{" "}
                <span className="text-gray-500">// Root layout</span>
              </div>
              <div>
                <span className="text-yellow-400">├── about/</span>
              </div>
              <div className="pl-4">
                <span className="text-green-400">└── page.tsx</span>
              </div>
              <div>
                <span className="text-yellow-400">├── dashboard/</span>
              </div>
              <div className="pl-4">
                <span className="text-green-400">└── page.tsx</span>
              </div>
              <div>
                <span className="text-yellow-400">└── api/</span>
              </div>
              <div className="pl-4">
                <span className="text-green-400">└── route.ts</span>
              </div>
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
              <span className="text-yellow-400">├── lib/</span>
            </div>
            <div className="pl-8">
              <div>
                <span className="text-green-400">└── utils.ts</span>
              </div>
            </div>
          </div>
          <div>
            <span className="text-yellow-400">├── public/</span>
          </div>
          <div className="pl-4">
            <div>
              <span className="text-green-400">└── images/</span>
            </div>
          </div>
          <div>
            <span className="text-green-400">├── package.json</span>
          </div>
          <div>
            <span className="text-green-400">├── next.config.js</span>
          </div>
          <div>
            <span className="text-green-400">├── tailwind.config.js</span>
          </div>
          <div>
            <span className="text-green-400">└── tsconfig.json</span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-blue-400">// Sample page.tsx</div>
      <pre className="mt-2 bg-gray-800 p-3 rounded">
        {`import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold">Welcome to My App</h1>
        <p className="mt-4 text-xl">A Next.js application generated with AI</p>
        <div className="mt-8">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Get Started
          </button>
        </div>
      </div>
    </main>
  )
}`}
      </pre>
    </div>
  );
};

export default NextjsTemplate;
