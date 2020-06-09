const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    title:{
        type: String,
        reuired: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        required:true,
    },
    creator: {
        type: Schema.ObjectId,
        ref:  'User'
    }
})

module.exports = mongoose.model('Event', eventSchema)   // param1: collection name, param2: schemaobject