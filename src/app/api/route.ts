import {revalidatePath, revalidateTag} from "next/cache";
import {NextRequest, NextResponse} from "next/server";
import { Categories } from "@/modules/categories/enum";
import {STRAPI_TOKEN} from "@/config";



export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-strapi-secret");
  const body = await req.json();
  const model = body.model;

  if (secret !== STRAPI_TOKEN) {
    return NextResponse.json({message: "Invalid token"}, {status: 401});
  }

  try {
    revalidateTag(model);
    return NextResponse.json({revalidated: true});
  } catch (err) {
    return NextResponse.json({error: "Error revalidating"}, {status: 500});
  }

}

