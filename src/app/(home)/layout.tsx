import "../globals.css";

import {HeroV4} from "@/components/hero-v4";

export default function HomeLayout({children}: {children: React.ReactNode}) {
  return (
    <main className="w-full">
      <HeroV4 />
      <section className="mt-8 w-full">{children}</section>
    </main>
  );
}
