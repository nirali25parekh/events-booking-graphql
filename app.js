const bodyParser = require('body-parser')
const express = require('express')
const graphQlHttp = require('express-graphql') //-> returns a function
const { buildSchema } = require ('graphql') // returns object and we destructure it

const app = express()

app.use(
    '/graphql',
 graphQlHttp({      //params:  schemas, resolvers necessary

     //schema     
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(name: String): String
        }

        schema {
            query: RootQuery,
            mutation: RootMutation,
        }
    `), 

    //  resolvers
    rootValue: {
        events: () => { // when 'events' property triggered, this function will fire off
            return ['1', '2', '3', '4']
        },
        createEvent : (args) => {   // when 'createEvents' property triggered, this function will fire off
            return args.name
        }
    },   
    
    //for GUI
    graphiql: true,     
}))
app.listen(3000)