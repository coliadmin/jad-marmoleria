import {HomeHeader} from "./home-header";
import {H3} from "./typo";

import {getHero} from "@/modules/content/hero";

export async function HeroV4() {
  const {imagenes} = await getHero();
  const p1 = imagenes[3];
  const p2 = imagenes[4];
  const p3 = imagenes[5];

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 grid h-full w-full gap-[2px] md:grid-cols-2 xl:grid-cols-3">
        <div className="relative hidden md:block">
          <img alt={p1.name} className="h-full w-full object-cover" src={p1.url} />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <H3 className="absolute bottom-14 text-xl font-medium right-10 text-muted drop-shadow-md">
            {p1.name.split("(")[0]}
          </H3>
        </div>
        <div className="relative">
          <img alt={p2.name} className="h-full w-full object-cover" src={p2.url} />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <H3 className="absolute bottom-14 text-xl right-10 font-medium hidden text-muted drop-shadow-md md:block">
            {p2.name.split("(")[0]}
          </H3>
        </div>
        <div className="relative hidden xl:block">
          <img alt={p3.name} className="h-full w-full object-cover" src={p3.url} />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <H3 className="absolute bottom-14 right-10 text-xl font-medium text-muted drop-shadow-md">
            {p3.name.split(".")[0]}
          </H3>
        </div>
      </div>
      <div className="relative z-10 flex h-full flex-col justify-between">
        <HomeHeader />
      </div>
    </section>
  );
}
