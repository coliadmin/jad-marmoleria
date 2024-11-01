import type {Product} from "@/modules/product";

import {ChevronRight} from "lucide-react";
import {Link} from "next-view-transitions";

import {H4} from "@/components/typo";
import {VerticalImage} from "@/components/vertical-image";
import {cn} from "@/lib/utils";
import {toUrl} from "@/lib/strapi";

type ProductLinkProps = {
  product: Product;
  ratio?: number;
  className?: string;
  color?: string;
};

export function ProductLink({product, ratio, className, color}: ProductLinkProps) {
  return (
    <Link className="group space-y-2" href={`/products/${product.slug}`}>
      <VerticalImage
        alt={product.portada.name}
        className={className}
        ratio={ratio}
        src={toUrl(product.portada.url)}
      />
      <div className="inline-flex w-full items-center">
        <H4
          className={cn(
            "inline-flex w-fit items-center border-b text-lg transition-all duration-200 ease-in-out group-hover:border-foreground",
            color,
          )}
        >
          {product.nombre}
        </H4>
        <ChevronRight className="mb-icon ms-2 size-5 text-border transition-all duration-200 ease-in-out group-hover:inline-block group-hover:text-foreground" />
      </div>
    </Link>
  );
}
