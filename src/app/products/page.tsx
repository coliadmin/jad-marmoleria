import {Link} from "next-view-transitions";

import {api} from "@/api";
import {fetchProductByCategory} from "@/modules/product";
import {ProductLink} from "@/modules/product";
import {H3} from "@/components/typo";
import {Categories} from "@/modules/categories/enum";
import {FilterLink} from "@/components/filter-link";
import {query, CategoryCommons, categoryXPlural, Data} from "@/lib/strapi";
import {capitalize, cn} from "@/lib/utils";
import type { Aplication } from "@/modules/categories/aplication";
import type { Use } from "@/modules/categories/use";
import type { Material } from "@/modules/categories/material";
import type {Color} from "@/modules/categories/color/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";

type Props = {
  searchParams: {
    category: string;
    value: string;
  };
};

interface Filters {
  title: string;
  slug: string;
  category: Data<Color[]> | Data<Aplication[]> | Data<Material[]> | Data<Use[]>;
}

async function getFilters() {
  const {data: colors} = await api.colors.get();
  const {data: uses} = await api.uses.get();
  const {data: materials} = await api.materials.get();
  const {data: aplications} = await api.aplications.get();

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

export default async function ProductsPage({searchParams: {category, value}}: Props) {
  const products = await api.products.get();
  const filterProds = await fetchProductByCategory(category, value);

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
      <aside className="flex flex-col lg:h-full lg:w-[250px] w-full pt-6 lg:py-6">
        <div className="border-b lg:w-auto flex flex-row gap-4 lg:gap-0 lg:justify-between">
          <H3 className="ml-3">Filtros</H3>
          <Link
            prefetch
            className={cn(
                "content-center invisible rounded-e-full px-2 text-sm font-normal text-slate-800/65 hover:underline",
                category && "visible" || value && "visible",
            )}
            href="/products"
          >
            Limpiar filtro
          </Link>
        </div>
       <div className="block border-b lg:hidden ml-1">
         <ScrollArea className="whitespace-nowrap w-full">
            <div className="flex gap-6 p-2 overflow-x-auto">
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
          <ScrollArea className="whitespace-nowrap w-full">
            <div className="flex gap-6 p-2 overflow-x-auto">
            {filters.map((filter) => (
              filter.slug === category && filter.category.map((item) => (
                <FilterLink category={filter.slug} value={item} key={item.id} />
                ))
              ))}
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
          <ul className="flex flex-wrap justify-evenly gap-4 py-8">
            {filterProds.map((product) => (
              <li key={product.id} className="inline-flex">
                <ProductLink className="w-vertical" product={product} ratio={1} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid gap-12 py-8 md:grid-cols-2 lg:grid-cols-3">
            {products.data.map((product) => (
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
