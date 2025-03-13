import {Armchair, ChefHat, Feather, Flame, ShowerHead, Snowflake} from "lucide-react";
import Link from "next/link";

import {api} from "@/api";
import {Hero} from "@/components/hero";
import {HeroV2} from "@/components/hero-v2";
import {HeroV3} from "@/components/hero-v3";
import {H2, P} from "@/components/typo";
import {ProductLink} from "@/modules/product";
import {cn} from "@/lib/utils";
import {montserrat, quicksand} from "@/fonts";

export default async function HomePage() {
  const products = await api.products.get();

  const title = () => {
    return (
      <span className="text-pretty font-bold leading-[4rem]">
        Bienvenidos a <span className="bg-amber-500/65 px-3 text-background">JAD</span> Marmoleria
        de diseño
      </span>
    );
  };

  return (
    <section className="m-auto mx-auto pt-8">
      <Hero subtitle="Construimos espacios de lujo" title={title()} />
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
            <Link className="m-auto" href="/products?category=usos&value=exterior">
              <Feather className="mx-auto size-10" />
              <P className={cn(quicksand.className, "mt-0 text-center text-lg leading-none")}>
                <span className="rounded px-2">Exteriores</span>
              </P>
            </Link>
          </li>
          <div className="my-auto size-3 rounded-full bg-foreground" />
          <li className="w-32 rounded border p-2 py-6 transition-colors duration-200 ease-in-out hover:border-foreground">
            <Link className="w-6" href="/products?category=usos&value=interior">
              <Armchair className="mx-auto size-10" />
              <P className={cn(quicksand.className, "mt-0 text-center text-lg leading-none")}>
                <span className="rounded px-2">Interiores</span>
              </P>
            </Link>
          </li>
          <div className="my-auto size-3 rounded-full bg-foreground" />
          <li className="w-32 rounded border p-2 py-6 transition-colors duration-200 ease-in-out hover:border-foreground">
            <Link className="w-6" href="/products?category=aplicaciones&value=mesadas-de-cocina">
              <ChefHat className="mx-auto size-10" />
              <P className={cn(quicksand.className, "mt-0 text-center text-lg leading-none")}>
                <span className="rounded px-2">Cocina</span>
              </P>
            </Link>
          </li>
          <div className="my-auto size-3 rounded-full bg-transparent" />
          <li className="w-32 rounded border p-2 py-6 transition-colors duration-200 ease-in-out hover:border-foreground">
            <Link className="w-6" href="/products?category=aplicaciones&value=mesadas-de-bano">
              <ShowerHead className="mx-auto size-10" />
              <P className={cn(quicksand.className, "mt-0 text-center text-lg leading-none")}>
                <span className="rounded px-2">Baño</span>
              </P>
            </Link>
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
          Algunos de nuestros productos mas solicitados
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
