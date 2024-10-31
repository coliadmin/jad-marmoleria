"use client";

import {useRouter} from "next/navigation";
import {ChevronLeft} from "lucide-react";

import {Button} from "./ui/button";

import {cn} from "@/lib/utils";

type BackButtonProps = {
  className?: string;
};

export function BackButton({className}: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      className={cn("mt-icon", className)}
      size="icon"
      variant="link"
      onClick={() => router.back()}
    >
      <ChevronLeft />
    </Button>
  );
}
