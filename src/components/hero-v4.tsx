import {Link} from "next-view-transitions";

import {H1, Highlight, P} from "./typo";
import {Whatsapp} from "./icons/whatsapp";

import {HeaderV2} from "@/components/header-v2";
import {getHero} from "@/modules/content/hero";
import {Button} from "@/components/ui/button";
import {cn, toWhatsAppUrl} from "@/lib/utils";
import {quicksand} from "@/fonts";
import {api} from "@/api";

export async function HeroV4() {
  const {titulo, descripcion, imagenes} = await getHero();

  const whatsapp = await api.whatsapp.get();

  const whatsAppUrl = toWhatsAppUrl(whatsapp.telefono);

  const startH = titulo.indexOf("{");
  const endH = titulo.indexOf("}");

  const h = titulo.substring(startH + 1, endH);

  const startTitle = titulo.split("{")[0];
  const endTitle = titulo.split("}")[1];

  const titleComponent = () => {
    return (
      <span className="text-pretty font-bold leading-[4rem]">
        {startTitle} <Highlight>{h}</Highlight> {endTitle}
      </span>
    );
  };

  return (
    <section className="relative flex h-screen w-full flex-col ">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/image.png')`,
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>
      <HeaderV2 />
      <div className="flex w-full flex-1 justify-end p-8">
        <div className="flex max-w-lg flex-col justify-center">
          <H1>{titleComponent()}</H1>
          <P className={cn("text-xl text-accent-foreground", quicksand.className)}>{descripcion}</P>
          <div className="mt-8 inline-flex gap-2">
            <Link
              className="flex items-center gap-2"
              href={whatsAppUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button className="w-48">
                Contactanos
                <Whatsapp className="size-7" />
              </Button>
            </Link>
            <Link prefetch href="/products">
              <Button variant="outline">Ver catálogo</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
