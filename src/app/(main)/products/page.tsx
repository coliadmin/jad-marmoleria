import type {Aplication} from "@/modules/categories/aplication";
import type {Use} from "@/modules/categories/use";
import type {Material} from "@/modules/categories/material";
import type {Color} from "@/modules/categories/color/types";

import {Link} from "next-view-transitions";
import {ScrollArea} from "@radix-ui/react-scroll-area";
import {X} from "lucide-react";

import {api} from "@/api";
import {ProductLink} from "@/modules/product";
import {H2, H3, H4} from "@/components/typo";
import {Categories} from "@/modules/categories/enum";
import {FilterLink} from "@/components/filter-link";
import {query, CategoryCommons, categoryXPlural, Data} from "@/lib/strapi";
import {capitalize, cn} from "@/lib/utils";
import {ScrollBar} from "@/components/ui/scroll-area";
import { getMeta } from "../../../../public/assets/meta";

import { FiltersMobile } from "@/components/filters-mobile";


type Props = {
  searchParams: {
    slug?: string | null;
    color?: string | null;
    usos?: string | null;
    material?: string | null;
    aplicaciones?: string | null;
  };
};

interface Filters {
  title: string;
  slug: string;
  category: Color[] | Aplication[] | Material[] | Use[];
}

async function getFilters() {
  const colors = await api.colors.getList();
  const uses = await api.uses.getList();
  const materials = await api.materials.getList();
  const aplications = await api.aplications.getList();

  const filters: Filters[] = [
    {
      title: "Color",
      slug: Categories.COLOR,
      category: colors,
    },
    {
      title: "Uso",
      slug: Categories.USE,
      category: uses,
    },
    {
      title: "Material",
      slug: Categories.MATERIAL,
      category: materials,
    },
    {
      title: "Aplicación",
      slug: Categories.APLICATION,
      category: aplications,
    },
  ];

  return filters;
}

export async function generateMetadata() {
  const header = await api.header.get();
  const meta = await getMeta();

  return {
    title: meta.title + " - " + header.products,
    openGraph: {
      title: meta.openGraph?.title + " - " + header.products,
      url: "/products",
    },
  }
};

export default async function ProductsPage({searchParams: { 
  slug = null,
  color = null,
  usos = null,
  material = null,
  aplicaciones = null}}: Props) {
    
  const products = await api.products.getList();
  const filterProds = await api.products.getByCategory({slug, color, usos, material, aplicaciones});
  const filters = await getFilters();
  const global = await api.global.get();
  const isFiltered = !!(slug || color || usos || material || aplicaciones);
  const hex = global.accentColor;

  return (
    <section className="mx-auto flex w-full flex-col overflow-hidden border-e border-s  md:max-w-5xl lg:mx-auto lg:max-w-[88rem] lg:flex-row">
      <aside className="flex w-full  flex-col pt-6 lg:h-full lg:w-[250px] lg:py-6">
        <div className="mb-2 flex gap-4 lg:mb-0 lg:w-auto lg:justify-between lg:gap-0">
          <H3 className="ml-3">Filtros</H3>
          <div className="my-auto px-2 text-sm font-normal text-slate-800/65">
            <p className={cn("block ", (isFiltered && "hidden"))}>
              Sin filtros activos
            </p>
            <Link
              prefetch
              className={cn(
                "hidden gap-2 rounded-e-full hover:underline",
                (isFiltered && "inline-flex"),
              )}
              href="/products"
            >
              Limpiar filtros
              <X className="mt-icon size-3 self-center" />
            </Link>
          </div>
        </div>
        <div className="block w-full border-b border-t lg:hidden">
          <div className="w-full max-w-md sm:max-w-xl md:max-w-full">
            <FiltersMobile filters={filters} accentColor={hex}/>
          </div>
        </div>
        <div className="hidden border-t lg:block">
          {filters.map((filter) => (
            <div key={filter.slug} className="gap-8 py-4">
              <h4 className="border-b font-medium">
                <span className="px-3">{filter.title}</span>
              </h4>
              <ul className="space-y-2 ps-5 pt-2">
                {filter.category.map((item) => (
                  <li key={item.id}>
                    <FilterLink category={filter.slug} accentColor={hex} value={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
      <section className="flex-1 lg:border-s">
        <H3 className="border-b py-3 text-center">Catálogo</H3>
        {isFiltered ? (
          filterProds.length !== 0 ? (
            <ul className="grid gap-12 py-8 md:grid-cols-2 xl:grid-cols-3">
              {filterProds.map((product) => (
                <li key={product.id} className="inline-flex max-w-[19rem] justify-self-center">
                  <ProductLink product={product} ratio={1} />
                </li>
              ))}
            </ul>
          ) : (
            <H4 className="mx-auto mt-24 w-fit font-medium">No hay productos de esta categoría.</H4>
          )
        ) : (
          <ul className="grid gap-12 py-8 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <li key={product.id} className="inline-flex max-w-[19rem] justify-self-center">
                <ProductLink product={product} ratio={1} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
