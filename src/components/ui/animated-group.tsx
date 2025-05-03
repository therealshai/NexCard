
import { cn } from "@/lib/utils";
import { motion, type Variants } from "framer-motion";
import React from "react";

type MarginType = number | string;

// Define our own ViewportOptions interface to match framer-motion's expected structure
interface ViewportOptions {
  once?: boolean;
  margin?: string;
  amount?: "some" | "all" | number;
  root?: React.RefObject<Element>;
}

type AnimatedGroupProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
  variants?: {
    container: Variants;
    item: Variants;
  };
  delay?: number;
  staggerDelay?: number;
  viewport?: ViewportOptions;
  margin?: MarginType;
};

export const AnimatedGroup = ({
  as = "div",
  className,
  children,
  variants = {
    container: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.25,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 8 },
      visible: {
        opacity: 1,
        y: 0,
      },
    },
  },
  viewport,
  margin,
}: AnimatedGroupProps) => {
  // Create the motion component based on the HTML element type
  const Component = motion[as as keyof typeof motion] as React.ComponentType<any>;
  
  const childrenArray = React.Children.toArray(children);

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport || { once: true, margin: margin ? String(margin) : undefined }}
      variants={variants.container}
    >
      {childrenArray.map((child, i) => {
        return (
          <motion.div key={i} variants={variants.item}>
            {child}
          </motion.div>
        );
      })}
    </Component>
  );
};
