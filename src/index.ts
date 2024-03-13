import express, { Application } from 'express'
import cors from 'cors'
import {ApolloServer } from 'apollo-server-express'
import {schema} from './graphql'

const app:Application = express()
app.use(cors())


async function startServer(){
    const server = new ApolloServer({
        schema,
        introspection:true
        
    })
    await server.start()
    server.applyMiddleware({app: app as any})
    
    const PORT = 5000; // Define the port number
 
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })

}

startServer()
