"use client";
import {useSearchParams} from "next/navigation";
import {Link} from "next-view-transitions";

import {Color} from "@/modules/categories/color";
import {Use} from "@/modules/categories/use";
import {Material} from "@/modules/categories/material";
import {cn} from "@/lib/utils";
import { X } from "lucide-react";

type FilterLinkProps = {
  category: string;
  value: Color | Use | Material;
  className?: string;
  accentColor?: string;
};


export function FilterLink({ category, value, className, accentColor }: FilterLinkProps) {
  const searchParams = useSearchParams();
  const activeValue = searchParams.get(category); 
  const isCurrentFilterActive = activeValue === value.slug;

  accentColor = isCurrentFilterActive ? accentColor : "transparent";

  const currentSearchParams = new URLSearchParams(searchParams.toString());
  let newHref: string;

  if (isCurrentFilterActive) {
    currentSearchParams.delete(category);
  } else {
    currentSearchParams.set(category, value.slug);
  }

  if (currentSearchParams.toString()) {
    newHref = `?${currentSearchParams.toString()}`;
  } else {
    newHref = `/products`; 
  }

  return (
    <Link
      prefetch
      className={cn(
        "rounded-full border px-4 py-1 lg:rounded-none lg:border-none lg:px-0 lg:py-0 lg:hover:underline",
        isCurrentFilterActive &&
          "lg:rounded-e-full lg:rounded-s-none lg:border-none lg:px-2",
        className
      )}
      style={{ backgroundColor: accentColor }}
      href={newHref} 
    >
      {value.nombre}
      <X className={cn("hidden ml-1 size-3 opacity-65", isCurrentFilterActive && "inline-flex")} />
    </Link>
  );
}