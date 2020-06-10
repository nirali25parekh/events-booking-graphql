

// note number : 1 => conversion string to Date format (otherwise date look like '1591706834535')
const transformDate = date => new Date(date).toISOString()

const transformBooking = booking => {
    return {
        ...booking._doc,
        createdAt: transformDate(booking._doc.createdAt),
        updatedAt: transformDate(booking._doc.updatedAt)
    }
}

const transformEvent = event => {
    return {
        ...event._doc,      //all the event data
        date: transformDate(event._doc.date)
    }
}

exports.transformDate = transformDate
exports.transformEvent = transformEvent
exports.transformBooking = transformBooking
