import { IResolvers } from '@graphql-tools/utils'
import { Db, ObjectId } from 'mongodb'
import { DEVELOPER_COLLECTION, GAMES_COLLECTION } from '../../mongodb/collections'
export const gameResolvers:IResolvers ={
    Query:{
        async getGames(root:void, args:any, context:Db){
            try {
                return await context.collection(GAMES_COLLECTION).find().toArray()
            } catch (error) {
                console.log(error)
            }
        }
    },
    Mutation:{
        async createGame(root:void, args:any, context:Db){
            try {
                await context.collection(GAMES_COLLECTION).insertOne(args.game)
                return `Game ${args.title} added successfully`
            } catch (error) {
                console.log(error)
            }
        }
    },
    Game:{
        async developers(parent:any, args:void, context:Db) {
            const devList = parent.developers.map(async(id:string) =>
            await context.collection(DEVELOPER_COLLECTION).findOne({_id:new ObjectId(id)})
            )
            console.log(devList)
            return devList
        }
    }
}