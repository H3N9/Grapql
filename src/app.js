import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import './mongoose-connect'
import schema from './graphql'

const port = 9000
const server = new ApolloServer({
    schema,
    playground: true
})
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

server.applyMiddleware({ app })



app.listen({port}, () => {
    console.log(`http://localhost:${port}${server.graphqlPath}`)
})