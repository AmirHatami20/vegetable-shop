const ProductModel = require("../models/product")

module.exports = {
    create: async function (req, res) {
        const {name, category, price, description} = req.body
        const file = req.file;

        if (!file || file.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files uploaded'
            });
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;

        try {
            const product = await ProductModel.create({
                name,
                category,
                imageUrl,
                price,
                description,
            })

            return res.status(201).send({product})
        } catch (err) {
            res.status(400).send({
                success: false,
                message: err.message,
            })
        }

    },
    getAll: async function (req, res) {
        try {
            const allProduct = await ProductModel.find()
                .populate("category")
                .sort({createdAt: -1})

            return res.status(200).send(JSON.stringify(allProduct))
        } catch (err) {
            res.status(404).send({
                success: false,
                message: err.message,
            })
        }
    }
}