import cloudinary from "cloudinary";
import httpStatus from "http-status";
import fs from "fs";

import configs from "../configs/appConfig";
import APIError from "./APIError";
import log from "./logger";

cloudinary.v2.config({
  cloud_name: configs.cloudinary.cloudName,
  api_key: configs.cloudinary.apiKey,
  api_secret: configs.cloudinary.apiSecret,
});

class Cloudinary {
  static upload = async (file: string): Promise<string> => {
    try {
      const res = await cloudinary.v2.uploader.upload(file, {
        folder: configs.cloudinary.folder,
        use_filename: true,
      });

      fs.unlinkSync(file);
      return res.secure_url;
    } catch (e) {
      log.error("Upload file to cloudinary failed");
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Upload file to cloudinary failed",
      });
    }
  };
  static uploadVideo = async (file: string): Promise<string> => {
    try {
      const res = await cloudinary.v2.uploader.upload(file, {
        folder: configs.cloudinary.folder,
        use_filename: true,
        resource_type: "video",
        eager: [
          { width: 300, height: 300, crop: "pad", audio_codec: "none" },
          {
            width: 160,
            height: 100,
            crop: "crop",
            gravity: "south",
            audio_codec: "none",
          },
        ],
        eager_async: true,
      });
      fs.unlinkSync(file);
      return res.secure_url;
    } catch (e) {
      log.error("Upload file to cloudinary failed");
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Upload file to cloudinary failed",
      });
    }
  };
}

export default Cloudinary;
