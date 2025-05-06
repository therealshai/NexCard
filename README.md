# NexCard - Your Digital Business Identity Platform

![Social-Card](https://github.com/user-attachments/assets/ff2cc570-96d2-49b6-8c0c-bec2efc5bd19)


## 🌟 Overview

NexCard is a modern digital business card platform that allows professionals to create, customize, and share their digital identity in seconds. In today's increasingly digital world, NexCard transforms how professionals network by replacing traditional paper business cards with interactive, feature-rich digital cards that can be easily shared via links or QR codes.

## 🚀 Why NexCard is a Game Changer for Networking Professionals

- **Instant Sharing**: Generate shareable links in seconds that work across any device
- **Multiple Templates**: Choose from various professional templates to match your personal brand
- **Customizable Design**: Select color schemes, add profile photos, and personalize your card
- **Analytics**: Track how many people view your card (coming soon)
- **Eco-Friendly**: Reduce paper waste while making a stronger digital impression
- **Always Up-to-Date**: Update your information once, and it reflects everywhere instantly

## 💻 Tech Stack

NexCard is built with a modern, scalable tech stack:

### Frontend

- **React 18** with **TypeScript** - For a type-safe, component-based UI
- **Vite** - For lightning-fast builds and development experience
- **Tailwind CSS** - For utility-first styling and responsive design
- **shadcn/ui** - For beautiful, accessible UI components
- **Framer Motion** - For smooth animations and transitions

### Authentication

- **Clerk** - For secure, feature-rich authentication and user management
- **Supabase Auth** - For database session management and RLS policies

### Backend

- **Supabase** - For database, storage, and serverless functions
- **PostgreSQL** - For reliable, relational data storage
- **Row Level Security (RLS)** - For secure, user-specific data access

## 📊 Database Schema

The application uses the following main database tables:

### Users Table

```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  image_url TEXT,
  last_sign_in TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);
```

### Cards Table

```sql
CREATE TABLE public.cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  title TEXT,
  email TEXT,
  phone TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  website TEXT,
  photo_url TEXT,
  about TEXT,
  interests TEXT,
  gradient TEXT,
  template_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);
```

## 🔒 Row Level Security

We implement Row Level Security (RLS) policies in Supabase to ensure users can only access their own data:

```sql
-- Users can only view their own cards
CREATE POLICY "Users can view their own cards"
  ON public.cards
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only update their own cards
CREATE POLICY "Users can update their own cards"
  ON public.cards
  FOR UPDATE
  USING (auth.uid() = user_id);
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm) to manage Node versions)
- pnpm or bun package manager

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/nexcard.git
cd nexcard
```

2. **Install dependencies**

```bash
# Using pnpm
pnpm install

# Using bun
bun install
```

3. **Set up Supabase**

   - Create a Supabase account at [supabase.com](https://supabase.com)
   - Create a new project and note your project URL and anon key
   - Run the SQL scripts found in `SupabaseReadme.md` to set up your database schema

4. **Set up Clerk**

   - Create a Clerk account at [clerk.dev](https://clerk.dev)
   - Create a new application and configure your authentication methods
   - Get your publishable key

5. **Configure environment variables**

   - Create a `.env` file in the root directory:

   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

6. **Run the development server**

```bash
# Using pnpm
pnpm dev

# Using bun
bun dev
```

7. **Build for production**

```bash
# Using pnpm
pnpm build

# Using bun
bun run build
```

## 📦 Dependencies

| Package               | Version  | Purpose                                  |
| --------------------- | -------- | ---------------------------------------- |
| @clerk/clerk-react    | ^5.30.2  | User authentication and management       |
| @supabase/supabase-js | ^2.49.4  | Database client for Supabase             |
| @tanstack/react-query | ^5.56.2  | Data fetching and state management       |
| framer-motion         | ^12.4.7  | Animations and transitions               |
| lucide-react          | ^0.462.0 | Icon library                             |
| react                 | ^18.3.1  | UI library                               |
| react-router-dom      | ^6.26.2  | Routing and navigation                   |
| recharts              | ^2.12.7  | Data visualization (charts)              |
| tailwind-merge        | ^2.5.2   | Utility for merging Tailwind CSS classes |
| uuid                  | ^9.0.1   | Generating unique identifiers            |
| zod                   | ^3.23.8  | TypeScript-first schema validation       |

### UI Component Libraries

| Package                  | Purpose                                                    |
| ------------------------ | ---------------------------------------------------------- |
| shadcn/ui components     | Accessible, customizable UI components based on Radix UI   |
| @radix-ui/\* packages    | Low-level UI primitives for building accessible components |
| class-variance-authority | Creating variant-based components                          |
| tailwindcss-animate      | Animation utilities for Tailwind CSS                       |

## 📱 Features

- User authentication (sign up, login)
- Customizable digital business card creation
- Multiple template options
- Shareable links generation
- Profile management
- Mobile responsive design

## 🚧 Roadmap

- QR code generation for cards
- Analytics dashboard
- Additional card templates
- Integrations with social media platforms
- Mobile app development

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
