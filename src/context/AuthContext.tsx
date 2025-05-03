
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth as useClerkAuth, useUser, useClerk } from "@clerk/clerk-react";

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
