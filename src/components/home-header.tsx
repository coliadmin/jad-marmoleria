import {Link} from "next-view-transitions";
import {Instagram} from "lucide-react";

import {Whatsapp} from "./icons/whatsapp";
import {Highlight} from "./typo";

import {cn, toWhatsAppUrl} from "@/lib/utils";
import {quicksand} from "@/fonts";
import {api} from "@/api";

export async function HomeHeader() {
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
        <div className="border-b-2 border-b-muted">{endTitle}</div>
      </span>
    );
  };

  return (
    <div className="md:h-auto h-full w-full flex flex-col justify-between bg-transparent">
      <header className="flex h-min w-full justify-center overflow-hidden pb-4">
        <nav
          className={cn(
            "relative flex w-full flex-1 flex-col items-center justify-center space-y-6 overflow-hidden text-white transition-colors duration-200 ease-in-out",
          )}
        >
          <div
            className={cn(
              "m-auto w-full hidden md:inline-flex justify-center bg-primary/10 py-2 font-semibold backdrop-blur",
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
          <Link prefetch className={cn("max-w-fit backdrop-blur")} href="/" scroll={false}>
            {titleComponent()}
          </Link>
        </nav>
      </header>
      <footer className="md:hidden pb-4 w-full">
        <nav className="flex w-full text-white bottom-0 h-min left-0 right-0 transition-colors duration-200 ease-in-out">
          <div className={cn(
              "m-auto w-full flex justify-evenly py-2 font-semibold",
              quicksand.className,
            )}>
              <Link prefetch className="group relative" href="/products">
                <span className="tracking-widest text-xl sm:px-2">{header.products}</span>
                <div className="h-[0.15rem] w-full bg-transparent transition-colors duration-100 ease-in-out group-hover:bg-muted" />
              </Link>
              <Link prefetch className="group relative" href="/projects">
                <span className="tracking-widest text-xl sm:px-2">{header.projects}</span>
                <div className="h-[0.15rem] w-full bg-transparent transition-colors duration-100 ease-in-out group-hover:bg-muted" />
              </Link>
          </div>
        </nav>
      </footer>
    </div>
  );
}
