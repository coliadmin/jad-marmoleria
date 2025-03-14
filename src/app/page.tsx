import Link from "next/link";
import {Flame} from "lucide-react";

import {api} from "@/api";
import {Hero} from "@/components/hero";
import {H2, Highlight, P} from "@/components/typo";
import {ProductLink} from "@/modules/product";
import {cn} from "@/lib/utils";
import {quicksand} from "@/fonts";
import {Interior} from "@/components/icons/interior";
import {Exterior} from "@/components/icons/exterior";
import {Kitchen} from "@/components/icons/kitchen";
import {Bathroom} from "@/components/icons/bathroom";

export default async function HomePage() {
  const products = await api.products.get();

  // const title = () => {
  //   return (
  //     <span className="text-pretty font-bold leading-[4rem]">
  //       Bienvenidos a <Highlight>JAD</Highlight> Marmoleria de diseño
  //     </span>
  //   );
  // };

  return (
    <section className="m-auto mx-auto pt-8">
      <Hero />
      <div className="m-auto max-w-5xl">
        <H2 className={cn("mb-8 border-none text-center leading-[3.2rem]")}>
          <div className="space-x-4">
            <span className="text-2xl">⭐</span>
            <span>⭐</span>
            <span className="text-2xl">⭐</span>
          </div>
          Encontrá el marmol que buscas según tus necesidades
        </H2>
        <ul className="mx-auto flex max-w-xl flex-wrap justify-evenly gap-8">
          <li className="w-32 rounded border p-2 py-6 transition-colors duration-200 ease-in-out hover:border-foreground">
            <Exterior />
          </li>
          <div className="my-auto size-3 rounded-full bg-foreground" />
          <li className="w-32 rounded border p-2 py-6 transition-colors duration-200 ease-in-out hover:border-foreground">
            <Interior />
          </li>
          <div className="my-auto size-3 rounded-full bg-foreground" />
          <li className="w-32 rounded border p-2 py-6 transition-colors duration-200 ease-in-out hover:border-foreground">
            <Kitchen />
          </li>
          <div className="my-auto size-3 rounded-full bg-transparent" />
          <li className="w-32 rounded border p-2 py-6 transition-colors duration-200 ease-in-out hover:border-foreground">
            <Bathroom />
          </li>
          <div className="my-auto size-3 rounded-full bg-foreground" />
          <li className="w-32 rounded border p-2 py-6 transition-colors duration-200 ease-in-out hover:border-foreground">
            <Link className="w-6" href="/products?categories=exteriores">
              <Flame className="mx-auto size-10" />
              <P className={cn(quicksand.className, "mt-0 text-center text-lg leading-none")}>
                <span className="rounded px-2">Resistente al calor</span>
              </P>
            </Link>
          </li>
          <div className="my-auto size-3 rounded-full bg-transparent" />
        </ul>
      </div>
      <div className="m-auto mt-24 max-w-5xl">
        <H2 className="mb-8 border-none text-center">
          Algunos de nuestros productos más solicitados
        </H2>
        <ul className="flex flex-wrap justify-between gap-8 pb-12">
          {products.data.map((product) => (
            <li key={product.id} className="inline-flex">
              <ProductLink product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
