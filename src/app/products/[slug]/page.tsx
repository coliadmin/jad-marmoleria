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
  const products = await api.products.getList();

  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({params: {slug}}: ProductPageProps) {
  const product = await api.products.get(slug);

  if (!product) {
    return notFound();
  }

  return {
    title: product.nombre,
    description: product.descripcion,
    openGraph: {
      title: product.nombre,
      description: product.descripcion,
      images: [
        {
          url: toUrl(product.portada.url),
          alt: product.nombre,
        },
      ],
      url: `/products/${slug}`,
      type: "article",
      locale: "es_AR",
      siteName: "JAD Marmoleria",
    },
  };
}

export default async function ProductPage({params: {slug}}: ProductPageProps) {
  const {get, getList} = api.products;

  const [product, products] = await Promise.all([get(slug), getList()]);

  if (!product) {
    return notFound();
  }

  const relatedProducts = products.filter((p) => p.slug !== product.slug);

  const nextProductIdx = products.findIndex((p) => p.slug === slug);
  const nextProduct = products[nextProductIdx + 1] || products[0];

  return (
    <>
      <section className="container">
        <div className="flex flex-1 items-center">
          <NavProductButton className="hidden lg:block" mode="back" variant="left" />
          <div className="flex-1 lg:mx-12">
            <ProductArticle nextProduct={nextProduct} product={product}>
              <aside className="m-auto w-vertical lg:ms-16">
                {product.imagenes !== null ? (
                  <VerticalCarousel images={product.imagenes} />
                ) : (
                  <Skeleton className="h-[33.75rem] w-vertical" />
                )}
              </aside>
            </ProductArticle>
          </div>
          <NavProductButton className="hidden lg:block" path={nextProduct.slug} variant="right" />
        </div>
      </section>
      <aside className="flex justify-center border-t">
        <div className="mx-4 flex max-w-lg flex-col justify-center sm:max-w-2xl md:mx-12 md:max-w-3xl lg:mx-24 lg:max-w-5xl">
          <H3 className="my-6 text-center text-2xl font-medium">
            Productos que podrían interesarte
          </H3>
          <RelatedProducts products={relatedProducts} />
        </div>
      </aside>
    </>
  );
}
