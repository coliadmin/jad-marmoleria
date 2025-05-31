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
  const whatsAppUrl = toWhatsAppUrl(whatsapp);
  const header = await api.header.get();
  const global = await api.global.get();

  const hex = global.accentColor;

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
              "m-auto hidden w-full py-1 text-sm font-medium text-foreground md:inline-flex",
              quicksand.className,
            )}
            style={{backgroundColor: hex}}
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
          <div className="relative flex w-full items-center md:items-end px-2 md:max-w-5xl md:justify-start lg:mx-auto lg:max-w-[88rem] 2xl:p-0">
            <div className="flex items-center w-full md:hidden">
              <Link
                className="w-full h-full"
                href={instagram.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Instagram className="mt-icon m-auto size-7" />
              </Link>
            </div>
            <div className="w-full max-w-28">
              <Link prefetch href="/" scroll={false}>
                <img alt="logo JAD" src="/logo.svg" width="100px"></img>
              </Link>
            </div>
            <div className="flex items-center w-full md:hidden">
              <Link
                className="w-full h-full"
                href={whatsAppUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Whatsapp className="mt-icon m-auto size-7" />
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
              "m-auto inline-flex w-full justify-center gap-6 py-2 font-semibold text-foreground md:hidden",
              quicksand.className,
            )}
            style={{backgroundColor: hex}}
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
