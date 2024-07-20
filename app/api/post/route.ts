import prisma from "@/lib/prismaClient"
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const allBBSPosts = await prisma.post.findMany();
    return NextResponse.json(allBBSPosts);
};

// export async function POST(req: Request) {

//     const {username, title, content} = await req.json();

//     const post = await prisma.post.create({
//         data: {
//             username,
//             title,
//             content,
//         },
//     });
//     console.log(post)
//     return NextResponse.json(post);
// };