import Link from "next/link";
import {ChevronRight} from "lucide-react";

import {capitalizeAll, cn} from "@/lib/utils";
import {getProducts} from "@/modules/product";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {H1, H2, H4, P} from "@/components/typo";
import {quicksand} from "@/fonts";
import {VerticalImage} from "@/components/vertical-image";
import {ProductLink} from "@/modules/product/product-link";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <section>
        <H1>Home</H1>
        <P className={cn("mb-8 text-lg", quicksand.className)}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec felis id odio euismod
          tincidunt. Nullam et erat id nunc condimentum varius
        </P>
      </section>
      <section className="mx-auto w-fit">
        <H2 className="mb-8">Productos</H2>
        <ul className="flex max-w-5xl flex-wrap justify-between gap-8">
          {products.data.map((product) => (
            <li key={product.id} className="inline-flex">
              <ProductLink product={product} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
