import "../globals.css";

import {HeroV4} from "@/components/hero-v4";

export default function HomeLayout({children}: {children: React.ReactNode}) {
  return (
    <section className="space-y-8">
      <HeroV4 />
      {children}
    </section>
  );
}
