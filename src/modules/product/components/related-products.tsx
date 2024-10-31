import type {Product} from "@/modules/product";

import {ProductLink} from "./product-link";

import {H3} from "@/components/typo";

type RelatedProductsProps = {
  products: Product[];
  title?: string;
};

export function RelatedProducts({
  products,
  title = "Productos relacionados",
}: RelatedProductsProps) {
  return (
    <>
      <H3 className="mb-4 text-2xl font-medium">{title}</H3>
      <ul className="flex gap-8">
        {products.map((related) => (
          <li key={related.id} className="space-y-2">
            <ProductLink className="w-40" product={related} ratio={4 / 4} />
          </li>
        ))}
      </ul>
    </>
  );
}
