
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Array of inspirational messages
const inspirationalMessages = [
  {
    title: "Transform Your Professional Identity",
    description: "Create a stunning digital card that makes you stand out from the crowd!"
  },
  {
    title: "Networking Made Simple",
    description: "Share your professional details in seconds with our easy-to-use digital cards."
  },
  {
    title: "Go Paperless, Go Professional",
    description: "Ditch traditional business cards and embrace the future of networking."
  },
  {
    title: "Make an Impression That Lasts",
    description: "Your digital card is more than contact info—it's your professional statement."
  },
  {
    title: "Connect With Confidence",
    description: "Our digital cards help you make meaningful professional connections."
  },
  {
    title: "Your Digital Presence Matters",
    description: "Make sure your first impression is as professional as you are."
  },
  {
    title: "Stand Out From The Crowd",
    description: "In a sea of paper cards, be the one they remember with a digital card."
  }
];

type PopupContextType = {
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
  navigateToCreate: () => void;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState(inspirationalMessages[0]);
  
  // Function to show a random message
  const showRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * inspirationalMessages.length);
    setMessage(inspirationalMessages[randomIndex]);
    setShowPopup(true);
  };
  
  // Function to handle navigation - to be used instead of direct useNavigate
  const navigateToCreate = () => {
    // Instead of directly navigating, we'll use window.location
    window.location.href = '/create';
  };
  
  useEffect(() => {
    // Show first popup after a delay of 5-8 minutes
    const initialDelay = Math.floor(Math.random() * (8 - 5 + 1) + 5) * 60 * 1000;
    
    const initialTimer = setTimeout(() => {
      showRandomMessage();
      
      // Then set up recurring popups every 5-8 minutes
      const setupRecurringPopups = () => {
        const delay = Math.floor(Math.random() * (8 - 5 + 1) + 5) * 60 * 1000;
        return setTimeout(() => {
          showRandomMessage();
          const nextTimer = setupRecurringPopups();
          return () => clearTimeout(nextTimer);
        }, delay);
      };
      
      const recurringTimer = setupRecurringPopups();
      return () => clearTimeout(recurringTimer);
    }, initialDelay);
    
    return () => clearTimeout(initialTimer);
  }, []);
  
  return (
    <PopupContext.Provider value={{ showPopup, setShowPopup, navigateToCreate }}>
      {children}
      <InspirationPopup message={message} />
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};

type InspirationPopupProps = {
  message: {
    title: string;
    description: string;
  };
};

const InspirationPopup = ({ message }: InspirationPopupProps) => {
  const { showPopup, setShowPopup, navigateToCreate } = usePopup();
  
  const handleDismiss = () => {
    setShowPopup(false);
  };
  
  const handleLetGo = () => {
    setShowPopup(false);
    navigateToCreate();
  };
  
  return (
    <Dialog open={showPopup} onOpenChange={setShowPopup}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">{message.title}</DialogTitle>
          <Button 
            className="absolute top-2 right-2 h-8 w-8 p-0" 
            variant="ghost" 
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <DialogDescription className="text-center py-4">
          {message.description}
        </DialogDescription>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
          <Button variant="outline" onClick={handleDismiss}>
            Dismiss
          </Button>
          <Button className="gap-2" onClick={handleLetGo}>
            Create Now <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
