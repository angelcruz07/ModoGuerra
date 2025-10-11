import { v2 as cloudinary } from "cloudinary";

import {
  CLOUDINARY_CLOUDNAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from "astro:env/server";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUDNAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export class ImageUpload {
  static async upload(file: File) {
    try {
      const buffer = await file.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString("base64");
      const mimeType = file.type;

      const res = await cloudinary.uploader.upload(
        `data:${mimeType};base64,${base64Image}`,
        {
          folder: "codequest25/posts",
          resource_type: "auto",
        },
      );

      return res.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error(JSON.stringify(error));
    }
  }

  static async delete(image: string) {
    try {
      const urlParts = image.split("/");
      const uploadIndex = urlParts.indexOf("upload");

      if (uploadIndex === -1 || uploadIndex + 1 >= urlParts.length) {
        console.log("Invalid Cloudinary URL. Could not find public ID.");
        return false;
      }

      const publicIdWithExtension = urlParts.slice(uploadIndex + 2).join("/");
      const lastDotIndex = publicIdWithExtension.lastIndexOf(".");

      const publicId =
        lastDotIndex !== -1
          ? publicIdWithExtension.substring(0, lastDotIndex)
          : publicIdWithExtension;

      // 2. Usar el Public ID para eliminar la imagen
      const resp = await cloudinary.uploader.destroy(publicId);
      console.log("🚀 ~ Cloudinary Response:", resp);

      return resp.result === "ok";
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
