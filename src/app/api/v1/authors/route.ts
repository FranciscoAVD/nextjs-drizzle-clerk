import type { NextRequest } from "next/server";
import { apiResponse } from "@/lib/api-utils";
import { auth } from "@clerk/nextjs/server";
import { getAuthors } from "@/features/authors/use-cases/get-authors";

export async function GET(req: NextRequest) {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated)
    return apiResponse("UNAUTHENTICATED", {
      message: "Must authenticate.",
    });

  const authors = await getAuthors();

  if (!authors) return apiResponse("SERVER_ERROR");

  return apiResponse("SUCCESS", {
    data: authors,
  });
}
