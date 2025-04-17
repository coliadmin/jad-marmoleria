import {Link} from "next-view-transitions";
import {ArrowLeft, ArrowUpRight} from "lucide-react";

import {H1, H3, Highlight} from "@/components/typo";
import {Button} from "@/components/ui/button";
import {RelatedProducts} from "@/modules/product";
import {api} from "@/api";
import {Separator} from "@/components/ui/separator";

export default async function Custom404() {
  const {data} = await api.products.get();
  const products = data.slice(0, 2);

  return (
    <section className="mx-20 mt-12 grid h-full place-content-center xl:mt-0">
      <section className="flex flex-col items-start xl:flex-row xl:items-center">
        <section className="flex w-full flex-col gap-14 pb-8 pr-8 text-start xl:max-w-xl">
          <H1 className="font-semibold">
            Error <Highlight>404</Highlight>
          </H1>
          <H3 className="text-balance font-medium">
            La página que has tratado de acceder no existe o ha sido eliminada.
          </H3>
          <Link prefetch href="/">
            <Button className="text-base" variant="outline">
              <ArrowLeft />
              Volver a la Home
            </Button>
          </Link>
        </section>
        <Separator
          className="hidden bg-gradient-to-b from-muted via-border to-muted xl:block"
          orientation="vertical"
        />
        <Separator
          className="bg-gradient-to-b from-muted via-border to-muted xl:hidden"
          orientation="horizontal"
        />
        <section className="mt-16 w-full xl:ml-28">
          <Link prefetch className="xl:hidden" href="/products">
            <Button className="text-base" variant="outline">
              Ver todos
              <ArrowUpRight />
            </Button>
          </Link>
          <H3 className="my-6 text-start text-2xl font-medium">
            Productos que podrían interesarte
          </H3>
          <RelatedProducts products={products} />
          <Link prefetch className="hidden xl:block" href="/products">
            <Button className="text-base" variant="outline">
              Ver todos
              <ArrowUpRight />
            </Button>
          </Link>
        </section>
      </section>
    </section>
  );
}
