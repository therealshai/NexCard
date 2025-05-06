
import { motion } from "framer-motion";

export function CreatePageHeader() {
  return (
    <motion.div 
      className="text-center mb-8 md:mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">Create Your Social Card</h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Fill in your details to generate a professional social card that you can share online
      </p>
    </motion.div>
  );
}
