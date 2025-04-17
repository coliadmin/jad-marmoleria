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
};

export function FilterLink({category, value}: FilterLinkProps) {
  const searchParams = useSearchParams();
  const activeValue = searchParams.get("value");

  return (
    <Link
      prefetch
      className={cn(
        "lg:hover:underline",
        activeValue === value.slug && " lg:rounded-s-none rounded-full bg-amber-300/65 px-3 lg:px-2",
      )}
      href={`/products?category=${category.toString()}&value=${value.slug}`}
    >
      {value.nombre}
    </Link>
  );
}
