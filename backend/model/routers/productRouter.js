import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../../data.js';
import Product from '../productModel.js';
import Color from '../colorModel.js'
const productRouter = express.Router();

productRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    await Product.deleteMany();
    await Color.deleteMany()
    const createdProduct = await Product.insertMany(data.products)
    


    for (let i = 0; i < createdProduct.length; i++){
        
        let createdColor = await Color.insertMany(data.colors)

        createdColor.map( color => {
            color.productRef = createdProduct[i]._id
            color.save            
            createdProduct[i].colors.push(color)                
        })
        Product.findOne({ name: 'tunique' }).populate('colors')
  }
    res.send(createdProduct)
}))

export default productRouter