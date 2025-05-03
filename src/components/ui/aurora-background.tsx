
"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const AuroraBackground = ({
  className,
  containerClassName,
}: {
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "h-full w-full inset-0 overflow-hidden -z-10",
        containerClassName
      )}
    >
      <div
        className={cn(
          "relative top-0 left-0 right-0 bottom-0 h-full w-full",
          className
        )}
      >
        <div className="absolute inset-0 z-[-10] h-full w-full bg-background">
          <div className="absolute inset-0 bottom-0 z-[-1] h-full w-full opacity-[0.3] [filter:blur(50px)]">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-b from-transparent to-primary/20 z-[-1]" />
            <div className="absolute -left-[10%] -top-[10%] h-[45%] w-[35%] rounded-full bg-primary/30 blur-[50px]" />
            <div className="absolute -right-[10%] top-[20%] h-[35%] w-[35%] rounded-full bg-primary/30 blur-[50px]" />
            <div className="absolute bottom-[20%] right-[15%] h-[40%] w-[30%] rounded-full bg-primary/30 blur-[50px]" />
            <div className="absolute bottom-[10%] left-[10%] h-[30%] w-[30%] rounded-full bg-primary/30 blur-[50px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
