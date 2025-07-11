import {AspectRatio} from "@/components/ui/aspect-ratio";
import {cn, isImageOrVideo} from "@/lib/utils";

type VerticalImageProps = {
  alt: string;
  src: string;
  className?: string;
  ratio?: number;
};

export function VerticalImage({alt, src, className, ratio = 9 / 16}: VerticalImageProps) {
  const multimedia = isImageOrVideo(src);

  return (
    <div className={cn("w-full p-2 md:w-vertical", className)}>
      <AspectRatio ratio={ratio}>
        {multimedia === "image" ? (
          <img alt={alt} className="h-full w-full object-cover cursor-pointer" src={src} />
        ) : (
          <video controls src={src}>
            <track default kind="captions" srcLang="es" />
          </video>
        )}
      </AspectRatio>
    </div>
  );
}
