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
    <Link className="m-auto w-6" href={href}>
      <span className="mt-2 flex justify-center">{icons[icon]}</span>
      <P className={cn(quicksand.className, "text-center text-lg leading-none")}>
        <span className="rounded px-2">{iconName}</span>
      </P>
    </Link>
  );
}
