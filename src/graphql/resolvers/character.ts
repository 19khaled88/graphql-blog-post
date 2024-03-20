import { IResolvers } from "@graphql-tools/utils";
import data from "../../db/data.json";
import { Db } from "mongodb";
export const characterResolver: IResolvers = {
  Query: {
    async getCharacters(root: void, args: void, context: Db) {
      // return data.character
      try {
        return await context.collection("characters").find().toArray();
      } catch (error) {
        console.log(error);
      }
    },
    getCharacter(root: void, args: any) {
      console.log(args);
      const found = data.character.filter((ch) => ch.id === parseInt(args.id));
      console.log(found);
    },
  },
  Mutation: {
    async createCharacter(root: void, args: any, context: Db) {
      // args.character.id = `${data.character.length + 1} `
      // data.character.push(args.character)
      try {
        await context.collection("characters").insertOne(args.character);
        return "Character added successflly";
      } catch (error) {
        console.log(error);
      }
    },
  },
  Character: {
    games(parent: any, args: any, context: any, options: any) {
      const gameList: Array<any> = [];
      parent.games.map((gameId: any) =>
        gameList.push(
          ...data.games.filter((game) => game.id === parseInt(gameId))
        )
      );
      return gameList;
    },
  },
};
