import { NextResponse } from "next/server";
import fs, { writeFileSync } from "fs";
import path from "path";
import uploadFileToCloudinary from "@/app/utils/cloudinary";
import blogsModel from "@/app/api/blogs/blogs.model";
import DOMPurify from 'isomorphic-dompurify';

export async function GET(request) {
  try {
    const blog = await blogsModel.find({});
    return NextResponse.json(blog);
  } catch (error) {
    console.error(`Error while fetching blogs: ${error}`);
    return NextResponse.json({ status: "error", message: "Failed to fetch blogs" });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get("files");
    if (!image) throw new Error("Image not provided");
    console.log(Object.values(formData));
    const bufferArray = await image.arrayBuffer();
    const bufferData = Buffer.from(bufferArray);
    const dirPath = path.join(process.cwd(), "./public/uploads/cover_images/");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const imagePath = `${dirPath}${Date.now()}-${path.extname(image.name)}`;
    writeFileSync(imagePath, bufferData);
    uploadFileToCloudinary(imagePath)
    const cloudinaryUrl = await uploadFileToCloudinary(imagePath);
    const newBlog = await blogsModel(
      {
        title: formData.get("title"),
        coverImage: `${cloudinaryUrl.secure_url}`,
        author: "Aadi563",
        content: DOMPurify.sanitize(`${formData.get("content")}`),
        coverContent: DOMPurify.sanitize(`${formData.get("coverContent")}`),
      }
    )
    await newBlog.save();
    return NextResponse.json({ status: "success", data: newBlog });
  } catch (error) {
    console.error(`Error while uploading image: ${error}`);
    return NextResponse.json({ status: "error", message: "Failed to upload image" });
  }
}