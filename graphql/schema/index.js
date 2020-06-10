const { buildSchema } = require('graphql') // we destructure it

module.exports = buildSchema(`
type Booking {
    _id: ID!
    user: User!
    event: Event!
    createdAt: String!
    updatedAt: String!
}

type Event {
    _id : ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
}

type User {
    _id : ID!
    email : String!
    password: String
    createdEvents : [Event!]
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
}

input UserInput {
    email : String!
    password: String!
}

input AuthInput {
    email : String!
    password: String!
}

type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
    login(authInput: AuthInput) : AuthData!
}

type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
}

schema {
    query: RootQuery,
    mutation: RootMutation,
}
`)