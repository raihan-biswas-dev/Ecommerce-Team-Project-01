import express from 'express'
import Product from '../models/ProductModel.js'

const productRouter = express.Router()

productRouter.get('/', async (req, res) => {
    const products = await Product.find()
    res.send(products)
})


productRouter.get("/:slug", async (req, res) => {
    let products = await Product.findOne({ slug: req.params.slug })
    if (products) {

        res.send(products)
    } else {
        res.status(404).send({ msg: "product not found" })
    }
})

export default productRouter