const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')


const Schema = mongoose.Schema

const bookingSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        autopopulate:true
    },
    event: {
        type: Schema.ObjectId,
        ref: 'Event',
        autopopulate:true
    },
}, { timestamps: true })        // mongoose will add createdAt and updatedAt timestamp automatically


bookingSchema.plugin(autopopulate)
module.exports = mongoose.model('Booking', bookingSchema)