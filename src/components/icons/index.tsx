import {Armchair, ShowerHead, Feather, ChefHat} from "lucide-react";

export const InteriorIcon = Armchair;

export const ExteriorIcon = Feather;

export const KitchenIcon = ChefHat;

export const BathroomIcon = ShowerHead;

export enum IconNames {
  interior = "interior",
  exterior = "exterior",
  "mesadas-de-cocina" = "mesadas-de-cocina",
  "mesadas-de-bano" = "mesadas-de-bano",
}

export const icons: Record<IconNames, React.ReactNode> = {
  interior: <InteriorIcon />,
  exterior: <ExteriorIcon />,
  "mesadas-de-cocina": <KitchenIcon />,
  "mesadas-de-bano": <BathroomIcon />,
};
