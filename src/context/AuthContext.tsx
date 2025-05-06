
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth as useClerkAuth, useUser, useClerk } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: string | null;
  user: any; // Using any for simplicity, but you could define a proper User type
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  userId: null,
  user: null,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { userId, isSignedIn, isLoaded } = useClerkAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!isSignedIn);
  }, [isSignedIn]);

  // Sync user data from Clerk to Supabase when the user signs in
  useEffect(() => {
    const syncUserToSupabase = async () => {
      if (isSignedIn && user) {
        try {
          const { data, error } = await supabase
            .from('users')
            .upsert({
              id: userId,
              email: user.primaryEmailAddress?.emailAddress || '',
              first_name: user.firstName || '',
              last_name: user.lastName || '',
              image_url: user.imageUrl || '',
              last_sign_in: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }, {
              onConflict: 'id'
            });
            
          if (error) {
            console.error('Error syncing user data with Supabase:', error);
          } else {
            console.log('User data synced with Supabase');
          }
        } catch (error) {
          console.error('Error syncing user data with Supabase:', error);
        }
      }
    };

    syncUserToSupabase();
  }, [isSignedIn, user, userId]);

  const logout = async () => {
    await signOut();
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isLoading: !isLoaded, 
      userId: userId || null, 
      user,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
