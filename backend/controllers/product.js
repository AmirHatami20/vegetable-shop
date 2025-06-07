const ProductModel = require("../models/product");
const {UploadClient} = require("@uploadcare/upload-client");

const client = new UploadClient({publicKey: process.env.UPLOADCARE_PUBLIC_KEY});

module.exports = {
    create: async function (req, res) {
        const {name, category, price, description} = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        try {
            const result = await client.uploadFile(file.buffer, {
                fileName: file.originalname,
                contentType: file.mimetype,
            });

            const imageUrl = `https://ucarecdn.com/${result.uuid}/`;

            const product = await ProductModel.create({
                name,
                category,
                imageUrl,
                price,
                description,
            });

            return res.status(201).send({product});
        } catch (err) {
            res.status(400).send({
                success: false,
                message: err.message,
            });
        }
    },

    getAll: async function (req, res) {
        try {
            const allProduct = await ProductModel.find()
                .populate("category")
                .sort({createdAt: -1});

            return res.status(200).send(JSON.stringify(allProduct));
        } catch (err) {
            res.status(404).send({
                success: false,
                message: err.message,
            });
        }
    },
};
