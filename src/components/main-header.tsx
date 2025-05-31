import {Link} from "next-view-transitions";
import {Instagram} from "lucide-react";

import {Whatsapp} from "./icons/whatsapp";
import {Highlight} from "./typo";
import Email from "./email";

import {cn, toWhatsAppUrl} from "@/lib/utils";
import {quicksand} from "@/fonts";
import {api} from "@/api";

export async function MainHeader() {
  const instagram = await api.instagram.get();
  const whatsapp = await api.whatsapp.get();
  const whatsAppUrl = toWhatsAppUrl(whatsapp.telefono);
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
        <div className="border-b-2 border-b-primary">{endTitle}</div>
      </span>
    );
  };

  return (
    <div className="h-auto w-full border-b bg-transparent">
      <header className="flex h-min w-full justify-center overflow-hidden md:pb-4">
        <nav
          className={cn(
            "mix-blend- relative flex w-full flex-1 flex-col items-center justify-center space-y-4 overflow-hidden transition-colors duration-200 ease-in-out",
          )}
        >
          <div
            className={cn(
              "m-auto hidden w-full bg-primary/90 py-1 text-sm font-medium text-white md:inline-flex",
              quicksand.className,
            )}
          >
            <div className="flex w-full items-center justify-evenly gap-10 md:max-w-5xl lg:mx-auto lg:max-w-[88rem]">
              <Link
                className="flex items-center gap-2"
                href={whatsAppUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Whatsapp className="mt-icon size-5" />
                <span className="tracking-widest"> +{whatsapp.telefono}</span>
              </Link>
              <span className="text-lg font-bold">•</span>
              <Link
                className="flex items-center gap-2"
                href={instagram.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Instagram className="mt-icon size-5" />
                <span className="tracking-widest">@{instagram.name}</span>
              </Link>
              <span className="text-lg font-bold">•</span>
              <Email email="jad.marmoleria@gmail.com" />
            </div>
          </div>
          <div className="relative flex w-full justify-evenly gap-6 px-2 md:max-w-5xl md:justify-start lg:mx-auto lg:max-w-[88rem] 2xl:p-0">
            <div className="flex items-center md:hidden">
              <Link
                className="group relative items-center"
                href={instagram.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Instagram className="mt-icon size-7" />
              </Link>
            </div>
            <div className="max-w-28">
              <Link prefetch href="/" scroll={false}>
                <img alt="logo JAD" src="/logo.svg" width="100px"></img>
              </Link>
            </div>
            <div className="flex items-center md:hidden">
              <Link
                className="group relative"
                href={whatsAppUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Whatsapp className="mt-icon size-7" />
              </Link>
            </div>
            <div
              className={cn(
                "hidden w-full items-end justify-end gap-6 font-semibold md:inline-flex lg:gap-10",
                quicksand.className,
              )}
            >
              <Link prefetch className="group relative" href="/" scroll={false}>
                <span className="tracking-widest sm:px-2">{header.home}</span>
                <div className="h-[0.15rem] w-full bg-transparent transition-colors duration-100 ease-in-out group-hover:bg-muted-foreground" />
              </Link>
              <Link prefetch className="group relative" href="/products">
                <span className="tracking-widest sm:px-2">{header.products}</span>
                <div className="h-[0.15rem] w-full bg-transparent transition-colors duration-100 ease-in-out group-hover:bg-muted-foreground" />
              </Link>
              <Link prefetch className="group relative" href="/projects">
                <span className="tracking-widest sm:px-2">{header.projects}</span>
                <div className="h-[0.15rem] w-full bg-transparent transition-colors duration-100 ease-in-out group-hover:bg-muted-foreground" />
              </Link>
            </div>
          </div>
          <div
            className={cn(
              "m-auto inline-flex w-full justify-center gap-6 bg-primary/90 py-2 font-semibold text-white md:hidden",
              quicksand.className,
            )}
          >
            <Link prefetch className="group relative" href="/" scroll={false}>
              <span className="tracking-widest sm:px-2">{header.home}</span>
              <div className="h-[0.15rem] w-full bg-transparent" />
            </Link>
            <span className="font-bold">•</span>
            <Link prefetch className="group relative" href="/products">
              <span className="tracking-widest sm:px-2">{header.products}</span>
              <div className="h-[0.15rem] w-full bg-transparent" />
            </Link>
            <span className="font-bold">•</span>
            <Link prefetch className="group relative" href="/projects">
              <span className="tracking-widest sm:px-2">{header.projects}</span>
              <div className="h-[0.15rem] w-full bg-transparent" />
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}
