import { NextResponse } from "next/server";
import blogsModel from "@/app/api/blogs/blogs.model";

export async function GET(request) {
  const title = request.url.split("/")[5];
  console.log(title);
  try {
    const blog = await blogsModel.findById(id);
    return NextResponse.json({
      status: "success",
      data: blog,
      statusCode: 200
    });
  } catch (error) {
    console.error(`Error while fetching blogs: ${error}`);
    return NextResponse.json({
      status: "error",
      message: "Failed to fetch blog",
      statusCode: 404
    });
  }
}
