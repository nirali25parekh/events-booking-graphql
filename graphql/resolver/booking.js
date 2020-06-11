const Booking = require('../../models/Booking')
const { transformBooking, transformEvent } = require('../../helpers/helperFunctions')

module.exports = {

    bookings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('User not authenticated')
        }
        const bookings = await Booking.find({ user: req.userId })
        return bookings.map(booking => {
            return transformBooking(booking)
        })
    },

    bookEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('User not authenticated')
        }
        try {
            const booking = new Booking({
                user: req.userId,
                event: args.eventId,
            })
            result = await booking.save()
            return transformBooking(result)
        } catch {
            throw err
        }
    },

    cancelBooking: async (args, req) => {  // returns the event
        if (!req.isAuth) {
            throw new Error('User not authenticated')
        }
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
