import {revalidatePath} from "next/cache";
import {NextRequest, NextResponse} from "next/server";

import {STRAPI_TOKEN} from "@/config";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-strapi-secret");

  if (secret !== STRAPI_TOKEN) {
    return NextResponse.json({message: "Invalid token"}, {status: 401});
  }

  try {
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/products/[slug]", "page");
    revalidatePath("/projects");
    revalidatePath("/projects/[slug]", "page");

    return NextResponse.json({revalidated: true});
  } catch (err) {
    return NextResponse.json({error: "Error revalidating"}, {status: 500});
  }
}
