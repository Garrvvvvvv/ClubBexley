import Image from "../models/Image.js";
import cloudinary from "../config/cloudinary.js";
import stream from "stream";
import { logFromReq } from "../utils/logAdminAction.js";

export const getImages = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = {};
        if (category) filter.category = category;
        const images = await Image.find(filter).sort({ createdAt: -1 });
        res.json(images);
    } catch (error) {
        console.error("Get Images Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No image provided" });
        const { category } = req.body;

        if (!category) return res.status(400).json({ message: "Category is required" });
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "home_gallery" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.Readable.from(req.file.buffer).pipe(uploadStream);
        });
        const newImage = await Image.create({
            url: result.secure_url,
            public_id: result.public_id,
            category,
            event: null
        });

        logFromReq(req, "UPLOAD_GLOBAL_IMAGE", { imageId: newImage._id, category, url: result.secure_url });
        res.status(201).json(newImage);
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: "Upload failed" });
    }
};

export const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findById(id);

        if (!image) return res.status(404).json({ message: "Image not found" });
        if (image.public_id) {
            await cloudinary.uploader.destroy(image.public_id);
        }

        await image.deleteOne();
        logFromReq(req, "DELETE_GLOBAL_IMAGE", { imageId: image._id, category: image.category });
        res.json({ message: "Image deleted" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: "Delete failed" });
    }
};
