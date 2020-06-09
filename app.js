// packages
const bodyParser = require('body-parser')
const express = require('express')
const graphQlHttp = require('express-graphql') //-> returns a function
const { buildSchema } = require('graphql') // returns object and we destructure it
const mongoose = require('mongoose')
const colors = require('colors')
const bcrypt = require('bcryptjs')

// models
const Event = require('./models/Event')
const User = require('./models/User')

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
            creator: User!
        }

        type User {
            _id : ID!
            email : String!
            password: String
            createdEvents : [Event!]
        }
        
        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String
        }

        input UserInput {
            email : String!
            password: String!
        }

        type RootQuery {
            events: [Event!]!
            users: [User!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
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



            createEvent: async (args) => {   // when 'createEvents' property triggered, this function will fire off
                try {
                    const event = new Event({
                        title: args.eventInput.title,
                        description: args.eventInput.description,
                        price: args.eventInput.price,
                        date: new Date().toISOString(),
                        creator: '5edf66c3329c3a8148e6934c'
                    })
                    const savedEvent = event.save()
                    const creator = await User.findById('5edf66c3329c3a8148e6934c')

                    if (!creator) {
                        throw new Error('No User found')
                    }

                    await creator.createdEvents.push(event)
                    await creator.save()

                    return savedEvent
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
