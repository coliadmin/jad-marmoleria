import {H3} from "./typo";
import {HomeHeader} from "./home-header";

import {getHero} from "@/modules/content/hero";

export async function HeroV4() {
  const {imagenes} = await getHero();
  const p1 = imagenes[3];
  const p2 = imagenes[4];
  const p3 = imagenes[5];

  return (
    <section className="relative flex h-[100svh] w-full flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 -z-10 grid h-full gap-1 md:grid-cols-2 xl:grid-cols-3">
        <div className="relative hidden md:inline-flex">
          <img alt={p1.name} className="h-full w-full object-cover" src={p1.url} />
          <div className="absolute bottom-0 left-0 right-0 z-0 h-28 bg-gradient-to-t from-zinc-900/65 via-zinc-900/30 to-transparent" />
          <H3 className="absolute bottom-14 right-10 z-10 border-b border-b-border text-muted drop-shadow-md">
            {p1.name.split("(")[0]}{" "}
          </H3>
        </div>
        <div className="relative">
          <img alt={p2.name} className="h-full object-cover" src={p2.url} />
          <div className="absolute bottom-0 left-0 right-0 z-0 h-28 bg-gradient-to-t from-zinc-900/65 via-zinc-900/30 to-transparent" />
          <H3 className="absolute bottom-14 right-10 z-10 hidden border-b border-b-border text-muted drop-shadow-md md:block">
            {p2.name.split("(")[0]}{" "}
          </H3>
        </div>
        <div className="relative hidden xl:inline-flex">
          <img alt={p3.name} className="h-full object-cover" src={p3.url} />
          <div className="absolute bottom-0 left-0 right-0 z-0 h-28 bg-gradient-to-t from-zinc-900/65 via-zinc-900/30 to-transparent" />
          <H3 className="absolute bottom-14 right-10 z-10 border-b border-b-border text-muted drop-shadow-md">
            {p3.name.split(".")[0]}{" "}
          </H3>
        </div>
      </div>
      <HomeHeader />
    </section>
  );
}
