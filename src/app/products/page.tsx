import {Link} from "next-view-transitions";

import {api} from "@/api";
import {fetchProductByCategory} from "@/modules/product";
import {ProductLink} from "@/modules/product";
import {H3} from "@/components/typo";
import {Categories} from "@/modules/categories/enum";
import {FilterLink} from "@/components/filter-link";
import {query, CategoryCommons, categoryXPlural} from "@/lib/strapi";
import {capitalize, cn} from "@/lib/utils";

type Props = {
  searchParams: {
    category: string;
    value: string;
  };
};

export default async function ProductsPage({searchParams: {category, value}}: Props) {
  const products = await api.products.get();
  const colors = await api.colors.get();
  const uses = await api.uses.get();
  const materials = await api.materials.get();
  const aplications = await api.aplications.get();
  const filterProds = await fetchProductByCategory(category, value);

  const title = async () => {
    const baseTitle = "Catálogo";

    if (!category && !value) return baseTitle;

    const {
      data: [{nombre: subcategory}],
    } = await query<CategoryCommons[]>(
      `${categoryXPlural[category]}?filters[slug][$contains]=${value}&populate[fields][0]=nombre&populate[fields][1]=slug`,
    );

    const title = `${baseTitle} ${capitalize(category)}:  ${subcategory}`;

    return title;
  };

  return (
    <section className="container flex border-e border-s">
      <aside className="flex h-full w-[250px] flex-col gap-8 py-6">
        <div>
          <H3 className="border-b">
            <span className="px-3">Filtros</span>
            <Link
              className={cn(
                "invisible ml-12 rounded-e-full px-2 text-sm font-normal text-slate-800/65 hover:underline",
                category && value && "visible",
              )}
              href="/products"
            >
              Limpiar filtro
            </Link>
          </H3>
        </div>
        <div>
          <h4 className="border-b font-medium">
            <span className="px-3">Color</span>
          </h4>
          <ul className="space-y-2 ps-5 pt-2">
            {colors.data.map((color) => (
              <li key={color.id}>
                <FilterLink category={Categories.COLOR} value={color} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="border-b font-medium">
            <span className="px-3">Uso</span>
          </h4>
          <ul className="space-y-2 ps-5 pt-2">
            {uses.data.map((use) => (
              <li key={use.id}>
                <FilterLink category={Categories.USE} value={use} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="border-b font-medium">
            <span className="px-3">Material</span>
          </h4>
          <ul className="space-y-2 ps-5 pt-2">
            {materials.data.map((material) => (
              <li key={material.id}>
                <FilterLink category={Categories.MATERIAL} value={material} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="border-b font-medium">
            <span className="px-3">Aplicación</span>
          </h4>
          <ul className="space-y-2 ps-5 pt-2">
            {aplications.data.map((aplication) => (
              <li key={aplication.id}>
                <FilterLink category={Categories.APLICATION} value={aplication} />
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <section className="flex-1 border-s">
        <H3 className="border-b py-3 text-center">{title()}</H3>
        {category ? (
          <ul className="flex flex-wrap justify-evenly gap-4 py-8">
            {filterProds.map((product) => (
              <li key={product.id} className="inline-flex">
                <ProductLink product={product} ratio={1} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid gap-12 py-8 md:grid-cols-2 lg:grid-cols-3">
            {products.data.map((product) => (
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
