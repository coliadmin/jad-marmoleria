import {Link} from "next-view-transitions";
import {Feather} from "lucide-react";

import {P} from "../typo";

import {cn} from "@/lib/utils";
import {quicksand} from "@/fonts";

type Props = {
  className?: string;
};

export function Exterior({className = "mx-auto size-10"}: Props) {
  return (
    <Link className="m-auto" href="/products?category=usos&value=exterior">
      <Feather className={className} />
      <P className={cn(quicksand.className, "mt-0 text-center text-lg leading-none")}>
        <span className="rounded px-2">Exteriores</span>
      </P>
    </Link>
  );
}
