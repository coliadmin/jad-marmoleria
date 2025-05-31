import Link from "next/link";
import {ArrowUpRight, ChevronDownIcon} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";

import {api} from "@/api";
import {H2, P} from "@/components/typo";
import {ProductLink} from "@/modules/product";
import {cn} from "@/lib/utils";
import {quicksand} from "@/fonts";
import {IconLink} from "@/components/icon-link";
import {IconNames} from "@/components/icons";
import {Categories} from "@/modules/categories/enum";

export default async function HomePage() {
  const prds = await api.products.getList();
  const products = prds.slice(0, 3);
  const usos = await api.uses.getList();
  const aplications = await api.aplications.getList();
  const faqs = await api.faqs.getList();

  return (
    <section className="m-auto px-1 md:px-0 mx-auto">
      <div className="m-auto max-w-5xl">
        <H2 className={cn("mb-8 border-none text-center leading-[3.2rem]")}>
          <div className="space-x-4">
            <span className="text-lg">⭐</span>
            <span className="text-2xl">⭐</span>
            <span>⭐</span>
            <span className="text-2xl">⭐</span>
            <span className="text-lg">⭐</span>
          </div>
          Encontrá el marmol que buscas según tus necesidades
        </H2>
        <ul className="mx-auto flex max-w-xl flex-wrap justify-evenly gap-8">
          {usos.map((uso) => (
            <li
              key={uso.id}
              className="flex w-32 items-center justify-center rounded border p-2 py-4 transition-colors duration-200 ease-in-out hover:border-foreground"
            >
              <IconLink
                href={`/products?category=${Categories.USE}&value=${uso.slug}`}
                icon={uso.slug as IconNames}
                iconName={uso.nombre}
              />
            </li>
          ))}
          {aplications.map((aplication) => (
            <li
              key={aplication.id}
              className="flex w-32 items-center justify-center rounded border p-2 py-4 transition-colors duration-200 ease-in-out hover:border-foreground"
            >
              <IconLink
                href={`/products?category=${Categories.APLICATION}&value=${aplication.slug}`}
                icon={aplication.slug as IconNames}
                iconName={aplication.nombre}
              />
            </li>
          ))}
          <li className="flex w-32 items-center justify-center rounded border p-2 py-4 transition-colors duration-200 ease-in-out hover:border-foreground">
            <Link prefetch className="space-y-2" href="/products">
              <span className="mt-icon flex justify-center">
                <ArrowUpRight />
              </span>
              <p className="text-center text-lg">Ver todos</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className="m-auto mt-24 max-w-5xl">
        <H2 className="mb-8 border-none leading-[3.2rem] text-center">
          Algunos de nuestros productos más solicitados
        </H2>
        <ul className="flex flex-wrap justify-center gap-8 pb-12 lg:justify-between">
          {products.map((product) => (
            <li key={product.id} className="inline-flex">
              <ProductLink className="w-vertical" product={product} />
            </li>
          ))}
        </ul>
      </div>
      <div className="m-auto mt-24 max-w-3xl py-16">
        <H2 className="mb-14 border-none text-center">Preguntas Frecuentes</H2>
        <ul className="flex max-w-3xl flex-col gap-12 px-8">
          {faqs.map((faq) => (
            <li key={faq.id} className="border-b">
              <Accordion collapsible defaultValue={faq.id} type="single">
                <AccordionItem value={faq.id}>
                  <AccordionTrigger className="group mb-4 flex w-full justify-between text-start font-medium">
                    ¿{faq.titulo}?
                    <ChevronDownIcon className="stroke-1 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </AccordionTrigger>
                  <AccordionContent className="mb-2">{faq.respuesta}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
