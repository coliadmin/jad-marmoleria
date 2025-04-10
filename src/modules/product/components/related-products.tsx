import type {Product} from "@/modules/product";

import {ScrollArea} from "@radix-ui/react-scroll-area";

import {ProductLink} from "./product-link";

import {cn} from "@/lib/utils";
import {ScrollBar} from "@/components/ui/scroll-area";

type RelatedProductsProps = {
  products: Product[];
};

export function RelatedProducts({products}: RelatedProductsProps) {
  const length = products.length;

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <ul
        className={cn("mb-12 flex gap-8 overflow-x-auto pb-4", length < 2 ? "justify-center" : "")}
      >
        {products.map((related) => (
          <li key={related.id} className="space-y-2">
            <ProductLink className="w-28" product={related} ratio={1} />
          </li>
        ))}
      </ul>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
