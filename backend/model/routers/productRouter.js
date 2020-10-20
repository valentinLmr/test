import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../../data.js';
import Product from '../productModel.js';
import Color from '../colorModel.js'
const productRouter = express.Router();

productRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    await Product.deleteMany();
    const createdProduct = await Product.insertMany(data.products)
    const createdColor =  data.colors



    createdProduct.map( el => {
        console.log(el)
        createdColor.map(color => {
            let newColor = new Color(color)
            newColor.productRef = el._id
            el.colors.push(newColor)
            newColor.save()
            el.save()
            console.log(newColor)

            
        })
     })
     res.send(createdProduct)


}))

export default productRouter