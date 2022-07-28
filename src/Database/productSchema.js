const {Schema, model} = require('mongoose')
const { ObjectId } = require('mongodb');

let productSchema = new Schema({
    productName:{
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productMarketplaceID:{
        type: ObjectId,
        ref: 'marketplace',
        required: false
    },
    productReviews:{
        type: [ObjectId],
        ref: 'review'
    },
    productRating:{
        type: [Number],
    },
    productPrice:{
        type: Number,
        required: true
    },
    productCreator:{
        type: ObjectId,
        ref: 'user',
        required: true
    }
})

let product = model('product', productSchema)

module.exports = product