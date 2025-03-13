import type {Product} from "@/modules/product";

import {Link} from "next-view-transitions";
import {Armchair, ChefHat, Feather, Flame, ShowerHead} from "lucide-react";

import {H2, P} from "@/components/typo";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {quicksand} from "@/fonts";

type ProductArticleProps = {
  product: Product;
  children?: React.ReactNode;
};

export function ProductArticle({product, children}: ProductArticleProps) {
  return (
    <article className="border-e border-s">
      <header className="flex justify-center gap-4 border-b">
        <H2 className="border-none py-6 text-4xl">{product.nombre}</H2>
      </header>
      <div className="inline-flex w-full gap-20 px-6 py-6">
        {children}
        <div className="mx-auto max-w-2xl flex-1 space-y-6 ">
          {/* <P className="text-xl font-medium">
            {product.nombre} - {product.publishedAt}
          </P> */}
          <P className="text-pretty">{product.descripcion}</P>
          <div className="space-y-3 text-muted-foreground">
            <P className="w-72 rounded bg-muted px-6">
              <span className="font-medium">Espesor: </span> {product.espesor}
            </P>
            <P className="w-72 rounded bg-muted px-6">
              <span className="font-medium">Uso: </span>
              {product.usos!.map((uso) => (
                <span key={uso.id} className="pr-3">
                  {uso.nombre}
                </span>
              ))}
            </P>
            <P className="w-72 rounded bg-muted px-6">
              <span className="font-medium">Disponibilidad: </span>
              {product.disponibilidad ? "sin stock" : "en stock"}
            </P>
          </div>
          <div className="inline-flex w-full justify-between">
            <ul className="flex max-w-md flex-wrap gap-4">
              <li className="w-32 rounded border p-2 py-6 transition-colors duration-200 ease-in-out hover:border-foreground">
                <Link className="m-auto" href="/products?category=usos&value=exterior">
                  <Feather className="mx-auto size-8" />
                  <P className={cn(quicksand.className, "mt-0 text-center text-lg leading-none")}>
                    <span className="rounded px-2">Exteriores</span>
                  </P>
                </Link>
              </li>
              <li className="w-32 rounded border p-2 py-6 transition-colors duration-200 ease-in-out hover:border-foreground">
                <Link className="w-6" href="/products?category=usos&value=interior">
                  <Armchair className="mx-auto size-8" />
                  <P className={cn(quicksand.className, "mt-0 text-center text-lg leading-none")}>
                    <span className="rounded px-2">Interiores</span>
                  </P>
                </Link>
              </li>
              <li className="w-32 rounded border p-2 py-6 transition-colors duration-200 ease-in-out hover:border-foreground">
                <Link
                  className="w-6"
                  href="/products?category=aplicaciones&value=mesadas-de-cocina"
                >
                  <ChefHat className="mx-auto size-8" />
                  <P className={cn(quicksand.className, "mt-0 text-center text-lg leading-none")}>
                    <span className="rounded px-2">Cocina</span>
                  </P>
                </Link>
              </li>
              <li className="w-32 rounded border p-2 py-6 transition-colors duration-200 ease-in-out hover:border-foreground">
                <Link className="w-6" href="/products?category=aplicaciones&value=mesadas-de-bano">
                  <ShowerHead className="mx-auto size-8" />
                  <P className={cn(quicksand.className, "mt-0 text-center text-lg leading-none")}>
                    <span className="rounded px-2">Baño</span>
                  </P>
                </Link>
              </li>
              <li className="w-32 rounded border p-2 py-6 transition-colors duration-200 ease-in-out hover:border-foreground">
                <Link className="w-6" href="/products?categories=exteriores">
                  <Flame className="mx-auto size-8" />
                  <P className={cn(quicksand.className, "mt-0 text-center text-lg leading-none")}>
                    <span className="rounded px-2">Resistente al calor</span>
                  </P>
                </Link>
              </li>
            </ul>
            <footer className="self-end">
              <div className="flex justify-end py-6">
                <Button className="btn btn-primary">Sacate las dudas</Button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </article>
  );
}
