
import { motion } from "framer-motion";
import { HeroVideoDialog } from "./HeroVideoDialog";

export function VideoSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Experience the future of professional networking
          </h2>
          <p className="text-muted-foreground mb-6">
            See how NexCard transforms the way you connect with others
          </p>
          
          <HeroVideoDialog />
          
          <div className="mt-12 bg-card p-8 rounded-2xl shadow-lg border border-border">
            <div className="aspect-video relative rounded-lg overflow-hidden shadow-inner bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6">
                  <p className="text-xl font-semibold text-foreground">Your professionally crafted digital card</p>
                  <p className="text-sm text-muted-foreground mt-2">Click "View Demo" to see it in action</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
