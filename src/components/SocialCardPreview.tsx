import { Linkedin, Download, Link2, Mail as MailIcon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { SocialCardData } from "@/types/social-card";
import { GraduationCap, BookOpen, Code, Briefcase } from "lucide-react";

type SocialCardPreviewProps = { 
  data: SocialCardData;
  template?: string;
};

export function SocialCardPreview({ data, template = 'classic' }: SocialCardPreviewProps) {
  const { toast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);

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
    <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {/* Square profile photo */}
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
        <h1 className="text-2xl font-bold mb-1 text-center">{data.name}</h1>
        <p className="text-gray-600 mb-4 text-center">{data.title}</p>
        
        {data.website && <p className="text-sm text-gray-500 mb-4 text-center">{data.website}</p>}
        
        <div className="border-t border-gray-200 my-4"></div>
        
        <div className="flex justify-center space-x-4 text-sm mb-4">
          {data.email && (
            <a href={`mailto:${data.email}`} className="font-medium px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              Email
            </a>
          )}
          {data.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors">
              LinkedIn
            </a>
          )}
        </div>
        
        <div className="border-t border-gray-200 my-4"></div>
        
        {data.about && (
          <div className="mb-4">
            <h3 className="font-semibold mb-1">About</h3>
            <p className="text-sm text-gray-600">{data.about}</p>
          </div>
        )}
        
        {data.interests && (
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Interests</h3>
            <p className="text-sm text-gray-600">{data.interests}</p>
          </div>
        )}
        
        {data.techSkills && (
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Technical Skills</h3>
            <p className="text-sm text-gray-600 whitespace-pre-line">{data.techSkills}</p>
          </div>
        )}
        
        {data.publishedWorks && (
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Published Works</h3>
            <p className="text-sm text-gray-600 whitespace-pre-line">{data.publishedWorks}</p>
          </div>
        )}
        
        {data.latestWorkLinks && (
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Latest Works</h3>
            <div className="text-sm text-gray-600">
              {data.latestWorkLinks.split('\n').map((link, i) => (
                <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline mb-1">
                  {link}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderAcademicTemplate = () => {
    // Define gradient classes with full color stops
    const gradientClasses = {
      blue: 'from-blue-400 to-blue-600',
      purple: 'from-purple-400 to-purple-600',
      teal: 'from-teal-400 to-teal-600',
      orange: 'from-orange-400 to-orange-600',
      green: 'from-green-400 to-green-600'
    };
    
    const gradientClass = gradientClasses[data.gradient || 'blue'];
    
    return (
      <div className={`w-full max-w-md rounded-lg shadow-md overflow-hidden bg-gradient-to-br ${gradientClass}`}>
        <div className="p-6 bg-white/90 backdrop-blur-sm">
          <div className="flex items-center">
            {data.photoUrl && (
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white mr-4 flex-shrink-0 shadow-md">
                <img 
                  src={data.photoUrl} 
                  alt={data.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{data.name}</h1>
              <p className="text-gray-600">{data.title}</p>
              {data.website && (
                <p className="text-sm text-gray-500 mt-1 flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  {data.website}
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-white/80 backdrop-blur-sm">
          <div className="flex flex-wrap gap-2 mb-6">
            {data.email && (
              <a href={`mailto:${data.email}`} className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200 transition-colors">
                <MailIcon className="w-4 h-4" />
                <span>Email</span>
              </a>
            )}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            )}
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1 bg-gray-800 text-white rounded-full text-sm hover:bg-gray-700 transition-colors">
                <Code className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            )}
          </div>
          
          {data.about && (
            <div className="mb-6">
              <h3 className="font-semibold flex items-center gap-2 mb-2 text-gray-800">
                <GraduationCap className="w-5 h-5" />
                <span>About</span>
              </h3>
              <p className="text-sm text-gray-600">{data.about}</p>
            </div>
          )}
          
          {data.techSkills && (
            <div className="mb-6">
              <h3 className="font-semibold flex items-center gap-2 mb-2 text-gray-800">
                <Code className="w-5 h-5" />
                <span>Technical Skills</span>
              </h3>
              <p className="text-sm text-gray-600 whitespace-pre-line">{data.techSkills}</p>
            </div>
          )}
          
          {data.publishedWorks && (
            <div className="mb-6">
              <h3 className="font-semibold flex items-center gap-2 mb-2 text-gray-800">
                <BookOpen className="w-5 h-5" />
                <span>Published Works</span>
              </h3>
              <p className="text-sm text-gray-600 whitespace-pre-line">{data.publishedWorks}</p>
            </div>
          )}
          
          {data.latestWorkLinks && (
            <div className="mb-4">
              <h3 className="font-semibold flex items-center gap-2 mb-2 text-gray-800">
                <Briefcase className="w-5 h-5" />
                <span>Latest Works</span>
              </h3>
              <div className="text-sm text-gray-600">
                {data.latestWorkLinks.split('\n').map((link, i) => (
                  <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline mb-1">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderDefaultTemplate = () => (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-6">
        {data.photoUrl && (
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 mx-auto mb-4">
            <img 
              src={data.photoUrl} 
              alt={data.name} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <h2 className="text-2xl font-bold text-center mb-1">{data.name}</h2>
        <p className="text-gray-600 text-center mb-4">{data.title}</p>
        
        {data.website && <p className="text-sm text-gray-500 text-center mb-4">{data.website}</p>}
        
        <div className="flex justify-center space-x-4 text-sm mb-4">
          {data.email && (
            <a href={`mailto:${data.email}`} className="font-medium flex items-center gap-1">
              <MailIcon className="w-4 h-4" />
              <span>Email</span>
            </a>
          )}
          {data.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          )}
        </div>
        
        {data.about && (
          <div className="mb-4">
            <h3 className="font-semibold mb-1">About</h3>
            <p className="text-sm text-gray-600">{data.about}</p>
          </div>
        )}
        
        {data.interests && (
          <div>
            <h3 className="font-semibold mb-1">Interests</h3>
            <p className="text-sm text-gray-600">{data.interests}</p>
          </div>
        )}
        
        {data.techSkills && (
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Technical Skills</h3>
            <p className="text-sm text-gray-600 whitespace-pre-line">{data.techSkills}</p>
          </div>
        )}
        
        {data.publishedWorks && (
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Published Works</h3>
            <p className="text-sm text-gray-600 whitespace-pre-line">{data.publishedWorks}</p>
          </div>
        )}
        
        {data.latestWorkLinks && (
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Latest Works</h3>
            <div className="text-sm text-gray-600">
              {data.latestWorkLinks.split('\n').map((link, i) => (
                <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline mb-1">
                  {link}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div ref={cardRef} className="social-card">
        {template === 'classic' ? renderClassicTemplate() : 
         template === 'academic' ? renderAcademicTemplate() : 
         renderDefaultTemplate()}
      </div>
      
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