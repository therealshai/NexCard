
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Footer as CustomFooter } from "@/components/ui/footer";

export function Footer() {
  // Logo component to reuse in the footer
  const Logo = () => {
    return (
      <img 
        src="/public/lovable-uploads/0fac59bc-cc22-4e8d-aadb-89ee6dcf8c8a.png" 
        alt="NexCard Logo" 
        className="h-12 w-auto"
      />
    );
  };

  return (
    <CustomFooter
      logo={<Logo />}
      brandName="NexCard"
      socialLinks={[
        {
          icon: <Facebook className="h-5 w-5" />,
          href: "https://facebook.com",
          label: "Facebook",
        },
        {
          icon: <Twitter className="h-5 w-5" />,
          href: "https://twitter.com",
          label: "Twitter",
        },
        {
          icon: <Instagram className="h-5 w-5" />,
          href: "https://instagram.com",
          label: "Instagram",
        },
        {
          icon: <Linkedin className="h-5 w-5" />,
          href: "https://linkedin.com",
          label: "LinkedIn",
        },
      ]}
      mainLinks={[
        { href: "/product", label: "Product" },
        { href: "/features", label: "Features" },
        { href: "/templates", label: "Templates" },
      ]}
      legalLinks={[
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
      ]}
      copyright={{
        text: `© ${new Date().getFullYear()} NexCard`,
        license: "All rights reserved",
      }}
    />
  );
}
