import {api} from "@/api";
import {fetchProductByCategory} from "@/modules/product";
import {ProductLink} from "@/modules/product";
import {H3} from "@/components/typo";
import {Categories} from "@/modules/categories/enum";
import {FilterLink} from "@/components/filter-link";

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

  const title = () => {
    let title = "Catálogo";

    if (category && value) {
      const cat = category.charAt(0).toUpperCase() + category.slice(1);
      let val = value.charAt(0).toUpperCase() + value.slice(1);

      if (val.includes("-")) val = val.split("-").join(" ");

      title += ` ${cat} ${val}`;
    }

    return title;
  };

  return (
    <section className="container flex border-e border-s">
      <aside className="flex h-full w-[250px] flex-col gap-8 py-8">
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
          <ul className="flex flex-wrap justify-evenly gap-4 py-8">
            {products.data.map((product) => (
              <li key={product.id} className="inline-flex">
                <ProductLink product={product} ratio={1} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
