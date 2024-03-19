import { IResolvers } from '@graphql-tools/utils'
import data from '../../db/data.json'
export const characterResolver:IResolvers = {
    Query: {
        getCharacters() {
            return data.character
        },
        getCharacter(root:void,args:any){
            console.log(args)
            const found = data.character.filter(ch => ch.id === parseInt(args.id)) 
            console.log(found)
        }
      
    },
    Mutation:{
        createCharacter(root:void, args:any){
            args.character.id = `${data.character.length + 1} `
            data.character.push(args.character) 
            return 'Character added successflly'
        }
    },
    Character:{
        games(parent:any,args:any,context:any,options:any){
            const gameList:Array<any> = []
            parent.games.map((gameId:any)=> gameList.push(...data.games.filter(game=>game.id === parseInt(gameId))))
            return (gameList)
        }
    }
}

