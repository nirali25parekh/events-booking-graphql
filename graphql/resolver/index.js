const bcrypt = require('bcryptjs')
// models
const Event = require('../../models/Event')
const User = require('../../models/User')
const Booking = require('../../models/Booking')

// note number : 1 => conversion string to Date format (otherwise date look like '1591706834535')


module.exports = {

    bookings: async () => {
        const bookings = await Booking.find()
        return bookings.map(booking => {
            return {
                ...booking._doc,      //all the event data
                createdAt: new Date(booking._doc.createdAt).toISOString(),
                updatedAt: new Date(booking._doc.updatedAt).toISOString()
            }
        })
    },


    events: async () => { // when 'events' property triggered, this function will fire off
        const events = await Event.find()
        return events.map(event => {
            return {
                ...event._doc,      //all the event data
                date: new Date(event._doc.date).toISOString()
            }
        })
    },



    createEvent: async (args) => {   // when 'createEvents' property triggered, this function will fire off
        try {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: args.eventInput.price,
                date: new Date(args.eventInput.date),
                creator: '5edf893d9c9a7259243053cb'
            })
            const savedEvent = await event.save()
            const creator = await User.findById('5edf893d9c9a7259243053cb')

            if (!creator) {
                throw new Error('No User found')
            }

            await creator.createdEvents.push(event)
            await creator.save()
            // return savedEvent
            return {
                ...savedEvent._doc,
                date: new Date(savedEvent._doc.date).toISOString()
            }
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    createUser: async args => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email })
            if (existingUser) {
                throw new Error('User already exists')
            }
            const user = new User({
                email: args.userInput.email,
                password: bcrypt.hashSync(args.userInput.password, 12)
            })
            result = await user.save()
            return { ...result._doc, password: null }
        } catch (err) {
            console.log(err) // displayed in console
            throw err // displayed in graphiql gui
        }
    },

    bookEvent: async args => {
        try {
            const booking = new Booking({
                user: "5edf893d9c9a7259243053cb",
                event: args.eventId,
            })
            result = await booking.save()
            return {
                ...result._doc,
                createdAt: new Date(result._doc.createdAt).toISOString(),
                updatedAt: new Date(result._doc.updatedAt).toISOString()
            }
        } catch {
            throw err
        }
    },

    cancelBooking: async args => {  // returns the event
        try {
            const bookingToBeDeleted = await Booking.findById(args.bookingId).populate('event')
            await Booking.deleteOne({ _id: args.bookingId })
            const event = bookingToBeDeleted.event
            return {
                ...event._doc,
                date: new Date(event._doc.date).toISOString()
            }
        }
        catch (err) {
            throw err
        }
    }
}
