import mongoose from 'mongoose';

const Schema = mongoose.Schema

const sizeSchema = mongoose.Schema({
    size: {type: String, required: true},
    countInStock: {type: Number, required: true},
    productRef: {
        type: Schema.Types.ObjectId,
        ref:'product'
    },
}, {
    timestamp:true
})

const Size = mongoose.model(('size', sizeSchema))

export default Size