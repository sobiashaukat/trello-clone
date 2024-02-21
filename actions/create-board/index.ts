// "use server";
// import { z } from "zod";
// import { db } from "@/lib/db";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// export type State = {
//   errors?: {
//     title?: string[];
//   };
//   message?: string | null;
// };

// const CreateBoard = z.object({
//   title: z.string().min(3, {
//     message: "Minimum length of 3 letters is required",
//   }),
// });

// export async function create(prevState: State, formData: FormData) {
//   const validatedFields = CreateBoard.safeParse({
//     title: formData.get("title"),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing fields.",
//     };
//   }

//   const { title } = validatedFields.data;
//   try {
//     await db.board.create({
//       data: {
//         title,
//       },
//     });
//   } catch (error) {
//     return {
//       message: "Database Error",
//     };
//   }
//   revalidatePath("/organization/org_2bj8kWAECsZHcUy9CT5AnluoZ2c");
//   redirect("/organization/org_2bj8kWAECsZHcUy9CT5AnluoZ2c");
// }


"use server";

import {db} from "@/lib/db";

import {auth} from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
// import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { revalidatePath } from "next/cache";

const handler = async (data:InputType): Promise<ReturnType> => {
  const {userId} = auth();

  if (!userId) {
    return{
      error: "Unauthorized",
    };
  }
  const {title} = data;

  let board;

  try{
    

   

    board = await db.board.create({
    data: {
      title,
    }

    });
  
    
  } catch(error) {
    return{
      error: "Failed to create."
    }
  }
  revalidatePath(`/board/${board.id}`);
  return {data:board};

};
export const createBoard = createSafeAction(CreateBoard,handler)
