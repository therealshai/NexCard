
import { Github, Linkedin, Globe, Phone, Mail, Download, Link2, Twitter, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import { useRef, useState } from "react";
import { SocialCardData } from "@/types/social-card";

type SocialCardPreviewProps = {
  data: SocialCardData;
  template?: string;
};

export function SocialCardPreview({ data, template = 'classic' }: SocialCardPreviewProps) {
  const { toast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);
  const [selectedGradient, setSelectedGradient] = useState<string>(data.gradient || 'dark');

  const gradients = {
    dark: 'bg-gradient-to-b from-gray-900 to-gray-800 text-white',
    light: 'bg-gradient-to-b from-gray-100 to-white text-gray-800',
    blue: 'bg-gradient-to-b from-blue-500 to-blue-700 text-white',
    purple: 'bg-gradient-to-b from-purple-500 to-purple-700 text-white',
    teal: 'bg-gradient-to-b from-teal-500 to-teal-700 text-white',
    orange: 'bg-gradient-to-b from-orange-400 to-orange-600 text-white',
    green: 'bg-gradient-to-b from-green-500 to-green-700 text-white',
  };

  const generateLink = () => {
    const mockLink = `https://socialcard.app/s/${Math.random().toString(36).substring(2, 10)}`;
    
    navigator.clipboard.writeText(mockLink);
    toast({
      title: "Link copied to clipboard",
      description: "Share this link with others to show your social card",
    });
  };

  const downloadCard = async (format: 'png' | 'jpg') => {
    if (!cardRef.current) return;
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
      });
      
      const imageType = format === 'png' ? 'image/png' : 'image/jpeg';
      const imageUrl = canvas.toDataURL(imageType);
      
      const link = document.createElement('a');
      link.download = `social-card.${format}`;
      link.href = imageUrl;
      link.click();
      
      toast({
        title: "Download started",
        description: `Your social card is being downloaded as ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error generating your social card",
        variant: "destructive",
      });
    }
  };

  const renderClassicTemplate = () => (
    <div className={`w-full max-w-md overflow-hidden rounded-lg shadow-xl ${gradients[selectedGradient as keyof typeof gradients]}`}>
      {/* Profile photo */}
      {data.photoUrl && (
        <div className="w-full aspect-square overflow-hidden">
          <img 
            src={data.photoUrl} 
            alt={data.name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-1 text-center">{data.name || "Your Name"}</h1>
        <p className="text-xl mb-3 text-center text-orange-400">{data.title || "Professional Title"}</p>
        
        {data.website && <p className="text-sm opacity-80 mb-5 text-center">{data.website}</p>}
        
        <div className="flex justify-center space-x-4 my-5">
          {data.email && (
            <a href={`mailto:${data.email}`} className="inline-block px-6 py-2 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition font-medium flex items-center">
              <Mail className="w-5 h-5 mr-2" /> Email
            </a>
          )}
          {data.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium flex items-center">
              <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
            </a>
          )}
        </div>
        
        <hr className="my-6 opacity-20" />
        
        {data.about && (
          <div className="mb-5">
            <h3 className="text-xl font-semibold mb-2">About</h3>
            <p className="opacity-90">{data.about}</p>
          </div>
        )}
        
        {data.interests && (
          <div className="mb-5">
            <h3 className="text-xl font-semibold mb-2">Interests</h3>
            <p className="opacity-90">{data.interests}</p>
          </div>
        )}
        
        <div className="flex justify-center space-x-4 mt-8">
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition">
            <Instagram className="w-5 h-5" />
          </a>
          {data.github && (
            <a href={data.github} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition">
              <Github className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );

  const renderModernTemplate = () => (
    <div className={`w-full max-w-md rounded-lg shadow-xl overflow-hidden`}>
      {/* Top section with photo */}
      {data.photoUrl && (
        <div className="w-full aspect-square overflow-hidden">
          <img 
            src={data.photoUrl} 
            alt={data.name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Info section */}
      <div className={`p-6 ${selectedGradient === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
        <h1 className="text-3xl font-bold mb-1 text-center">{data.name || "Your Name"}</h1>
        <p className={`text-xl mb-3 text-center ${selectedGradient === 'dark' ? 'text-orange-400' : 'text-orange-500'}`}>
          {data.title || "Professional Title"}
        </p>
        
        {data.website && <p className="text-sm opacity-80 mb-5 text-center">{data.website}</p>}
        
        <div className="flex justify-center space-x-4 my-5">
          {data.email && (
            <a href={`mailto:${data.email}`} className={`inline-block px-6 py-2 rounded-full transition font-medium flex items-center ${
              selectedGradient === 'dark' 
                ? 'bg-white text-gray-800 hover:bg-gray-200' 
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}>
              <Mail className="w-5 h-5 mr-2" /> Email
            </a>
          )}
          {data.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium flex items-center">
              <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
            </a>
          )}
        </div>
      </div>

      {/* About and Interests sections */}
      <div className={`p-6 ${
        selectedGradient === 'dark' 
          ? 'bg-gray-800 text-white' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        {data.about && (
          <div className="mb-5">
            <h3 className="text-xl font-semibold mb-2">About</h3>
            <p className="opacity-90">{data.about}</p>
          </div>
        )}
        
        {data.interests && (
          <div className="mb-5">
            <h3 className="text-xl font-semibold mb-2">Interests</h3>
            <p className="opacity-90">{data.interests}</p>
          </div>
        )}
      </div>
      
      {/* Social icons */}
      <div className={`flex justify-center space-x-4 py-4 ${
        selectedGradient === 'dark' 
          ? 'bg-gray-700 text-gray-200' 
          : 'bg-gray-200 text-gray-700'
      }`}>
        <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 text-white hover:bg-gray-500 transition">
          <Twitter className="w-5 h-5" />
        </a>
        <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 text-white hover:bg-gray-500 transition">
          <Facebook className="w-5 h-5" />
        </a>
        <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 text-white hover:bg-gray-500 transition">
          <Instagram className="w-5 h-5" />
        </a>
        {data.github && (
          <a href={data.github} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 text-white hover:bg-gray-500 transition">
            <Github className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Gradient Selection */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Card Background</h3>
        <div className="flex flex-wrap gap-2">
          {Object.keys(gradients).map((grad) => (
            <button
              key={grad}
              onClick={() => setSelectedGradient(grad)}
              className={`w-10 h-10 rounded-full border-2 ${
                selectedGradient === grad ? 'border-primary' : 'border-gray-300'
              } ${gradients[grad as keyof typeof gradients].replace('text-white', '').replace('text-gray-800', '')}`}
              title={grad.charAt(0).toUpperCase() + grad.slice(1)}
            />
          ))}
        </div>
      </div>

      {/* Card Preview */}
      <div ref={cardRef} className="social-card max-w-md mx-auto">
        {template === 'modern' ? renderModernTemplate() : renderClassicTemplate()}
      </div>
      
      {/* Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Share Your Card</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={generateLink}
          >
            <Link2 size={16} />
            <span>Generate Share Link</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => downloadCard('png')}
          >
            <Download size={16} />
            <span>Download as PNG</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 sm:col-span-2"
            onClick={() => downloadCard('jpg')}
          >
            <Download size={16} />
            <span>Download as JPG</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
