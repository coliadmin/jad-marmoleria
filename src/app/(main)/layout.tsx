import "../globals.css";

import {Header} from "@/components/header";

export default function MainLayout({children}: {children: React.ReactNode}) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
