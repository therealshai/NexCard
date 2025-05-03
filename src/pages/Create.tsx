
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SocialCardForm } from "@/components/SocialCardForm";
import { SocialCardPreview } from "@/components/SocialCardPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

// Default empty card data
const defaultCardData = {
  name: "",
  phone: "",
  email: "",
  linkedin: "",
  github: "",
  portfolio: "",
  photoUrl: "",
};

const Create = () => {
  const { user } = useAuth();
  const [cardData, setCardData] = useState(defaultCardData);
  const [activeTab, setActiveTab] = useState("edit");
  
  // Pre-fill with user email if available
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setCardData(prev => ({
        ...prev,
        email: user.primaryEmailAddress.emailAddress
      }));
    }
  }, [user]);

  const handleDataUpdate = (data: typeof cardData) => {
    setCardData(data);
  };

  const handleSaveCard = async () => {
    try {
      // In a real app with Supabase integration, this would save to the database
      // The code below is a placeholder until Supabase is connected
      
      /* 
      // Example Supabase code (will work after integration)
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
        ]);
      
      if (error) throw error;
      */
      
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-background/90">
      <Header />
      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">Create Your Social Card</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fill in your details to generate a professional social card that you can share online
            </p>
          </motion.div>
          
          {/* Mobile Tabs (only show on small screens) */}
          <div className="md:hidden mb-8">
            <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="edit" className="mt-6">
                <SocialCardForm onUpdate={handleDataUpdate} />
                <div className="mt-6 flex justify-center">
                  <Button onClick={handleSaveCard}>Save Card</Button>
                </div>
              </TabsContent>
              <TabsContent value="preview" className="mt-6">
                <SocialCardPreview data={cardData} />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Desktop view (side by side) */}
          <div className="hidden md:grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Edit Details</h2>
              <SocialCardForm onUpdate={handleDataUpdate} />
              <div className="mt-6">
                <Button onClick={handleSaveCard}>Save Card</Button>
              </div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Preview</h2>
              <SocialCardPreview data={cardData} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Create;
