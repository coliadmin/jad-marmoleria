"use client";
import {useSearchParams} from "next/navigation";
import {Link} from "next-view-transitions";

import {Color} from "@/modules/categories/color";
import {Use} from "@/modules/categories/use";
import {Material} from "@/modules/categories/material";
import {cn} from "@/lib/utils";

type FilterLinkProps = {
  category: string;
  value: Color | Use | Material;
  className?: string;
  accentColor?: string;
};

export function FilterLink({category, value, className, accentColor}: FilterLinkProps) {
  const searchParams = useSearchParams();
  const activeValue = searchParams.get("value");
  accentColor = activeValue === value.slug ? accentColor : "transparent";

  return (
    <Link
      prefetch
      className={cn(
        "rounded-full border px-4 py-1 lg:rounded-none lg:border-none lg:px-0 lg:py-0 lg:hover:underline",
        activeValue === value.slug &&
          "lg:rounded-e-full lg:rounded-s-none lg:border-none lg:px-2",
           className
      )}
      style={{backgroundColor: accentColor}}

      href={`/products?category=${category.toString()}&value=${value.slug}`}
    >
      {value.nombre}
    </Link>
  );
}
