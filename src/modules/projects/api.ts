import {Api} from "@/types";

async function getProjects() {}

export const api: Api<Project> = {
  get: getProjects,
  fetch: () => {
    throw new Error("Not implemented");
  },
};
