
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LogIn, Mail, Lock } from "lucide-react";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/90 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Content */}
      <div className="container max-w-6xl px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          {/* Left Side - App Info */}
          <div className="text-center md:text-left space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Welcome to NexCard</h1>
              <p className="text-xl text-primary font-medium">Your Digital Business Identity</p>
            </div>
            
            <p className="text-muted-foreground text-lg">
              Create stunning digital business cards that make a lasting impression and enhance your professional network.
            </p>
            
            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <LogIn className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-foreground">Simple Sign-In</h3>
                  <p className="text-sm text-muted-foreground">Quick and secure access to your account</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-foreground">Email Verification</h3>
                  <p className="text-sm text-muted-foreground">Ensuring your account remains protected</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-foreground">Secure Access</h3>
                  <p className="text-sm text-muted-foreground">Industry-standard encryption for your data</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Sign In Component */}
          <Card className="shadow-xl border-border/50">
            <CardContent className="pt-6">
              <SignIn afterSignInUrl="/" />
            </CardContent>
          </Card>
        </motion.div>
        
        <div className="text-center mt-8">
          <Link to="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
