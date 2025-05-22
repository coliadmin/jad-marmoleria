import type {Product} from "@/modules/product";

import {ScrollArea} from "@radix-ui/react-scroll-area";

import {ProductLink} from "./product-link";

import {cn} from "@/lib/utils";
import {ScrollBar} from "@/components/ui/scroll-area";
import { Project } from "@/modules/projects";

type RelatedProductsProps = {
  products: Product[] | Project[];
  type?: "products" | "projects",
};

export function RelatedProducts({products, type}: RelatedProductsProps) {
  const length = products.length;

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <ul
        className={cn(
          "flex gap-4 mb-12 md:gap-8",
          length < 2 ? "justify-center" : "overflow-x-auto",
        )}
      >
        {products.map((related) => (
          <li key={related.id} className="flex-shrink pb-2 md:flex-shrink">
            <ProductLink product={related} path={type} ratio={1} />
          </li>
        ))}
      </ul>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
