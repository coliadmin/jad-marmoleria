import type {Product} from "@/modules/product";

import {Link} from "next-view-transitions";
import {ChevronDown, ChevronLeft} from "lucide-react";

import {H2, P} from "@/components/typo";
import {Button} from "@/components/ui/button";
import {cn, toWhatsAppUrl} from "@/lib/utils";
import {Whatsapp} from "@/components/icons/whatsapp";
import {IconLink} from "@/components/icon-link";
import {IconNames} from "@/components/icons";
import {NavProductButton} from "@/components/nav-button";
import {api} from "@/api";

type ProductArticleProps = {
  product: Product;
  children?: React.ReactNode;
  nextProduct?: Product;
};

export async function ProductArticle({product, children, nextProduct}: ProductArticleProps) {
  const whatsapp = await api.whatsapp.get();
  const whatsAppUrl = toWhatsAppUrl(whatsapp.telefono);

  return (
    <article className="lg:border-e lg:border-s">
      <header className="relative flex items-center border-b">
        <Link
          prefetch
          className={cn(
            "group absolute left-0 inline-flex items-center gap-1 px-2 text-sm font-normal text-slate-800/65 hover:underline",
          )}
          href="/products"
        >
          <ChevronLeft className="ms-2 mt-icon size-4 stroke-1 transition-all duration-100 ease-in-out group-hover:inline-block group-hover:text-foreground" />
          Atrás
        </Link>
        <H2 className="ml-6 flex-grow border-none py-6 text-center text-4xl sm:ml-0">
          {product.nombre}
        </H2>
      </header>
      <div className="flex w-full flex-col items-center gap-y-6 pt-4 lg:hidden">
        <div className="flex w-full justify-between px-4">
          <NavProductButton
            className={cn(
              "w-auto text-base font-normal text-slate-800/80 hover:bg-transparent hover:underline",
            )}
            mode="back"
            variant="leftString"
          />
          <NavProductButton
            className={cn(
              "w-auto text-base font-normal text-slate-800/80 hover:bg-transparent hover:underline",
            )}
            mode="path"
            path={nextProduct?.slug}
            variant="rightString"
          />
        </div>
        <Link href={whatsAppUrl} rel="noopener noreferrer" target="_blank">
          <Button className="btn btn-primary ">
            Sacate las dudas
            <Whatsapp className="size-5" />
          </Button>
        </Link>
        <Link
          className="inline-flex items-center text-sm font-normal text-slate-800/65"
          href="#descripcion"
        >
          Más información
          <ChevronDown className="ms-1 size-4 stroke-1" />
        </Link>
      </div>
      <div className="m-auto w-full gap-20 px-6 py-6 lg:inline-flex">
        {children}
        <div className="mx-auto max-w-2xl flex-1 space-y-6 pt-6 lg:pt-0" id="descripcion">
          <P className="text-pretty">{product.descripcion}</P>
          <div className="space-y-3 text-muted-foreground">
            <P className="w-72 rounded bg-muted px-6">
              <span className="font-medium">Espesor: </span> {product.espesor}
            </P>
            <P className="w-72 rounded bg-muted px-6">
              <span className="font-medium">Material: </span>
              {product.material.nombre}
            </P>
            <P className="w-72 rounded bg-muted px-6">
              <span className="font-medium">Disponibilidad: </span>
              {product.disponibilidad ? "sin stock" : "en stock"}
            </P>
          </div>
          <div className="inline-flex w-full flex-col justify-between space-y-6">
            <ul className="flex flex-wrap gap-4 lg:max-w-md">
              {product.usos!.map((uso) => (
                <li
                  key={uso.id}
                  className="size-32 rounded border p-2 py-4 transition-colors duration-200 ease-in-out hover:border-foreground"
                >
                  <IconLink
                    href={`/products?category=usos&value=${uso.slug}`}
                    icon={uso.slug as IconNames}
                    iconName={uso.nombre}
                  />
                </li>
              ))}

              {product.aplicaciones!.map((aplic) => (
                <li
                  key={aplic.id}
                  className="size-32 rounded border p-2 py-4 transition-colors duration-200 ease-in-out hover:border-foreground"
                >
                  <IconLink
                    href={`/products?category=aplicaciones&value=${aplic.slug}`}
                    icon={aplic.slug as IconNames}
                    iconName={aplic.nombre}
                  />
                </li>
              ))}
            </ul>
            <footer className="self-center lg:self-end">
              <div className="flex justify-end py-6">
                <Link
                  className="group relative flex items-center gap-2"
                  href={whatsAppUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Button className="btn btn-primary">
                    Sacate las dudas
                    <Whatsapp className="size-5" />
                  </Button>
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </article>
  );
}
