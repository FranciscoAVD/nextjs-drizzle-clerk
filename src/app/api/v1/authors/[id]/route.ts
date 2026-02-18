import type { NextRequest } from "next/server";
import { apiResponse } from "@/lib/api-utils";
import { validators } from "@/db/validators";
import { auth } from "@clerk/nextjs/server";
import { tryCatch } from "@/lib/utils";
import { addAuthor } from "@f/authors/use-cases/add-author";
import { z } from "zod";
import { updateAuthor } from "@/features/authors/use-cases/update-author";

export async function POST(req: NextRequest) {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated)
    return apiResponse("UNAUTHENTICATED", {
      message: "Must authenticate.",
    });

  const [body, parseError] = await tryCatch(req.json());
  if (parseError)
    return apiResponse("BAD_REQUEST", {
      message: "Expected JSON",
    });

  const { success, data, error } =
    validators.authors.insert.safeParse(body);

  if (!success)
    return apiResponse("UNPROCESSABLE_CONTENT", {
      errors: z.treeifyError(error).properties,
      message: "Error adding author.",
    });

  const authorId = await addAuthor(data);

  if (!authorId) return apiResponse("SERVER_ERROR");

  return apiResponse("SUCCESS_NO_CONTENT");
}

export async function PATCH(
  req: NextRequest,
  params: Promise<{
    id: string;
  }>,
) {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated)
    return apiResponse("UNAUTHENTICATED", {
      message: "Must authenticate.",
    });

  const { id } = await params;
  if (Number.isNaN(+id))
    return apiResponse("BAD_REQUEST", {
      message: "Invalid id.",
    });

  const [body, parseError] = await tryCatch(req.json());
  if (parseError)
    return apiResponse("BAD_REQUEST", {
      message: "Expected JSON",
    });

  const { success, data, error } =
    validators.authors.update.safeParse(body);

  if (!success)
    return apiResponse("UNPROCESSABLE_CONTENT", {
      errors: z.treeifyError(error).properties,
      message: "Error updating author.",
    });

  const author = await updateAuthor(+id, data);

  if (!author) return apiResponse("SERVER_ERROR");
  return apiResponse("SUCCESS", {
    data: author,
    message: "Update successful",
  });
}
