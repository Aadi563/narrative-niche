import { NextResponse } from "next/server";
import blogsModel from "@/app/api/blogs/blogs.model";

export async function GET(request) {
  try {
    const id = request.url.split("/")[5];
    const blog = await blogsModel.findById(id);

    if (!blog) {
      throw new Error(`No blog found with id: ${id}`);
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}
