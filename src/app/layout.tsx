import type {Metadata} from "next";

import "./globals.css";

import {ViewTransitions} from "next-view-transitions";

import {montserrat} from "@/fonts";
import {cn} from "@/lib/utils";
import { getMeta } from "../../public/assets/meta";

export async function generateMetadata(){
  const meta = await getMeta();

  return meta;
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <ViewTransitions>
      <html className="w-full scroll-smooth" lang="es">
        <head>
          <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        </head>
        <body className="w-full border-border bg-slate-50 text-foreground scrollbar">
          <div
            className={cn(
              montserrat.className,
              "relative grid min-h-[100dvh] w-full grid-rows-[auto,1fr] antialiased",
            )}
          >
            <main>{children}</main>
            {/* <div className="border-t">
            <ColiFooter />
          </div> */}
          </div>
        </body>
      </html>
    </ViewTransitions>
  );
}
