"use client";

import {useRouter} from "next/navigation";
import {ChevronLeft} from "lucide-react";

import {Button} from "./ui/button";

export function BackButton() {
  const router = useRouter();

  return (
    <Button className="mt-icon" size="icon" variant="link" onClick={() => router.back()}>
      <ChevronLeft />
    </Button>
  );
}
