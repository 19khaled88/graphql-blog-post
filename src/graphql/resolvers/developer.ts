import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";
import { DEVELOPER_COLLECTION } from "../../mongodb/collections";
export const developerResolvers: IResolvers = {
  Query: {
    async getDevelopers(root: void, args: any, context: Db) {
      try {
       return await context.collection(DEVELOPER_COLLECTION).find().toArray()
      } catch (error) {
        console.log(error)
      }
    },
  },

  Mutation: {
    async createDeveloper(root: void, args: any, context: Db) {
      try {
        await context
          .collection(DEVELOPER_COLLECTION)
          .insertOne(args.developer);
        return "Developer added successfully";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
