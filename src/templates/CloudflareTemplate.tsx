import React from "react";

const CloudflareTemplate = () => {
  return (
    <div className="font-mono text-sm overflow-auto max-h-[600px] bg-gray-900 text-gray-200 p-4 rounded-md">
      <div className="text-blue-400">
        // Cloudflare Workers project structure
      </div>
      <div className="mt-2">
        <span className="text-yellow-400">project-root/</span>
        <div className="pl-4">
          <div>
            <span className="text-yellow-400">├── src/</span>
          </div>
          <div className="pl-4">
            <div>
              <span className="text-green-400">├── index.ts</span>{" "}
              <span className="text-gray-500">// Worker entry point</span>
            </div>
            <div>
              <span className="text-yellow-400">├── handlers/</span>
            </div>
            <div className="pl-8">
              <div>
                <span className="text-green-400">├── user.ts</span>
              </div>
              <div>
                <span className="text-green-400">└── product.ts</span>
              </div>
            </div>
            <div>
              <span className="text-yellow-400">├── models/</span>
            </div>
            <div>
              <span className="text-yellow-400">├── middleware/</span>
            </div>
            <div>
              <span className="text-yellow-400">└── utils/</span>
            </div>
          </div>
          <div>
            <span className="text-green-400">├── wrangler.toml</span>{" "}
            <span className="text-gray-500">// Cloudflare config</span>
          </div>
          <div>
            <span className="text-green-400">├── package.json</span>
          </div>
          <div>
            <span className="text-green-400">└── tsconfig.json</span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-blue-400">// Sample index.ts with Hono</div>
      <pre className="mt-2 bg-gray-800 p-3 rounded">
        {`import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { userHandler } from './handlers/user';
import { productHandler } from './handlers/product';

type Bindings = {
  DB: D1Database;
  KV: KVNamespace;
  R2: R2Bucket;
}

const app = new Hono<{ Bindings: Bindings }>();

// Middleware
app.use('*', cors());

// Routes
app.route('/api/users', userHandler);
app.route('/api/products', productHandler);

// Root route
app.get('/', (c) => {
  return c.json({ message: 'Welcome to the API' });
});

export default app;`}
      </pre>

      <div className="mt-6 text-blue-400">// Sample wrangler.toml</div>
      <pre className="mt-2 bg-gray-800 p-3 rounded">
        {`name = "my-cloudflare-app"
main = "src/index.ts"
compatibility_date = "2023-01-01"

# D1 Database
[[d1_databases]]
Binding = "DB"
database_name = "my-database"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

# KV Namespace
[[kv_namespaces]]
Binding = "KV"
id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# R2 Bucket
[[r2_buckets]]
Binding = "R2"
bucket_name = "my-bucket"`}
      </pre>
    </div>
  );
};

export default CloudflareTemplate;
