"use server"

import { z } from "zod"
import { formSchema } from "../page";
import prisma from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BBSData } from "../types/types";

export const getAllBBS = async () => {
    const data: BBSData[] = await prisma.post.findMany();
    return data
}

export const searchBBS = async ({
    keyword
}: z.infer<typeof formSchema>) => {
    if (keyword.length == 0) {
        const data: BBSData[] = await prisma.post.findMany();
        return data;
    } else {
        const data: BBSData[] = await prisma.post.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: keyword
                        }
                    }, {
                        content: {
                            contains: keyword
                        }
                    }
                ]
            }
        });

        return data;
    }
    
}
