
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";
import { useCardData } from "@/hooks/useCardData";
import { CreatePageHeader } from "@/components/card/CreatePageHeader";
import { MobileCardEditor } from "@/components/card/MobileCardEditor";
import { DesktopCardEditor } from "@/components/card/DesktopCardEditor";

const Create = () => {
  const { isLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template') || 'classic';
  
  const {
    cardData,
    isSaving,
    isGeneratingShareLink,
    shareLink,
    handleDataUpdate,
    handleSaveCard,
    handleGenerateShareLink
  } = useCardData(templateId);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-background/90">
        <Header />
        <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-20 flex items-center justify-center">
          <Spinner />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-background/90">
      <Header />
      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <CreatePageHeader />
          
          {/* Mobile Tabs (only show on small screens) */}
          <MobileCardEditor 
            cardData={cardData}
            templateId={templateId}
            isSaving={isSaving}
            isGeneratingShareLink={isGeneratingShareLink}
            shareLink={shareLink}
            onUpdate={handleDataUpdate}
            onSave={handleSaveCard}
            onGenerateShareLink={handleGenerateShareLink}
          />
          
          {/* Desktop view (side by side) */}
          <DesktopCardEditor 
            cardData={cardData}
            templateId={templateId}
            isSaving={isSaving}
            isGeneratingShareLink={isGeneratingShareLink}
            shareLink={shareLink}
            onUpdate={handleDataUpdate}
            onSave={handleSaveCard}
            onGenerateShareLink={handleGenerateShareLink}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Create;
