"use client";
import {useSearchParams} from "next/navigation";
import {Link} from "next-view-transitions";

import {Color} from "@/modules/categories/color";
import {Use} from "@/modules/categories/use";
import {Material} from "@/modules/categories/material";
import {Categories} from "@/modules/categories/enum";
import {cn} from "@/lib/utils";

type FilterLinkProps = {
  category: Categories;
  value: Color | Use | Material;
};

export function FilterLink({category, value}: FilterLinkProps) {
  const searchParams = useSearchParams();

  const activeValue = searchParams.get("value");

  function handleOnChange(value: string) {
    if (value === activeValue) {
      window.location.href = "/products";

      return;
    }
  }

  return (
    <Link
      replace
      className={cn(
        "hover:underline",
        activeValue === value.slug && "rounded-e-full bg-amber-300/65 px-2",
      )}
      href={`/products?category=${category.toString()}&value=${value.slug}`}
      onClick={() => handleOnChange(value.slug)}
    >
      {value.nombre}
    </Link>
  );
}
