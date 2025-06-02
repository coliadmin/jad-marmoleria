"use client";
import {useSearchParams} from "next/navigation";
import {Link} from "next-view-transitions";

import {Color} from "@/modules/categories/color";
import {Use} from "@/modules/categories/use";
import {Material} from "@/modules/categories/material";
import {cn} from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Aplication } from "@/modules/categories/aplication";
import { FilterLink } from "./filter-link";
import { useState } from "react";

interface Filters {
  title: string;
  slug: string;
  category: Color[] | Aplication[] | Material[] | Use[];
}

type Props = {
  filters: Filters[];
  className?: string;
  accentColor?: string;
};

export function FiltersMobile({ filters, className, accentColor }: Props) {
    const searchParams = useSearchParams();
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);

  const handleCategoryClick = (categorySlug: string) => {
    setActiveCategorySlug((prevSlug) => (prevSlug === categorySlug ? null : categorySlug));
  };

  const selectedFilter = filters.find(filter => filter.slug === activeCategorySlug);
  return (
    <div className="gap-4 p-2">
      <div className="flex gap-4 overflow-x-auto w-full pb-2">
        {filters.map((filter) => {
            const isFilterActiveInUrl = !!searchParams.get(filter.slug);
            const isCategoryVisuallyActive = activeCategorySlug === filter.slug || isFilterActiveInUrl;

            return (
                <button
                  key={filter.slug}
                  onClick={() => handleCategoryClick(filter.slug)}
                    className={cn("rounded-full border px-6 py-1 font-medium", 
                        isCategoryVisuallyActive && "bg-gray-200/65", className)}
                >
                    {filter.title}
                </button>
            );
        })}
      </div>

      {activeCategorySlug && selectedFilter && (
        <div className="w-full overflow-x-auto pb-2 border-t border-gray-200">
        <div className="flex text-nowrap w-full gap-2 pt-2 ">
          {selectedFilter.category.map((item) => (
            <FilterLink
              key={item.id} 
              category={selectedFilter.slug} 
              value={item}
              accentColor={accentColor} 
            />
          ))}
        </div>
        </div>
      )}
    </div>
  );
}
