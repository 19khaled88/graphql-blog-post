import {IResolvers} from '@graphql-tools/utils'

const resolvers:IResolvers = {
    Query: {
        hello() {
            return 'World'
        },
        getCharacters() {
            return [
                {
                    id: 1,
                    name: 'khaled',
                    race: 'HYLIAN'

                },
                {
                    id: 2,
                    name: 'khaled',
                    race: 'HYLIAN'

                }
            ]
        },
        getGames(){
            return[
                {
                    id:1,
                    title:'Football'
                },
                {
                    id:2,
                    title:'Cricket'
                }
            ]
        }
    }
}

export default resolvers
