"use server";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFileToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { resource_type: "auto" });
    return result;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw error; // re-throw the error so it can be handled by the caller
  }
};

export default uploadFileToCloudinary;
