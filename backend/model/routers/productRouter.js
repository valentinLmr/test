import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../../data.js';
import Product from '../productModel.js';
import Color from '../colorModel.js'
import Size from '../sizeModel.js'
const productRouter = express.Router();

productRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    await Product.deleteMany();
    await Color.deleteMany()
    await Size.deleteMany()
    const createdProduct = await Product.insertMany(data.products)
    


    for (let i = 0; i < createdProduct.length; i++){
        
        let createdColor = await Color.insertMany(data.colors)
        let product = createdProduct[i]

        createdColor.map( color => {
            color.productRef = product._id
            color.save            
            product.colors.push(color)                
        })
        for (let i = 0; i < product.colors.length; i++){

            let color = product.colors[i]
            let createdSize = await Size.insertMany(data.sizes)

            createdSize.map( size => {
                size.colorRef = color._id
                size.countInStock = Math.round(Math.random() * 10 + 1)
                size.save 
                color.sizes.push(size)
            }) 
        }

        Product.findOne({ name: 'tunique' }).populate('colors')
        Color.findOne({color: 'red'}).populate('sizes')
    }

        
    

    
    

    res.send(createdProduct)
}))

export default productRouter