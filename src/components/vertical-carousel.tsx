"use client";

import {useEffect, useState} from "react";

import {VerticalImage} from "./vertical-image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {Image} from "@/modules/product";

type VerticalCarouselProps = {
  images: Image[];
};

export function VerticalCarousel({images}: VerticalCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id}>
            <VerticalImage alt={image.alt} src={image.url} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-4 flex justify-center">
        <span>
          {current} / {count}
        </span>
      </div>
      <CarouselPrevious className="rounded" />
      <CarouselNext className="rounded" />
    </Carousel>
  );
}
