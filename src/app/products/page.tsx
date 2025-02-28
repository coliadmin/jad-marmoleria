import {Link} from "next-view-transitions";

import {api} from "@/api";
import {ProductLink} from "@/modules/product";
import {H3} from "@/components/typo";

export default async function ProductsPage() {
  const products = await api.products.get();
  const colors = await api.colors.get();
  const uses = await api.uses.get();
  const materials = await api.materials.get();

  return (
    <section className="container flex border-e border-s">
      <aside className="flex h-full w-[250px] flex-col gap-8 py-8">
        <div>
          <h4 className="border-b font-medium">
            <span className="px-3">Color</span>
          </h4>
          <ul className="space-y-2 ps-5 pt-2">
            {colors.data.map((color) => (
              <li key={color.id}>
                <Link className="hover:underline" href={`/products/${color.slug}`}>
                  {color.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="border-b font-medium">
            <span className="px-3">Uso</span>
          </h4>
          <ul className="space-y-2 ps-5 pt-2">
            {uses.data.map((use) => (
              <li key={use.id}>
                <Link className="hover:underline" href={`/products/${use.slug}`}>
                  {use.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="border-b font-medium">
            <span className="px-3">Material</span>
          </h4>
          <ul className="space-y-2 ps-5 pt-2">
            {materials.data.map((material) => (
              <li key={material.id}>
                <Link className="hover:underline" href={`/products/${material.slug}`}>
                  {material.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <section className="flex-1 border-s">
        <H3 className="border-b py-3 text-center">Catálogo Neolith</H3>
        <ul className="flex flex-wrap justify-evenly gap-4 py-8">
          {products.data.map((product) => (
            <li key={product.id} className="inline-flex">
              <ProductLink product={product} ratio={1} />
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap justify-evenly gap-4 py-8">
          {products.data.map((product) => (
            <li key={product.id} className="inline-flex">
              <ProductLink product={product} ratio={1} />
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap justify-evenly gap-4 py-8">
          {products.data.map((product) => (
            <li key={product.id} className="inline-flex">
              <ProductLink product={product} ratio={1} />
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
