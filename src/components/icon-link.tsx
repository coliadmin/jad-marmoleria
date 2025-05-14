import {Link} from "next-view-transitions";

import {P} from "./typo";
import {IconNames, icons} from "./icons";

import {cn} from "@/lib/utils";
import {quicksand} from "@/fonts";

type Props = {
  href: string;
  icon: IconNames;
  iconName: string;
};

export function IconLink({href, icon, iconName}: Props) {
  return (
    <Link prefetch className="space-y-2" href={href}>
      <span className="mt-icon flex justify-center">{icons[icon]}</span>
      <p className={cn(quicksand.className, "text-center text-lg")}>{iconName}</p>
    </Link>
  );
}
