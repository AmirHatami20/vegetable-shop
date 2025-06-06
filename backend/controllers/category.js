const CategoryModel = require("../models/category")

module.exports = {
    getAllCategories: async (req, res) => {
        try {
            const allCategories = await CategoryModel.find({})

            res.status(200).json(allCategories)
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.message,
            })
        }
    },
    createCategory: async (req, res) => {
        const {name, title} = req.body

        try {
            const category = await CategoryModel.create({
                name, title
            })

            res.status(200).json(category)
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.message,
            })
        }


    },
    deleteCategory: async (req, res) => {
        const categoryId = req.params.id

        try {
            const category = CategoryModel.findByIdAndDelete(categoryId)

            res.status(200).json(category)
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.message,
            })
        }
    },
}