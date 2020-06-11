// packages
const bodyParser = require('body-parser')
const express = require('express')
const graphQlHttp = require('express-graphql') //-> returns a function
const mongoose = require('mongoose')
const colors = require('colors')

//graphql schemas and resolvers
const graphQlSchema = require('./graphql/schema/index')
const graphQlResolver = require('./graphql/resolver/index')

// middleware
const isAuth = require('./middleware/isAuth')

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

app.use(isAuth)

app.use(
    '/graphql',
    graphQlHttp({      //params:  schemas, resolvers necessary
        //schema     
        schema: graphQlSchema,
        //  resolvers
        rootValue: graphQlResolver,
        //for GUI
        graphiql: true,
    }))

mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-vg6by.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    .then(() => {
        console.log(`Database connected ${process.env.MONGO_DB}`.yellow)
        app.listen(8000)
    })
    .catch(err => {
        console.log(err).red
        throw err
    })
