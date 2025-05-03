
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export function HeroSection() {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="relative pt-32 pb-20 overflow-hidden animated-bg">
      <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-background/5 to-background/5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Elevate Your Network Presence with <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">NexCard</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Create stunning digital business cards that make a lasting impression. Share your professional identity seamlessly across platforms and stand out in your industry.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-start gap-4 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button asChild variant="destructive" size="lg" className="min-w-[160px]">
              <Link to={isAuthenticated ? "/create" : "/login"}>Create Your Card</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[160px]">
              <Link to="/templates">Explore Templates</Link>
            </Button>
          </motion.div>
          
          <motion.p
            className="text-sm text-muted-foreground pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Join thousands of professionals enhancing their digital presence
          </motion.p>
        </motion.div>

        <div className="h-80 w-full mt-12 flex items-center justify-center">
          <div className="max-w-md w-full bg-card p-6 rounded-lg shadow-lg border border-border">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/public/lovable-uploads/0fac59bc-cc22-4e8d-aadb-89ee6dcf8c8a.png" 
                alt="NexCard Logo" 
                className="h-10 w-auto mr-2"
              />
              <h3 className="text-xl font-bold">Digital Card Preview</h3>
            </div>
            <div className="aspect-[2/3] bg-muted/20 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground text-center px-4">
                Design your own professional digital business card
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
