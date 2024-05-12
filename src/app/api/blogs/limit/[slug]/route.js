import blogsModel from "@/app/api/blogs/blogs.model";
import { NextResponse } from "next/server";

export async function GET(request) {
    const offset = request.url.split("/")[6].split("-")[0];
    const limit = request.url.split("/")[6].split("-")[1];
    try {
      const blog = await blogsModel.find({}).skip(offset).limit(limit);
      return NextResponse.json(blog);
    } catch (error) {
      console.error(`Error while fetching blogs: ${error}`);
      return NextResponse.json({ status: "error", message: "Failed to fetch blogs" });
    }
  }