import express, { Application } from 'express'
import cors from 'cors'
import {ApolloServer } from 'apollo-server-express'
import {schema} from './graphql'
import MongoLib from './mongodb'
import config from './config'

const app:Application = express()
app.use(cors())


async function startServer(){
    const server = new ApolloServer({
        schema,
        introspection:true,
        context:async()=>new MongoLib().connect()
        
    })
    await server.start()
    server.applyMiddleware({app: app as any})
    
    const PORT = 5000; // Define the port number
 
    app.listen(config.port, () => {
        console.log(`Server is running on http://localhost:${config.port}/graphql`)
    })

}

startServer()
