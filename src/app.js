import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import './mongoose-connect'
import schema from './graphql'
import jwt from 'express-jwt'

const port = 9001
const path = '/graphql'
const server = new ApolloServer({
    schema,
    playground: true,
    context: ({ req }) => ({ user: req.user }),
})
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
    path,
    jwt({
        secret: process.env.SECRET ?? 'default-secret',
        algorithms: ['HS256'],
        getToken: (req) => {
            if (req?.headers?.authorization?.split(' ')?.[0] === 'Bearer') {
                return req?.headers?.authorization?.split(' ')?.[1]
            }
            return null
        },
        credentialsRequired: false,
    }),
    (err, req, res, next) => {
        res.status(200).json({
          errors: [
            {
              message: err.message,
            },
          ],
        })
      },
)

server.applyMiddleware({ app, path })



app.listen({port}, () => {
    console.log(`http://localhost:${port}${server.graphqlPath}`)
})