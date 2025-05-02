import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const templates = [
  {
    id: "classic",
    name: "Classic",
    description: "A timeless, elegant design with clean typography and layout.",
    color: "from-gray-100 to-gray-300",
    previewText: "Laura Smith",
    previewSubtext: "Frontend Developer",
    previewDetails: "laurasmith.website"
  },
  {
    id: "Academic",
    name: "Academic",
    description: "Your professional identity in a clean and modern format.",
    color: "from-green-100 to-teal-200",
    previewText: "Taylor Kim",
    previewSubtext: "Associate Professor",
    previewDetails: "jainuniversity.edu"
  },
  {
    id: "modern",
    name: "Modern",
    description: "Sleek and contemporary with bold elements.",
    color: "from-blue-100 to-blue-300",
    previewText: "Alex Johnson",
    previewSubtext: "UX Designer",
    previewDetails: "alexjohnson.design"
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and refined with a focus on content.",
    color: "from-white to-gray-100",
    previewText: "Sam Taylor",
    previewSubtext: "Product Manager",
    previewDetails: "samtaylor.co"
  },
  {
    id: "creative",
    name: "Creative",
    description: "Unique and eye-catching for creative professionals.",
    color: "from-purple-100 to-pink-200",
    previewText: "Morgan Lee",
    previewSubtext: "Graphic Designer",
    previewDetails: "morganleedesign.com"
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional and polished for business environments.",
    color: "from-gray-200 to-gray-400",
    previewText: "Jamie Wilson",
    previewSubtext: "Marketing Director",
    previewDetails: "jamiewilson.biz"
  },
  {
    id: "tech",
    name: "Tech",
    description: "Modern and digital-focused with a tech aesthetic.",
    color: "from-green-100 to-teal-200",
    previewText: "Taylor Kim",
    previewSubtext: "Lead Developer",
    previewDetails: "taylorkim.dev"
  }

];

const Templates = () => {
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">Social Card Templates</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from a variety of professionally designed templates for your social card
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                  <div className={`h-56 ${template.color} flex items-center justify-center p-4`}>
                    <div className="bg-white rounded-lg p-6 w-64 h-40 flex flex-col items-center justify-center transition-all duration-300 shadow-md border border-gray-200">
                      {hoveredTemplate === template.id ? (
                        <div className="text-center w-full">
                          <p className="font-bold text-xl text-gray-800 mb-1">{template.previewText}</p>
                          <p className="text-gray-600 mb-2">{template.previewSubtext}</p>
                          <div className="border-t border-gray-200 w-full my-2"></div>
                          <p className="text-sm text-gray-500 mb-3">{template.previewDetails}</p>
                          <div className="flex justify-center space-x-4 text-sm">
                            <span className="text-gray-700 font-medium">Email</span>
                            <span className="text-gray-700 font-medium">LinkedIn</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="font-bold text-xl text-gray-800">{template.name}</p>
                          <p className="text-gray-500 mt-2">{template.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                    <p className="text-muted-foreground mb-4">{template.description}</p>
                    <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link to={`/create?template=${template.id}`}>Use Template</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
