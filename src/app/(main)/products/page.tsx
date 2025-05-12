import type {Aplication} from "@/modules/categories/aplication";
import type {Use} from "@/modules/categories/use";
import type {Material} from "@/modules/categories/material";
import type {Color} from "@/modules/categories/color/types";

import {Link} from "next-view-transitions";
import {Metadata} from "next";
import {ScrollArea} from "@radix-ui/react-scroll-area";

import {api} from "@/api";
import {ProductLink} from "@/modules/product";
import {H3} from "@/components/typo";
import {Categories} from "@/modules/categories/enum";
import {FilterLink} from "@/components/filter-link";
import {query, CategoryCommons, categoryXPlural, Data} from "@/lib/strapi";
import {capitalize, cn} from "@/lib/utils";
import {ScrollBar} from "@/components/ui/scroll-area";

type Props = {
  searchParams: {
    category: string;
    value: string;
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

export const metadata: Metadata = {
  title: "JAD Marmolería - Catálogo",
  openGraph: {
    title: "JAD Marmolería - Catálogo",
    url: `/products`,
  },
};

export default async function ProductsPage({searchParams: {category, value}}: Props) {
  const products = await api.products.getList();
  const filterProds = await api.products.getByCategory(category, value);

  const filters = await getFilters();

  const title = async () => {
    const baseTitle = "Catálogo";

    if (!category || !value) return baseTitle;

    const {
      data: [{nombre: subcategory}],
    } = await query<CategoryCommons[]>(
      `${categoryXPlural[category]}?filters[slug][$contains]=${value}&populate[fields][0]=nombre&populate[fields][1]=slug`,
    );

    const title = `${baseTitle} ${capitalize(category)}:  ${subcategory}`;

    return title;
  };

  return (
    <section className="mx-auto flex w-full max-w-xl flex-col overflow-hidden border-e border-s sm:max-w-2xl md:max-w-5xl lg:mx-auto lg:max-w-[88rem] lg:flex-row">
      <aside className="flex w-full flex-col pt-6 lg:h-full lg:w-[250px] lg:py-6">
        <div className="flex flex-row gap-4 border-b lg:w-auto lg:justify-between lg:gap-0">
          <H3 className="ml-3">Filtros</H3>
          <Link
            prefetch
            className={cn(
              "invisible content-center rounded-e-full px-2 text-sm font-normal text-slate-800/65 hover:underline",
              (category && "visible") || (value && "visible"),
            )}
            href="/products"
          >
            Limpiar filtro
          </Link>
        </div>
        <div className="ml-1 block border-b lg:hidden">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-6 overflow-x-auto p-2">
              {filters.map((filter) => (
                <Link
                  key={filter.slug}
                  prefetch
                  className={cn(
                    "rounded-full font-medium",
                    category === filter.slug && "bg-gray-200/65 px-3",
                  )}
                  href={`/products?category=${filter.slug}`}
                >
                  {filter.title}
                </Link>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-6 overflow-x-auto p-2">
              {filters.map(
                (filter) =>
                  filter.slug === category &&
                  filter.category.map((item) => (
                    <FilterLink key={item.id} category={filter.slug} value={item} />
                  )),
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <div className="hidden lg:block">
          {filters.map((filter) => (
            <div key={filter.slug} className="gap-8 py-4">
              <h4 className="border-b font-medium">
                <span className="px-3">{filter.title}</span>
              </h4>
              <ul className="space-y-2 ps-5 pt-2">
                {filter.category.map((item) => (
                  <li key={item.id}>
                    <FilterLink category={filter.slug} value={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
      <section className="flex-1 lg:border-s">
        <H3 className="border-b py-3 text-center">{title()}</H3>
        {category && value ? (
          <ul className="grid gap-12 py-8 md:grid-cols-2 lg:grid-cols-3">
            {filterProds.map((product) => (
              <li key={product.id} className="inline-flex max-w-[19rem] justify-self-center">
                <ProductLink className="w-vertical" product={product} ratio={1} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid gap-12 py-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <li key={product.id} className="inline-flex max-w-[19rem] justify-self-center">
                <ProductLink className="w-vertical" product={product} ratio={1} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
