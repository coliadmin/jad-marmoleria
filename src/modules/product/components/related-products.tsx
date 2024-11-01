import type {Product} from "@/modules/product";

import {ProductLink} from "./product-link";

import {cn} from "@/lib/utils";

type RelatedProductsProps = {
  products: Product[];
};

export function RelatedProducts({products}: RelatedProductsProps) {
  const length = products.length;

  return (
    <ul className={cn("mb-12 flex gap-8", length < 5 ? "justify-center" : "")}>
      {products.map((related) => (
        <li key={related.id} className="space-y-2">
          <ProductLink className="w-28" product={related} ratio={1} />
        </li>
      ))}
    </ul>
  );
}
