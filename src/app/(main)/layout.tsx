import {MainHeader} from "@/components/main-header";
import "../globals.css";

export default function MainLayout({children}: {children: React.ReactNode}) {
  return (
    <section>
      <MainHeader />
      {children}
    </section>
  );
}
