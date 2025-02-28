import {api as products} from "@/modules/product";
import {api as colors} from "@/modules/categories/color";
import {api as uses} from "@/modules/categories/use";
import {api as materials} from "@/modules/categories/material";
import {api as projects} from "@/modules/projects";

export const api = {
  products,
  projects,
  colors,
  uses,
  materials,
};
