
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { SocialCardData } from "@/types/social-card";
import { useNavigate } from "react-router-dom";

// Default empty card data
export const defaultCardData: SocialCardData = {
  name: "",
  title: "",
  phone: "",
  email: "",
  twitter: "",
  linkedin: "",
  github: "",
  portfolio: "",
  photoUrl: "",
  about: "",
  interests: "",
  gradient: "dark",
};

export const useCardData = (templateId: string) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [cardData, setCardData] = useState<SocialCardData>(defaultCardData);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingShareLink, setIsGeneratingShareLink] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);

  // Pre-fill with user email if available
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setCardData(prev => ({
        ...prev,
        email: user.primaryEmailAddress.emailAddress
      }));
    }
  }, [user]);

  const handleDataUpdate = (data: SocialCardData) => {
    setCardData(data);
  };

  const handleSaveCard = async () => {
    try {
      setIsSaving(true);
      
      if (!isAuthenticated || !user?.id) {
        toast({
          title: "Authentication required",
          description: "Please sign in to save your card",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      if (!cardData.name) {
        toast({
          title: "Name is required",
          description: "Please enter your name to save the card",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      // Insert into the cards table
      const { data, error } = await supabase
        .from('cards')
        .insert({
          user_id: user.id,
          name: cardData.name || "",
          title: cardData.title,
          email: cardData.email,
          phone: cardData.phone,
          github_url: cardData.github,
          twitter_url: cardData.twitter,
          linkedin_url: cardData.linkedin,
          website: cardData.portfolio,
          photo_url: cardData.photoUrl,
          about: cardData.about,
          interests: cardData.interests,
          gradient: cardData.gradient,
          template_id: templateId
        })
        .select();
      
      if (error) {
        console.error('Error saving card:', error);
        throw error;
      }
      
      toast({
        title: "Card saved!",
        description: "Your card has been saved successfully.",
        duration: 5000,
      });
      
      // Navigate to saved cards page after successful save
      navigate('/saved-cards');
    } catch (error) {
      console.error('Error saving card:', error);
      toast({
        title: "Error saving card",
        description: "There was a problem saving your card. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Generate a share link
  const handleGenerateShareLink = async () => {
    try {
      setIsGeneratingShareLink(true);
      
      if (!cardData.name) {
        toast({
          title: "Name is required",
          description: "Please enter your name to generate a share link",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }
      
      const cardId = uuidv4();
      
      // Get the deployment URL or fall back to localhost
      // This ensures the share link works on Vercel deployment
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? 'https://nex-card-steel.vercel.app'
        : window.location.origin;
        
      const shareableUrl = `${baseUrl}/share/${cardId}`;
      
      // First check if user is authenticated for saving purposes
      if (isAuthenticated && user?.id) {
        // Save the card to database with the generated ID
        const { error } = await supabase
          .from('cards')
          .insert({
            id: cardId,
            user_id: user.id,
            name: cardData.name || "",
            title: cardData.title,
            email: cardData.email,
            phone: cardData.phone,
            github_url: cardData.github,
            twitter_url: cardData.twitter,
            linkedin_url: cardData.linkedin,
            website: cardData.portfolio,
            photo_url: cardData.photoUrl,
            about: cardData.about,
            interests: cardData.interests,
            gradient: cardData.gradient,
            template_id: templateId
          });
          
        if (error) {
          console.error('Database error when saving card for share:', error);
          throw error;
        }
      } else {
        // If not authenticated, we'll just create a shareable link without saving
        toast({
          title: "Not logged in",
          description: "Your card will be available via this link but won't be saved to your account.",
          duration: 5000,
        });
      }
      
      // Set the share link state
      setShareLink(shareableUrl);
      
      try {
        // Copy to clipboard 
        await navigator.clipboard.writeText(shareableUrl);
        toast({
          title: "Share link generated!",
          description: "Link has been copied to clipboard.",
          duration: 5000,
        });
      } catch (clipboardError) {
        // Fallback if clipboard API fails
        console.error('Could not copy to clipboard:', clipboardError);
        toast({
          title: "Share link generated!",
          description: "Link is displayed below. Copy it manually to share.",
          duration: 5000,
        });
      }
      
    } catch (error) {
      console.error('Error generating share link:', error);
      toast({
        title: "Error generating link",
        description: "There was a problem creating your share link. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsGeneratingShareLink(false);
    }
  };

  return {
    cardData,
    isSaving,
    isGeneratingShareLink,
    shareLink,
    handleDataUpdate,
    handleSaveCard,
    handleGenerateShareLink
  };
};
