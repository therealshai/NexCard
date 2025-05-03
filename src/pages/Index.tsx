
import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { StepsSection } from "@/components/StepsSection";
import { HeroSection } from "@/components/blocks/hero-section-1";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <StepsSection />
        
        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-hunter/10 to-green/10">
          <div className="container mx-auto">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Ready to Create Your Professional Digital Identity?
              </h2>
              <p className="text-lg text-foreground max-w-2xl mx-auto mb-8">
                Join thousands of professionals who are making meaningful connections with NexCard's digital business cards.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild className="btn-primary min-w-[180px]">
                  <Link to="/create">Get Started for Free</Link>
                </Button>
                <Button asChild className="btn-secondary min-w-[180px]">
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
