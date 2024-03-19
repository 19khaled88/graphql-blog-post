import {IResolvers} from '@graphql-tools/utils'
import data from '../../db/data.json'
export const gameResolvers:IResolvers ={
    Query:{
        getGames(){
            return data.games
        },
        gameHello(){
            return "game works"
        }
    }
}