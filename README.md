# AI Full-Stack Generator

A powerful SaaS application that generates production-ready full-stack code based on user specifications, supporting multiple frameworks and Cloudflare-compatible infrastructure.

## Features

- **AI-Powered Code Generation**: Generate complete full-stack applications using various AI models
- **Multiple Framework Support**: Next.js, Vue, React, Node.js, and Hono.js
- **Cloudflare Integration**: Pages, D1, KV, R2, and Durable Objects
- **User Authentication**: Complete login/register system with secure password handling
- **Subscription Plans**: Free, Pro, and Enterprise tiers with different feature sets
- **Responsive Design**: Works on all devices with a beautiful UI
- **Dark/Light Mode**: Full theme support with consistent styling

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router
- **Form Handling**: React Hook Form with Zod validation
- **Authentication**: JWT-based auth (can be connected to Auth0, Supabase, etc.)

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-fullstack-generator.git
cd ai-fullstack-generator

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Production Setup

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# API Keys for AI Models
VITE_OPENAI_API_KEY=your_openai_key
VITE_DEEPSEEK_API_KEY=your_deepseek_key
VITE_GEMINI_API_KEY=your_gemini_key

# Cloudflare Integration
VITE_CLOUDFLARE_API_TOKEN=your_cloudflare_token

# Authentication (if using a service like Supabase)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe for payments (optional)
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Database Setup

This application can work with various database options:

1. **Cloudflare D1**: For edge-based SQL database
   - Create a D1 database in your Cloudflare dashboard
   - Update the wrangler.toml file with your database binding

2. **Supabase**: For PostgreSQL database with auth
   - Create a Supabase project
   - Set up the auth tables and RLS policies
   - Configure the environment variables

### Authentication Implementation

The current implementation uses a mock authentication system. To implement real authentication:

1. **With Supabase**:
   ```typescript
   // In src/lib/auth.ts
   import { supabase } from './supabase';
   
   export const loginUser = async (email: string, password: string) => {
     const { data, error } = await supabase.auth.signInWithPassword({
       email,
       password,
     });
     
     if (error) throw error;
     return data;
   };
   
   export const registerUser = async (email: string, password: string, name: string) => {
     const { data, error } = await supabase.auth.signUp({
       email,
       password,
       options: {
         data: {
           full_name: name,
         },
       },
     });
     
     if (error) throw error;
     return data;
   };
   ```

2. **With Auth0**:
   - Install the Auth0 React SDK
   - Configure the Auth0Provider in your main.tsx
   - Use the useAuth0 hook for login/logout functionality

### Payment Processing

To implement payment processing for the subscription plans:

1. **With Stripe**:
   - Install the Stripe.js library
   - Create products and prices in the Stripe dashboard
   - Implement the checkout flow using Stripe Checkout or Elements

### Deployment

#### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Configure the build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
3. Add your environment variables in the Cloudflare dashboard

#### Vercel

1. Connect your GitHub repository to Vercel
2. The platform will automatically detect the Vite configuration
3. Add your environment variables in the Vercel dashboard

## Customization

### Adding New AI Models

To add a new AI model:

1. Update the `AIModelSelector.tsx` component to include the new model
2. Add the API key handling in the settings
3. Implement the code generation logic for the new model

### Adding New Frameworks

To add a new framework:

1. Update the `FrameworkSelector.tsx` component
2. Create templates for the new framework in the code generation service
3. Update the project structure visualization

## License

MIT

## Contact

For support or inquiries, please contact support@aifullstackgenerator.com
