
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
    description: "A timeless, elegant design with a clean layout.",
    color: "from-green-400 to-green-600",
    previewText: "Jane Smith",
    previewSubtext: "Software Engineer",
    bg: "bg-gray-900"
  },
  {
    id: "modern",
    name: "Modern",
    description: "Sleek and contemporary with bold elements.",
    color: "from-gray-600 to-gray-800",
    previewText: "Alex Johnson",
    previewSubtext: "UX Designer",
    bg: "bg-white"
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and refined with a focus on content.",
    color: "from-blue-400 to-blue-600",
    previewText: "Sam Taylor",
    previewSubtext: "Product Manager",
    bg: "bg-blue-50"
  },
  {
    id: "creative",
    name: "Creative",
    description: "Unique and eye-catching for creative professionals.",
    color: "from-purple-400 to-purple-600",
    previewText: "Morgan Lee",
    previewSubtext: "Graphic Designer",
    bg: "bg-purple-50"
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional and polished for business environments.",
    color: "from-green-600 to-green-800",
    previewText: "Jamie Wilson",
    previewSubtext: "Marketing Director",
    bg: "bg-green-50"
  },
  {
    id: "tech",
    name: "Tech",
    description: "Modern and digital-focused with a tech aesthetic.",
    color: "from-teal-400 to-teal-600",
    previewText: "Taylor Kim",
    previewSubtext: "Lead Developer",
    bg: "bg-teal-50"
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
                className="h-full"
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 h-full flex flex-col">
                  <div className={`h-64 bg-gradient-to-r ${template.color} flex items-center justify-center p-4`}>
                    <div className={`${template.bg} rounded-lg p-6 w-64 h-40 flex flex-col items-center justify-center transition-all duration-300 shadow-md`}>
                      {hoveredTemplate === template.id ? (
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center text-green font-bold">
                            {template.previewText.charAt(0)}
                          </div>
                          <p className="font-syne font-bold text-lg text-gray-800">{template.previewText}</p>
                          <p className="text-sm text-gray-600">{template.previewSubtext}</p>
                        </div>
                      ) : (
                        <p className="font-syne font-bold text-xl text-green">{template.name}</p>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                      <p className="text-muted-foreground mb-4">{template.description}</p>
                    </div>
                    <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-auto">
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
