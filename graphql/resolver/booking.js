const Booking = require('../../models/Booking')
const { transformBooking, transformEvent} = require('../../helpers/helperFunctions')

module.exports = {

    bookings: async () => {
        const bookings = await Booking.find()
        return bookings.map(booking => {
            return transformBooking(booking)
        })
    },

    bookEvent: async args => {
        try {
            const booking = new Booking({
                user: "5ee0b0daf414607b98a72876",
                event: args.eventId,
            })
            result = await booking.save()
            return transformBooking(result)
        } catch {
            throw err
        }
    },

    cancelBooking: async args => {  // returns the event
        try {
            const bookingToBeDeleted = await Booking.findById(args.bookingId).populate('event')
            await Booking.deleteOne({ _id: args.bookingId })
            const event = bookingToBeDeleted.event
            return transformEvent(event)
        }
        catch (err) {
            throw err
        }
    }
}
