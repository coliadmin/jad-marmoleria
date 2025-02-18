import {Instagram} from "lucide-react";
import {Link} from "next-view-transitions";

import {H1, P} from "./typo";
import {Whatsapp} from "./icons/whatsapp";

import {api} from "@/api";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {quicksand} from "@/fonts";

type HeroProps = {
  title: string | React.ReactNode;
  subtitle: string;
};

export async function Hero({title, subtitle}: HeroProps) {
  const products = await api.products.get();

  const p1 = products.data[0].portada;
  const p2 = products.data[1].portada;
  const p3 = products.data[2].portada;

  const first = p1.url;
  const second = p2.url;
  const third = p3.url;

  return (
    <section className="mb-8 inline-flex h-[750px] w-full justify-center">
      <div className="max-w-[52rem] flex-1">
        <div className="relative inline-flex gap-2">
          <div className={cn("absolute -z-20 h-[600px] w-[300px] rounded bg-blue-200")}>
            <img alt={p2.name} className="h-full rounded object-cover" src={first} />
          </div>
          <div className="absolute left-60 top-10 -z-10 h-[600px] w-[300px] rounded bg-blue-400">
            <img alt={p1.name} className="h-full rounded object-cover" src={third} />
          </div>
          <div className="absolute left-[30rem] top-20 z-0 h-[600px] w-[300px] rounded bg-blue-600">
            <img alt={p3.name} className="h-full rounded object-cover" src={second} />
          </div>
        </div>
      </div>
      <div className="max-w-lg pt-36">
        <H1 className="">{title}</H1>
        <P className={cn("text-xl text-muted-foreground", quicksand.className)}>{subtitle}</P>
        <div className="mt-8 inline-flex gap-2">
          <Button className="w-48 ">Contactanos</Button>
          <Button variant="outline">
            <Link href="/products">Ver catálogo</Link>
          </Button>
        </div>
        <div className="mt-2 inline-flex w-full gap-2">
          <Link href="https://www.instagram.com/jad.marmoleria/" target="_blank">
            <Instagram className="size-7" />
          </Link>
          <Link href="#" target="_blank">
            <Whatsapp className="size-7" />
          </Link>
        </div>
      </div>
    </section>
  );
}
