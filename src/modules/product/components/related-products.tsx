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
        className={cn(
          "mb-12 flex gap-4 overflow-x-auto pb-4 md:gap-8",
          length < 2 ? "justify-center" : "",
        )}
      >
        {products.map((related) => (
          <li key={related.id} className="w-1/2 flex-shrink-0 space-y-2 md:flex-shrink">
            <ProductLink product={related} ratio={1} />
          </li>
        ))}
      </ul>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
