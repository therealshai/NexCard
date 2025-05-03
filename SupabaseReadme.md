
# NexCard Supabase Implementation

This document tracks and explains all Supabase implementations for the NexCard application. It serves as a comprehensive guide for understanding the database structure, API functionality, and authentication mechanisms.

## Current Implementation Status

> Note: This document will be updated as Supabase features are integrated into the application.

Currently, the application is using Clerk for authentication, but plans to migrate or integrate with Supabase in the future.

## Database Structure

### Users Table
Schema for storing user information:
```sql
create table public.users (
  id uuid references auth.users not null primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Enable RLS
alter table public.users enable row level security;

-- Create policies
create policy "Users can view their own data" on users
  for select using (auth.uid() = id);

create policy "Users can update their own data" on users
  for update using (auth.uid() = id);
```

### Cards Table
Schema for storing digital business card data:
```sql
create table public.cards (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users not null,
  name text not null,
  title text,
  company text,
  email text,
  phone text,
  website text,
  bio text,
  linkedin_url text,
  twitter_url text,
  github_url text,
  photo_url text,
  template_id text not null,
  custom_fields jsonb default '{}' not null,
  view_count integer default 0,
  is_public boolean default true,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Enable RLS
alter table public.cards enable row level security;

-- Create policies
create policy "Cards are viewable by everyone when public" on cards
  for select using (is_public = true OR auth.uid() = user_id);

create policy "Users can insert their own cards" on cards
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own cards" on cards
  for update using (auth.uid() = user_id);

create policy "Users can delete their own cards" on cards
  for delete using (auth.uid() = user_id);
```

### Card_Views Table
Schema for tracking when cards are viewed:
```sql
create table public.card_views (
  id uuid default gen_random_uuid() primary key,
  card_id uuid references public.cards not null,
  viewer_ip text,
  viewer_user_id uuid references public.users,
  viewed_at timestamp with time zone default now() not null,
  referrer text
);

-- Enable RLS
alter table public.card_views enable row level security;

-- Create policies
create policy "Card owners can view all views of their cards" on card_views
  for select using (
    auth.uid() IN (
      SELECT user_id FROM public.cards WHERE id = card_id
    )
  );

create policy "Anyone can create card views" on card_views
  for insert with check (true);
```

## Adding Supabase to the Project

To integrate Supabase with this project, follow these steps:

1. Click on the green Supabase button in the Lovable interface
2. Connect your Supabase project or create a new one
3. The Lovable Supabase integration will be enabled

## Backend Logic for Card Creation

When a user creates a card, the following operations will occur:

1. First, check if the user exists in the 'users' table; if not, create them
2. Insert the card data into the 'cards' table with the user's ID
3. Generate a unique shareable link for the card
4. Return the card data and link to the user

Example code for card creation (in Supabase Edge Function):

```javascript
// Example edge function for creating a card
export async function createCard(req, res) {
  const { user, cardData } = req.body;
  
  if (!user || !user.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
  
  // Check if user exists, if not create them
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('id', user.id)
    .single();
    
  if (!userData && !userError) {
    // Create user
    await supabase.from('users').insert([{
      id: user.id,
      email: user.email,
      full_name: user.name,
      avatar_url: user.avatar_url
    }]);
  }
  
  // Insert card
  const { data, error } = await supabase
    .from('cards')
    .insert([{
      user_id: user.id,
      name: cardData.name,
      email: cardData.email,
      phone: cardData.phone,
      github_url: cardData.github,
      linkedin_url: cardData.linkedin,
      website: cardData.portfolio,
      photo_url: cardData.photoUrl,
      template_id: cardData.templateId || 'default'
    }])
    .select()
    .single();
  
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  
  return res.status(200).json({ 
    card: data,
    shareableLink: `${process.env.SITE_URL}/card/${data.id}`
  });
}
```

## Using the Database in the Frontend

After Supabase integration, you can update the card creation code in `Create.tsx` to:

```javascript
const handleSaveCard = async () => {
  try {
    const { data, error } = await supabase
      .from('cards')
      .insert([
        {
          user_id: user.id,
          name: cardData.name,
          email: cardData.email,
          phone: cardData.phone,
          github_url: cardData.github,
          linkedin_url: cardData.linkedin,
          website: cardData.portfolio,
          photo_url: cardData.photoUrl,
          template_id: 'default'
        }
      ])
      .select();
      
    if (error) throw error;
    
    toast({
      title: "Card saved!",
      description: "Your card has been saved successfully.",
    });
  } catch (error) {
    console.error('Error saving card:', error);
    toast({
      title: "Error saving card",
      description: "There was a problem saving your card. Please try again.",
      variant: "destructive",
    });
  }
};
```

## Additional Features

1. **Analytics Dashboard**: Display view counts and engagement metrics for each card
2. **QR Code Generation**: Create QR codes that link directly to digital cards
3. **Card Templates**: Allow users to select from multiple design templates
4. **Card Sharing**: Enable one-click sharing to social networks and email

## Notes on Supabase Integration

When fully integrated, the application will:
1. Use Supabase Auth for authentication (replacing or supplementing Clerk)
2. Store all user and card data in Supabase tables
3. Leverage Row Level Security (RLS) policies to ensure data security
4. Use storage buckets for user-uploaded images and assets
5. Implement edge functions for specialized processing
