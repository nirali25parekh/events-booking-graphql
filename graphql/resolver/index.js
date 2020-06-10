const bookingResolver = require('../resolver/booking')
const eventResolver = require('../resolver/event')
const userResolver = require('../resolver/user')

const rootResolver = {
    ...bookingResolver,
    ...eventResolver,
    ...userResolver,
}

module.exports = rootResolver