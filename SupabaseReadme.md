
# Supabase Integration Documentation

This file documents all Supabase configurations and integrations used in the project.

## Database Tables

### Users Table

This table stores user information synced from Clerk authentication:

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

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create a secure policy that allows users to view their own data
CREATE POLICY "Users can view their own data" 
  ON public.users 
  FOR SELECT 
  USING (auth.uid() = id);
  
-- Create a secure policy that allows users to update their own data
CREATE POLICY "Users can update their own data" 
  ON public.users 
  FOR UPDATE 
  USING (auth.uid() = id);
```

### Clerk to Supabase Sync Function

To automatically sync user data from Clerk to our Supabase database:

```sql
-- Create a function to handle user information sync from Clerk to Supabase
CREATE OR REPLACE FUNCTION public.sync_user_from_clerk()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, first_name, last_name, image_url, last_sign_in, created_at)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'image_url',
    NEW.last_sign_in_at,
    NEW.created_at
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    image_url = EXCLUDED.image_url,
    last_sign_in = EXCLUDED.last_sign_in,
    updated_at = now();
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to sync user data on insert or update
CREATE TRIGGER trigger_sync_user_from_clerk
AFTER INSERT OR UPDATE ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.sync_user_from_clerk();
```

## Cards Table (SQL to create this table)

This is the SQL to create a table that will store user-generated social cards:

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

-- Enable Row Level Security
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;

-- Create a secure policy that allows users to view their own cards
CREATE POLICY "Users can view their own cards" 
  ON public.cards 
  FOR SELECT 
  USING (auth.uid() = user_id);
  
-- Create a secure policy that allows users to insert their own cards
CREATE POLICY "Users can insert their own cards" 
  ON public.cards 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
  
-- Create a secure policy that allows users to update their own cards
CREATE POLICY "Users can update their own cards" 
  ON public.cards 
  FOR UPDATE 
  USING (auth.uid() = user_id);
  
-- Create a secure policy that allows users to delete their own cards
CREATE POLICY "Users can delete their own cards" 
  ON public.cards 
  FOR DELETE 
  USING (auth.uid() = user_id);
```

## API Keys

- **Clerk API Key**: `VITE_CLERK_PUBLISHABLE_KEY=pk_test_cHJlbWl1bS1hbW9lYmEtMTMuY2xlcmsuYWNjb3VudHMuZGV2JA`

## Authentication Flow

1. User authenticates using Clerk
2. User data is automatically synced to Supabase via the trigger function
3. The app can access user data from both Clerk (for auth UI) and Supabase (for database operations)
