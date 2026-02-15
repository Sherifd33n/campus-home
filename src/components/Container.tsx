"use client"

import React from "react";
import { cn } from "../../lib/utils";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "max-w-7xl mx-auto px-4 md:px-12.5 lg:px-20",
        className
      )}>
      {children}
    </div>
  );
};

export default Container;
