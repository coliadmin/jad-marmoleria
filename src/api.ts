import {api as products} from "@/modules/product";
import {api as colors} from "@/modules/categories/color";
import {api as uses} from "@/modules/categories/use";
import {api as materials} from "@/modules/categories/material";
import {api as projects} from "@/modules/projects";
import {api as aplications} from "@/modules/categories/aplication";
import {api as faqs} from "@/modules/faqs";
import {api as instagram} from "@/modules/content/instagram";
import {api as whatsapp} from "@/modules/content/whatsapp";

export const api = {
  products,
  projects,
  colors,
  uses,
  materials,
  aplications,
  faqs,
  instagram,
  whatsapp,
};
