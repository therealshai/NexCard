
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Footer as CustomFooter } from "@/components/ui/footer";

export function Footer() {
  return (
    <CustomFooter
      logo={<span className="text-xl font-bold"><span className="text-green-500">Nex</span>Card</span>}
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
