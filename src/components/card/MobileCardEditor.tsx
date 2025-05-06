
import { SocialCardData } from "@/types/social-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { SocialCardForm } from "@/components/SocialCardForm";
import { SocialCardPreview } from "@/components/SocialCardPreview";
import { Button } from "@/components/ui/button";
import { ShareLinkDisplay } from "./ShareLinkDisplay";

interface MobileCardEditorProps {
  cardData: SocialCardData;
  templateId: string;
  isSaving: boolean;
  isGeneratingShareLink: boolean;
  shareLink: string | null;
  onUpdate: (data: SocialCardData) => void;
  onSave: () => void;
  onGenerateShareLink: () => void;
}

export function MobileCardEditor({
  cardData,
  templateId,
  isSaving,
  isGeneratingShareLink,
  shareLink,
  onUpdate,
  onSave,
  onGenerateShareLink
}: MobileCardEditorProps) {
  const [activeTab, setActiveTab] = useState("edit");

  return (
    <div className="md:hidden mb-8">
      <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit" className="mt-6">
          <SocialCardForm onUpdate={onUpdate} initialData={cardData} />
          <div className="mt-6 flex flex-col gap-3">
            <Button onClick={onSave} disabled={isSaving} className="w-full">
              {isSaving ? "Saving..." : "Save Card"}
            </Button>
            <Button onClick={onGenerateShareLink} variant="outline" disabled={isGeneratingShareLink} className="w-full">
              {isGeneratingShareLink ? "Generating..." : "Generate Share Link"}
            </Button>
            {shareLink && <ShareLinkDisplay shareLink={shareLink} />}
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="mt-6">
          <SocialCardPreview data={cardData} template={templateId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
