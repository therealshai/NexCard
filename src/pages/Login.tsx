
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      {/* Interactive Grid Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-6 flex flex-col md:flex-row items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left side with Logo and Text */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:pr-8">
            <div className="flex flex-col items-center md:items-start">
              <img 
                src="/public/lovable-uploads/0fac59bc-cc22-4e8d-aadb-89ee6dcf8c8a.png" 
                alt="NexCard Logo" 
                className="h-16 w-auto mb-6"
              />
              <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-primary">Welcome to NexCard</h1>
              <p className="text-muted-foreground mb-6">
                Create stunning digital business cards that make a lasting impression and enhance your professional network.
              </p>
              <p className="text-sm text-muted-foreground">
                Sign in to start creating your personalized digital business card.
              </p>
            </div>
          </div>
          
          {/* Right side with Sign In Component */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end border-t md:border-t-0 md:border-l border-border pt-8 md:pt-0 md:pl-8">
            <SignIn afterSignInUrl="/dashboard" />
          </div>
        </motion.div>
        
        <div className="text-center">
          <Link to="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
