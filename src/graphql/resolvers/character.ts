import { IResolvers } from "@graphql-tools/utils";
import { Db, ObjectId } from "mongodb";
import { CHARACTERS_COLLECTION, GAMES_COLLECTION } from "../../mongodb/collections";
import {ICharacter} from '../../interfaces/ICharacter'
export const characterResolver: IResolvers = {
  Query: {
    async getCharacters(root: void, args: void, context: Db) {
      // return data.character
      try {
        return await context.collection(CHARACTERS_COLLECTION).find().toArray();
      } catch (error) {
        console.log(error);
      }
    },
    async getCharacter(root: void, args: any, context: Db) {
      try {
        return await context
          .collection(CHARACTERS_COLLECTION)
          .findOne({ _id: new ObjectId(args._id) });
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    async createCharacter(root: void, args: any, context: Db) {
      // args.character.id = `${data.character.length + 1} `
      // data.character.push(args.character)
      try {
        const regexp = new RegExp(args.character.name, 'i')
        const exists = await context.collection(CHARACTERS_COLLECTION).findOne({name:regexp})
        if(exists){
            throw new Error('This character already exist')
            return 'Character already exist'
        }
        await context
          .collection(CHARACTERS_COLLECTION)
          .insertOne(args.character);
        return "Character added successflly";
      } catch (error:any) {
        return error.message
        console.log(error);
      }
    },
    async editCharacter(root: void, {_id,character}:{_id:string,character:ICharacter}, context: Db) {
      try {
        const exists = await context
          .collection(CHARACTERS_COLLECTION)
          .findOne({ _id: new ObjectId(_id) });

        if (exists) {
          await context
            .collection(CHARACTERS_COLLECTION)
            .updateOne(
              { _id: new ObjectId(_id) },
              { $set: character }
            );
          return "Character updated successfully";
        }
        throw new Error('Character does not exist')
      } catch (error:any) {
        return error.message
      }
    },
  },

  Character: {
    async games(parent: ICharacter, args: void, context: any) {
      const gameList = parent.games.map(
        async (gameId) =>
          await context
            .collection(GAMES_COLLECTION)
            .findOne({ _id: new ObjectId(gameId) })
      );
      return gameList;
      //   const gameList: Array<any> = [];
      //   parent.games.map((gameId: any) =>
      //     gameList.push(
      //       ...data.games.filter((game) => game.id === parseInt(gameId))
      //     )
      //   );
      //   return gameList;
    },
  },
};
