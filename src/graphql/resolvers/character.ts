import { IResolvers } from "@graphql-tools/utils";
import { Db, ObjectId } from "mongodb";
import { CHARACTERS_COLLECTION, GAMES_COLLECTION } from "../../mongodb/collections";
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
        await context
          .collection(CHARACTERS_COLLECTION)
          .insertOne(args.character);
        return "Character added successflly";
      } catch (error) {
        console.log(error);
      }
    },
    async editCharacter(root: void, args: any, context: Db) {
      try {
        const exists = await context
          .collection(CHARACTERS_COLLECTION)
          .findOne({ _id: new ObjectId(args._id) });

        if (exists) {
          await context
            .collection(CHARACTERS_COLLECTION)
            .updateOne(
              { _id: new ObjectId(args._id) },
              { $set: args.character }
            );
          return "Character updated successfully";
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  Character: {
    async games(parent: any, args: void, context: any) {
      const gameList = parent.games.map(
        async (gameId: string) =>
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
