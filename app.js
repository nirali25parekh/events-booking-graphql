// packages
const bodyParser = require('body-parser')
const express = require('express')
const graphQlHttp = require('express-graphql') //-> returns a function
const { buildSchema } = require('graphql') // returns object and we destructure it
const mongoose = require('mongoose')
const colors = require('colors')

// models
const Event = require('./models/Event')

const app = express()

// var events = []

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
            title: String!
            description: String!
            price: Float!
            date: String
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
                events = Event.find()
                return events
                
            },

            createEvent: (args) => {   // when 'createEvents' property triggered, this function will fire off
                const event = new Event({
                    title: args.eventInput.title,
                    description: args.eventInput.description,
                    price: args.eventInput.price,
                    date: new Date(),
                })
                    return event        // tells mongodb to wait, its asynchronous, will return something
                    .save()
                    .then((result)=> {
                        return result
                    })
                    .catch(err=> {
                        console.log(err)
                        throw err
                    })
                
            }
        },

        //for GUI
        graphiql: true,
    }))

mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-vg6by.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    .then(() => {
        console.log(`Database connected ${process.env.MONGO_DB}`.yellow)
        app.listen(3000)
    })
    .catch(err => {
        console.log(err).red
        throw err
    })
