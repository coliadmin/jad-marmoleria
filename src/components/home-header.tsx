import {Link} from "next-view-transitions";
import {ChevronDown, Instagram} from "lucide-react";

import {Whatsapp} from "./icons/whatsapp";
import {Highlight} from "./typo";

import {cn, toWhatsAppUrl} from "@/lib/utils";
import {quicksand} from "@/fonts";
import {api} from "@/api";

export async function HomeHeader() {
  const instagram = await api.instagram.get();
  const whatsapp = await api.whatsapp.get();
  const whatsAppUrl = toWhatsAppUrl(whatsapp);
  const header = await api.header.get();

  const startH = header.title.indexOf("{");
  const endH = header.title.indexOf("}");

  const h = header.title.substring(startH + 1, endH);

  const startTitle = header.title.split("{")[0];
  const endTitle = header.title.split("}")[1];

  const titleComponent = () => {
    return (
      <span className="flex gap-2 text-center text-4xl font-bold">
        {startTitle} <Highlight>{h}</Highlight>
        <div className="border-b-2 border-b-muted">{endTitle}</div>
      </span>
    );
  };

  return (
    <div className="flex w-full flex-1 flex-col justify-between bg-transparent">
      <header className="flex h-min w-full justify-center overflow-hidden pb-4">
        <nav
          className={cn(
            "relative flex w-full flex-1 flex-col items-center justify-center space-y-6 overflow-hidden text-white transition-colors duration-200 ease-in-out",
          )}
        >
          <div
            className={cn(
              "m-auto hidden w-full justify-center bg-primary/10 py-2 font-semibold backdrop-blur md:inline-flex",
              quicksand.className,
            )}
          >
            <div className="ml-2 flex w-full justify-start gap-4 sm:justify-center sm:gap-10 md:gap-16">
              <Link prefetch className="group relative" href="/" scroll={false}>
                <span className="tracking-widest sm:px-2">{header.home}</span>
                <div className="h-[0.15rem] w-full bg-transparent transition-colors duration-100 ease-in-out group-hover:bg-muted" />
              </Link>
              <span className="font-bold">•</span>
              <Link prefetch className="group relative" href="/products">
                <span className="tracking-widest sm:px-2">{header.products}</span>
                <div className="h-[0.15rem] w-full bg-transparent transition-colors duration-100 ease-in-out group-hover:bg-muted" />
              </Link>
              <span className="font-bold">•</span>
              <Link prefetch className="group relative" href="/projects">
                <span className="tracking-widest sm:px-2">{header.projects}</span>
                <div className="h-[0.15rem] w-full bg-transparent transition-colors duration-100 ease-in-out group-hover:bg-muted" />
              </Link>
            </div>
            <div className="absolute end-2 flex w-fit gap-4 self-center sm:end-4">
              <Link
                className="group relative"
                href={instagram.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Instagram className="mt-icon size-5" />
              </Link>
              <Link
                className="group relative"
                href={whatsAppUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Whatsapp className="mt-icon size-5" />
              </Link>
            </div>
          </div>
          <Link prefetch href="/" scroll={false}>
            <img alt="logo JAD" className="m-auto z-50 object-contain aspect-square p-1" src="logo.png"></img>
          </Link>
        </nav>
      </header>
      <footer className="mb-8 w-full md:hidden">
        <nav className="h-min w-full space-y-6 text-white transition-colors duration-200 ease-in-out">
          <div
            className={cn(
              "m-auto flex w-full justify-evenly py-2 font-semibold",
              quicksand.className,
            )}
          >
            <Link prefetch className="group relative backdrop-blur" href="/products">
              <span className="text-2xl tracking-widest sm:px-2">{header.products}</span>
              <div className="h-[0.15rem] w-full border-b-2 border-b-muted bg-transparent" />
            </Link>
            <Link prefetch className="group relative backdrop-blur" href="/projects">
              <span className="text-2xl tracking-widest sm:px-2">{header.projects}</span>
              <div className="h-[0.15rem] w-full border-b-2 border-b-muted bg-transparent" />
            </Link>
          </div>
          <div className="flex justify-center">
            <Link className="rounded-full border border-muted/30" href="#home">
              <ChevronDown className="mt-icon size-8 stroke-muted/70 stroke-1" />
            </Link>
          </div>
        </nav>
      </footer>
    </div>
  );
}
