const mongoose = require('mongoose')

const ecommerceSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    price:{
        type: Number,
    },
    description: {
        type: String
    }
},
{
 timestamps: true   
})

module.exports = mongoose.model('Product', ecommerceSchema)