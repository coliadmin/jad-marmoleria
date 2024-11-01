"use client";

import {ChevronLeft, ChevronRight} from "lucide-react";
import {useTransitionRouter} from "next-view-transitions";

import {Button} from "./ui/button";

import {cn} from "@/lib/utils";

type NavProductButtonProps = {
  variant: "left" | "right";
  path?: string;
  className?: string;
  mode?: "path" | "back";
};

const variants = {
  left: <ChevronLeft />,
  right: <ChevronRight />,
};

export function NavProductButton({
  variant,
  className,
  path = "",
  mode = "path",
}: NavProductButtonProps) {
  const router = useTransitionRouter();

  function handleClick() {
    if (mode === "back") {
      return router.back();
    }

    router.push(`/products/${path}`);
  }

  return (
    <Button
      className={cn("mt-icon hover:bg-muted hover:text-foreground", className)}
      size="icon"
      variant="link"
      onClick={handleClick}
    >
      {variants[variant]}
    </Button>
  );
}
