import {Link} from "next-view-transitions";
import {Instagram} from "lucide-react";

import {Whatsapp} from "./icons/whatsapp";

import {cn, toWhatsAppUrl} from "@/lib/utils";
import {quicksand} from "@/fonts";
import {getInstagram} from "@/modules/content/instagram";
import {getWhatsApp} from "@/modules/content/whatsapp/api";
import {getHeader} from "@/modules/content/header";

export async function Header() {
  const instagram = await getInstagram();
  const {data: whatsapp} = await getWhatsApp();
  const whatsAppUrl = toWhatsAppUrl(whatsapp.telefono);
  const {data: header} = await getHeader();

  return (
    <div className="h-auto w-full border-b">
      <header className="flex h-min w-full justify-center overflow-hidden px-4 py-3 backdrop-blur md:px-12 lg:px-28">
        <nav
          className={cn(
            "relative flex max-w-5xl flex-1 flex-col justify-center overflow-hidden rounded p-0 py-1",
          )}
        >
          <Link prefetch className={cn("mb-4 text-center text-3xl font-bold")} href="/">
            {header.title}
          </Link>
          <div
            className={cn(
              "m-auto inline-flex w-full max-w-3xl justify-center gap-2 rounded py-1 font-semibold md:gap-4",
              quicksand.className,
            )}
          >
            <Link prefetch className="group relative" href="/">
              <span className="px-2 tracking-widest">{header.home}</span>
              <div className="h-[0.15rem] w-full bg-transparent transition-colors duration-100 ease-in-out group-hover:bg-amber-400/65" />
            </Link>
            <Link prefetch className="group relative" href="/products">
              <span className="px-2 tracking-widest">{header.products}</span>
              <div className="h-[0.15rem] w-full bg-transparent transition-colors duration-100 ease-in-out group-hover:bg-amber-400/65" />
            </Link>
            <Link prefetch className="group relative" href="/projects">
              <span className="px-2 tracking-widest">{header.projects}</span>
              <div className="h-[0.15rem] w-full bg-transparent transition-colors duration-100 ease-in-out group-hover:bg-amber-400/65" />
            </Link>
            <Link
              className="group relative"
              href={instagram.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Instagram className="size-5" />
            </Link>
            <Link
              className="group relative"
              href={whatsAppUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Whatsapp className="size-5" />
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}
