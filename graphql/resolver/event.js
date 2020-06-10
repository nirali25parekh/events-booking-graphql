const Event = require('../../models/Event')
const User = require('../../models/User')
const { transformEvent } = require('../../helpers/helperFunctions')

module.exports = {

    events: async () => { // when 'events' property triggered, this function will fire off
        const events = await Event.find()
        return events.map(event => {
            return transformEvent(event)
        })
    },

    createEvent: async (args, req) => {   // when 'createEvents' property triggered, this function will fire off
        if (!req.isAuth) {
            throw new Error('User not authenticated')
        }
        try {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: args.eventInput.price,
                date: new Date(args.eventInput.date),
                creator: req.userId
            })
            const savedEvent = await event.save()
            const creator = await User.findById(req.userId)

            if (!creator) {
                throw new Error('No User found')
            }

            await creator.createdEvents.push(event)
            await creator.save()
            return transformEvent(savedEvent)
        } catch (err) {
            throw err
        }
    },
}
