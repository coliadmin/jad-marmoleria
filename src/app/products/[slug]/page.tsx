import {notFound} from "next/navigation";

import {ProductArticle, RelatedProducts} from "@/modules/product";
import {api} from "@/api";
import {toUrl} from "@/lib/strapi";
import {VerticalCarousel} from "@/components/vertical-carousel";
import {H3} from "@/components/typo";
import {Skeleton} from "@/components/ui/skeleton";
import {NavProductButton} from "@/components/nav-button";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const {data} = await api.products.get();

  return data.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({params: {slug}}: ProductPageProps) {
  const product = await api.products.fetch(slug);

  if (!product) {
    return notFound();
  }

  return {
    title: product.nombre,
    description: product.descripcion,
    image: toUrl(product.portada.url),
  };
}

export default async function ProductPage({params: {slug}}: ProductPageProps) {
  const {fetch, get} = api.products;

  const [{data}, product] = await Promise.all([get(), fetch(slug)]);

  if (!product) {
    return notFound();
  }

  const relatedProducts = data.filter((p) => p.slug !== product.slug);

  const nextProductIdx = data.findIndex((p) => p.slug === slug);
  const nextProduct = data[nextProductIdx + 1] || data[0];

  const productImages = product.imagenes || [];
  const apiImages = productImages.map((image) => ({...image, url: toUrl(image.url)}));

  return (
    <>
      <section className="container">
        <div className="flex flex-1 items-center">
          <NavProductButton className="hidden lg:block" mode="back" variant="left" />
          <div className="flex-1 lg:mx-12">
            <ProductArticle nextProduct={nextProduct} product={product}>
              <aside className="m-auto w-vertical lg:ms-16">
                {product.imagenes !== null ? (
                  <VerticalCarousel images={apiImages} />
                ) : (
                  <Skeleton className="h-[33.75rem] w-vertical" />
                )}
              </aside>
            </ProductArticle>
          </div>
          <NavProductButton className="hidden lg:block" path={nextProduct.slug} variant="right" />
        </div>
      </section>
      <aside className="border-t">
        <div className="mx-24">
          <H3 className="my-6 text-center text-2xl font-medium">
            Productos que podrían interesarte
          </H3>
          <RelatedProducts products={relatedProducts} />
        </div>
      </aside>
    </>
  );
}
