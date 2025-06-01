import { Link } from "next-view-transitions";
import {HomeHeader} from "./home-header";
import {H3} from "./typo";

import {getHero} from "@/modules/content/hero";

export async function HeroV4() {
  const hero = await getHero();

  const imagenCentro = {img: hero.imagenCentro.url, link: {name: hero.linkImagenCentro.name, url: hero.linkImagenCentro.url}}
  const imagenIzquierda = {img: hero.imagenIzquierda.url, link: {name: hero.linkImagenIzquierda.name, url: hero.linkImagenIzquierda.url}}
  const imagenDerecha = {img: hero.imagenDerecha.url, link: {name: hero.linkImagenDerecha.name, url: hero.linkImagenDerecha.url}}

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 grid h-full w-full gap-[2px] md:grid-cols-2 xl:grid-cols-3">
        <div className="relative hidden md:block">
          <img alt={imagenIzquierda.link.name} className="h-full w-full object-cover" src={imagenIzquierda.img} />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <H3 className="absolute bottom-14 text-xl font-medium right-10 text-muted drop-shadow-md">
            <Link prefetch href={imagenIzquierda.link.url}>
              {imagenIzquierda.link.name}
            </Link>
          </H3>
        </div>
        <div className="relative">
          <img alt={imagenCentro.link.name} className="h-full w-full object-cover" src={imagenCentro.img} />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <H3 className="absolute bottom-14 text-xl right-10 font-medium hidden text-muted drop-shadow-md md:block">
            <Link prefetch href={imagenCentro.link.url}>
              {imagenCentro.link.name}
            </Link>
          </H3>
        </div>
        <div className="relative hidden xl:block">
          <img alt={imagenDerecha.link.name} className="h-full w-full object-cover" src={imagenDerecha.img} />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            <Link prefetch href={imagenDerecha.link.url}>
              <H3 className="absolute bottom-14 right-10 text-xl font-medium text-muted drop-shadow-md">
                  {imagenDerecha.link.name}
              </H3>
            </Link>
        </div>
      </div>
      <div className="relative z-10 flex h-full flex-col justify-between">
        <HomeHeader />
      </div>
    </section>
  );
}
