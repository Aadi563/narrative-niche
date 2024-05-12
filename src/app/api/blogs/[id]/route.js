import { NextResponse } from "next/server";
import blogsModel from "@/app/api/blogs/blogs.model";

export async function GET(request) {
    const id = request.url.split("/")[5];
    const blog = await blogsModel.findById(id)
    return NextResponse.json(blog)
}