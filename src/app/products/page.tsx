import Link from "next/link";

import {api} from "@/api";
import {ProductLink} from "@/modules/product";
import {ScrollArea} from "@/components/ui/scroll-area";
import {H3, H4} from "@/components/typo";

export default async function ProductsPage() {
  const products = await api.products.get();

  return (
    <section className="container flex border-e border-s">
      <aside className="flex h-full w-[250px] flex-col gap-8 py-8">
        <div>
          <h4 className="border-b font-medium">
            <span className="px-3">Color</span>
          </h4>
          <ul className="space-y-2 ps-5 pt-2">
            <li>
              <Link className="hover:underline" href="/products/1">
                Blanco
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/products/2">
                Negro
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/products/3">
                Rojo
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="border-b font-medium">
            <span className="px-3">Uso</span>
          </h4>
          <ul className="space-y-2 ps-5 pt-2">
            <li>
              <Link className="hover:underline" href="/products/1">
                Cocina
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/products/2">
                Baño
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/products/3">
                Exterior
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="border-b font-medium">
            <span className="px-3">Material</span>
          </h4>
          <ul className="space-y-2 ps-5 pt-2">
            <li>
              <Link className="hover:underline" href="/products/1">
                Neolith
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/products/2">
                Silestone
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/products/3">
                Dekton
              </Link>
            </li>
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
