import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const colorSchema = new mongoose.Schema({
    
    color: {type: String, required: true},
    productRef:{
        type: Schema.Types.ObjectId,
        ref:'productRef'
    },
    sizes:[{
            type: Schema.Types.ObjectId,
            ref:"size"}]   
}, {
    timestamp: true,
})

const Color = mongoose.model('Color', colorSchema);

export default Color