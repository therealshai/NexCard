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
import { useSearchParams } from "react-router-dom";
import { SocialCardData } from "@/types/social-card";

const defaultCardData: SocialCardData = {
  name: "",
  title: "",
  website: "",
  email: "",
  linkedin: "",
  about: "",
  interests: "",
  photoUrl: "",
};

const Create = () => {
  const { user } = useAuth();
  const [cardData, setCardData] = useState<SocialCardData>(defaultCardData);
  const [activeTab, setActiveTab] = useState("edit");
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get("template") || "classic";

  useEffect(() => {
    if (user?.email) {
      setCardData(prev => ({
        ...prev,
        email: user.email
      }));
    }
  }, [user]);

  const handleDataUpdate = (data: SocialCardData) => {
    setCardData(data);
  };

  const handleSaveCard = () => {
    toast({
      title: "Card saved!",
      description: "Your card has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">Create Your Social Card</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fill in your details to generate a professional social card that you can share online
            </p>
          </motion.div>
          
          <div className="md:hidden mb-8">
            <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="edit" className="mt-6">
                <SocialCardForm 
                  onUpdate={handleDataUpdate} 
                  initialData={cardData}
                  template={templateId}
                />
                <div className="mt-6 flex justify-center">
                  <Button onClick={handleSaveCard}>Save Card</Button>
                </div>
              </TabsContent>
              <TabsContent value="preview" className="mt-6">
                <SocialCardPreview data={cardData} template={templateId} />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="hidden md:grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            <div>
              <SocialCardForm 
                onUpdate={handleDataUpdate} 
                initialData={cardData}
                template={templateId}
              />
              <div className="mt-6">
                <Button onClick={handleSaveCard}>Save Card</Button>
              </div>
            </div>
            <div>
              <SocialCardPreview data={cardData} template={templateId} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Create;