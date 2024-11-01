import type {Project} from "@/modules/projects";

import {Api} from "@/lib/strapi";

async function getProjects() {}

export const api: Api<Project> = {
  get: () => {
    throw new Error("Not implemented");
  },
  fetch: () => {
    throw new Error("Not implemented");
  },
};
