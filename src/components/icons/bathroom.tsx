import {Link} from "next-view-transitions";
import {ShowerHead} from "lucide-react";

import {P} from "../typo";

import {cn} from "@/lib/utils";
import {quicksand} from "@/fonts";

type Props = {
  className?: string;
};

export function Bathroom({className = "mx-auto size-10"}: Props) {
  return (
    <Link className="w-6" href="/products?category=aplicaciones&value=mesadas-de-bano">
      <ShowerHead className={className} />
      <P className={cn(quicksand.className, "mt-0 text-center text-lg leading-none")}>
        <span className="rounded px-2">Baño</span>
      </P>
    </Link>
  );
}
