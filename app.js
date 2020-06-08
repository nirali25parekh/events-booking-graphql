const bodyParser = require('body-parser')
const express = require('express')
const graphQlHttp = require('express-graphql') //-> returns a function
const { buildSchema } = require ('graphql') // returns object and we destructure it

const app = express()

var events = []

app.use(
    '/graphql',
 graphQlHttp({      //params:  schemas, resolvers necessary

     //schema     
    schema: buildSchema(`
        type Event {
            _id : ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        input EventInput {
            _id : ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: RootQuery,
            mutation: RootMutation,
        }
    `), 

    //  resolvers
    rootValue: {
        events: () => { // when 'events' property triggered, this function will fire off
            return events
        },
        createEvent : (args) => {   // when 'createEvents' property triggered, this function will fire off
            const event = {
                _id : args.eventInput._id,
                title: args.eventInput.title,
                description: args.eventInput.description,
                date: args.eventInput.date,
                price: args.eventInput.price,
            }
            events.push(event)
            return event
        }
    },   
    
    //for GUI
    graphiql: true,     
}))
app.listen(3000)