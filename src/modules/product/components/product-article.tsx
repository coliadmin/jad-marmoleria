import type {Product} from "@/modules/product";

import {VerticalCarousel} from "@/components/vertical-carousel";

export function ProductArticle({product}: {product: Product}) {
  return (
    <article>
      <header className="inline-flex gap-4">
        <h1 className="mb-8 text-4xl font-bold">{product.nombre}</h1>
      </header>
      <div className="inline-flex w-full gap-20 ps-14">
        <aside className="w-vertical">
          <VerticalCarousel images={product.imagenes} />
        </aside>
        <div className="max-w-2xl flex-1 space-y-8">
          <p className="text-pretty">{product.descripcion}</p>
          <div>
            <p>
              <span className="font-medium">Disponibilidad: </span>
              {product.disponibilidad ? "sin stock" : "en stock"}
            </p>
            <p>
              <span className="font-medium">Espesor: </span> {product.espesor}
            </p>
            <p>
              <span className="font-medium">Uso: </span> {product.uso}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
