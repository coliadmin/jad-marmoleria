import {AspectRatio} from "@radix-ui/react-aspect-ratio";

import {cn} from "@/lib/utils";

type VerticalImageProps = {
  alt: string;
  src: string;
  className?: string;
  ratio?: number;
};

export function VerticalImage({alt, src, className, ratio = 9 / 16}: VerticalImageProps) {
  return (
    <div className={cn("w-vertical", className)}>
      <AspectRatio ratio={ratio}>
        <img alt={alt} className="h-full w-full object-cover" src={src} />
      </AspectRatio>
    </div>
  );
}
