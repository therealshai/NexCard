
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, LogIn, User, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { UserButton } from "@clerk/clerk-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { isAuthenticated } = useAuth();
  
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const handleMouseEnter = (name: string) => {
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand Name instead of Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold"><span className="text-green-500">Nex</span>Card</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Product Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => handleMouseEnter("product")}
            onMouseLeave={handleMouseLeave}
            ref={(el) => (dropdownRefs.current["product"] = el)}
          >
            <button 
              className={cn(
                "nav-link flex items-center gap-1",
                (isActive("/product") || isActive("/features")) && "active"
              )}
            >
              Product
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {activeDropdown === "product" && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 z-50">
                <Link 
                  to="/product" 
                  className="block px-4 py-2 rounded hover:bg-green/10"
                >
                  Overview
                </Link>
                <Link 
                  to="/features" 
                  className="block px-4 py-2 rounded hover:bg-green/10"
                >
                  Features
                </Link>
              </div>
            )}
          </div>
          
          <Link to="/templates" className={cn("nav-link", isActive("/templates") && "active")}>
            Templates
          </Link>
          
          {isAuthenticated && (
            <>
              <Link to="/saved-cards" className={cn("nav-link flex items-center gap-1", isActive("/saved-cards") && "active")}>
                <CreditCard className="w-4 h-4" /> My Cards
              </Link>
            </>
          )}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Button asChild variant="destructive">
              <Link to="/login">
                <LogIn className="w-4 h-4 mr-2" /> Sign In
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          {isAuthenticated && <UserButton afterSignOutUrl="/" />}
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[500px] py-4 border-t border-border" : "max-h-0"
        )}
      >
        <nav className="flex flex-col space-y-4 px-4">
          {/* Product Section */}
          <div>
            <button 
              className="flex items-center justify-between w-full py-2"
              onClick={() => setActiveDropdown(activeDropdown === "mobileProduct" ? null : "mobileProduct")}
            >
              <span className={cn(
                (isActive("/product") || isActive("/features")) && "text-primary font-medium"
              )}>
                Product
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {activeDropdown === "mobileProduct" && (
              <div className="pl-4 mt-2 space-y-2">
                <Link 
                  to="/product" 
                  className="block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Overview
                </Link>
                <Link 
                  to="/features" 
                  className="block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </Link>
              </div>
            )}
          </div>
          
          <Link 
            to="/templates" 
            className={cn("py-2", isActive("/templates") && "text-primary font-medium")}
            onClick={() => setIsOpen(false)}
          >
            Templates
          </Link>
          
          {isAuthenticated && (
            <Link 
              to="/saved-cards" 
              className={cn("py-2 flex items-center gap-2", isActive("/saved-cards") && "text-primary font-medium")}
              onClick={() => setIsOpen(false)}
            >
              <CreditCard className="w-4 h-4" /> My Cards
            </Link>
          )}
          
          {!isAuthenticated && (
            <Button asChild variant="destructive" className="w-full mt-2">
              <Link to="/login">
                <LogIn className="w-4 h-4 mr-2" /> Sign In
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
