import React from "react";

const NodejsTemplate = () => {
  return (
    <div className="font-mono text-sm overflow-auto max-h-[600px] bg-gray-900 text-gray-200 p-4 rounded-md">
      <div className="text-blue-400">// Node.js project structure</div>
      <div className="mt-2">
        <span className="text-yellow-400">project-root/</span>
        <div className="pl-4">
          <div>
            <span className="text-yellow-400">├── src/</span>
          </div>
          <div className="pl-4">
            <div>
              <span className="text-green-400">├── index.ts</span>{" "}
              <span className="text-gray-500">// Entry point</span>
            </div>
            <div>
              <span className="text-yellow-400">├── controllers/</span>
            </div>
            <div className="pl-8">
              <div>
                <span className="text-green-400">├── userController.ts</span>
              </div>
              <div>
                <span className="text-green-400">└── productController.ts</span>
              </div>
            </div>
            <div>
              <span className="text-yellow-400">├── models/</span>
            </div>
            <div className="pl-8">
              <div>
                <span className="text-green-400">├── User.ts</span>
              </div>
              <div>
                <span className="text-green-400">└── Product.ts</span>
              </div>
            </div>
            <div>
              <span className="text-yellow-400">├── routes/</span>
            </div>
            <div className="pl-8">
              <div>
                <span className="text-green-400">├── userRoutes.ts</span>
              </div>
              <div>
                <span className="text-green-400">└── productRoutes.ts</span>
              </div>
            </div>
            <div>
              <span className="text-yellow-400">├── middleware/</span>
            </div>
            <div className="pl-8">
              <div>
                <span className="text-green-400">├── auth.ts</span>
              </div>
              <div>
                <span className="text-green-400">└── errorHandler.ts</span>
              </div>
            </div>
            <div>
              <span className="text-yellow-400">├── config/</span>
            </div>
            <div>
              <span className="text-yellow-400">└── utils/</span>
            </div>
          </div>
          <div>
            <span className="text-green-400">├── package.json</span>
          </div>
          <div>
            <span className="text-green-400">├── tsconfig.json</span>
          </div>
          <div>
            <span className="text-green-400">└── .env</span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-blue-400">// Sample index.ts</div>
      <pre className="mt-2 bg-gray-800 p-3 rounded">
        {`import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Error handler
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(\`Server running on port \${PORT}\`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });`}
      </pre>
    </div>
  );
};

export default NodejsTemplate;
