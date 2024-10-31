import {notFound} from "next/navigation";

import {BackButton} from "@/components/back-button";
import {ProductArticle, RelatedProducts} from "@/modules/product";
import {Separator} from "@/components/ui/separator";
import {api} from "@/api";
import {toUrl} from "@/lib/strapi";

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
  const productsData = api.products.get();
  const productData = api.products.fetch(slug);

  const [{data}, product] = await Promise.all([productsData, productData]);

  if (!product) {
    return notFound();
  }

  const relatedProducts = data.filter((p) => p.slug !== product.slug);

  return (
    <div className="container">
      <BackButton className="" />
      <ProductArticle product={product} />
      <Separator className="my-8" />
      <aside className="mt-8 px-14">
        <RelatedProducts products={relatedProducts} title="Productos que podrian interesarte" />
      </aside>
    </div>
  );
}
