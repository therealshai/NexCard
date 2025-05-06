
import { SocialCardData } from "@/types/social-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SocialCardForm } from "@/components/SocialCardForm";
import { SocialCardPreview } from "@/components/SocialCardPreview";
import { Button } from "@/components/ui/button";
import { ShareLinkDisplay } from "./ShareLinkDisplay";

interface DesktopCardEditorProps {
  cardData: SocialCardData;
  templateId: string;
  isSaving: boolean;
  isGeneratingShareLink: boolean;
  shareLink: string | null;
  onUpdate: (data: SocialCardData) => void;
  onSave: () => void;
  onGenerateShareLink: () => void;
}

export function DesktopCardEditor({
  cardData,
  templateId,
  isSaving,
  isGeneratingShareLink,
  shareLink,
  onUpdate,
  onSave,
  onGenerateShareLink
}: DesktopCardEditorProps) {
  return (
    <div className="hidden md:grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
      {/* Edit Section */}
      <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Edit Details</h2>
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
      </div>
      
      {/* Preview Section */}
      <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Preview</h2>
        <Tabs defaultValue={templateId}>
          <TabsList className="w-full mb-6">
            <TabsTrigger value="classic">Classic</TabsTrigger>
            <TabsTrigger value="modern">Modern</TabsTrigger>
          </TabsList>
          <TabsContent value="classic">
            <SocialCardPreview data={cardData} template="classic" />
          </TabsContent>
          <TabsContent value="modern">
            <SocialCardPreview data={cardData} template="modern" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
