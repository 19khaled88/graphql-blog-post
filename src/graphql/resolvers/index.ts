import GMR from 'graphql-merge-resolvers'
import { characterResolver } from './character'
import { gameResolvers } from './game'
import {developerResolvers} from './developer'

// const resolvers:IResolvers = {
//     Query: {
//         hello() {
//             return 'World'
//         },
//         getCharacters() {
//             return [
//                 {
//                     id: 1,
//                     name: 'khaled',
//                     race: 'HYLIAN'

//                 },
//                 {
//                     id: 2,
//                     name: 'khaled',
//                     race: 'HYLIAN'

//                 }
//             ]
//         },
//         getGames(){
//             return[
//                 {
//                     id:1,
//                     title:'Football'
//                 },
//                 {
//                     id:2,
//                     title:'Cricket'
//                 }
//             ]
//         }
//     }
// }

const resolvers:any = GMR.merge([
    characterResolver,
    gameResolvers,
    developerResolvers
])

export default resolvers
