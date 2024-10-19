import {notFound} from "next/navigation";

import {fetchProduct, getProducts} from "@/modules/product";
import {BackButton} from "@/components/back-button";
import {capitalizeAll} from "@/lib/utils";
import {VerticalImage} from "@/components/vertical-image";
import {VerticalCarousel} from "@/components/vertical-carousel";
import {H2, H3, H4} from "@/components/typo";
import {ProductLink} from "@/modules/product/product-link";
import {RelatedProducts} from "@/modules/product/related-products";
import {Separator} from "@/components/ui/separator";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export default async function ProductPage({params: {slug}}: ProductPageProps) {
  const {data: products} = await getProducts();
  const product = await fetchProduct(slug);

  if (!product) {
    return notFound();
  }

  const relatedProducts = products.filter((p) => p.id !== product.id);

  return (
    <>
      <article>
        <header className="inline-flex gap-4">
          <BackButton />
          <h1 className="mb-8 text-4xl font-bold">{capitalizeAll(product.nombre)}</h1>
        </header>
        <div className="inline-flex w-full gap-20 ps-14">
          <aside className="w-vertical">
            <VerticalCarousel images={product.imagenes} />
          </aside>
          <div className="max-w-2xl flex-1 space-y-8">
            <p className="text-pretty">{product.descripcion}</p>
            <div>
              <p>
                <span className="font-medium">Disponibilidad: </span>
                {product.disponibilidad ? "sin stock" : "en stock"}
              </p>
              <p>
                <span className="font-medium">Espesor: </span> {product.espesor}
              </p>
              <p>
                <span className="font-medium">Uso: </span> {product.uso}
              </p>
            </div>
          </div>
        </div>
      </article>
      <Separator className="my-8" />
      <aside className="mt-8 px-14">
        <RelatedProducts products={relatedProducts} title="Productos que podrian interesarte" />
      </aside>
    </>
  );
}
