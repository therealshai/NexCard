
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { PricingTable, type PricingFeature, type PricingPlan } from "@/components/ui/pricing-table";

const features: PricingFeature[] = [
  { name: "1 Social Card", included: "starter" },
  { name: "Basic Templates", included: "starter" },
  { name: "PNG Download", included: "starter" },
  { name: "Standard Support", included: "starter" },
  { name: "5 Social Cards", included: "pro" },
  { name: "Premium Templates", included: "pro" },
  { name: "PNG & JPG Downloads", included: "pro" },
  { name: "Custom Branding", included: "pro" },
  { name: "Basic Analytics", included: "pro" },
  { name: "Priority Support", included: "pro" },
  { name: "Unlimited Social Cards", included: "all" },
  { name: "All Templates", included: "all" },
  { name: "All Export Formats", included: "all" },
  { name: "Advanced Branding", included: "all" },
  { name: "Advanced Analytics", included: "all" },
  { name: "Dedicated Support", included: "all" },
  { name: "Team Management", included: "all" }
];

const plans: PricingPlan[] = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    level: "starter",
  },
  {
    name: "Professional",
    price: { monthly: 9.99, yearly: 99.90 },
    level: "pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 19.99, yearly: 199.90 },
    level: "all",
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-10 px-4 animated-bg">
          <div className="container mx-auto">
            <motion.div 
              className="max-w-4xl mx-auto text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Simple, Transparent <span className="text-primary">Pricing</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the perfect plan for your professional needs. No hidden fees, cancel anytime.
              </p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              <PricingTable 
                features={features} 
                plans={plans}
                defaultPlan="pro"
                defaultInterval="monthly"
                onPlanSelect={(plan) => console.log("Selected plan:", plan)}
                containerClassName="py-8"
                buttonClassName="bg-primary hover:bg-primary/90"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
