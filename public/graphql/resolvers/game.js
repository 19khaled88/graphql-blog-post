"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameResolvers = void 0;
const mongodb_1 = require("mongodb");
const collections_1 = require("../../mongodb/collections");
exports.gameResolvers = {
    Query: {
        getGames(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield context.collection(collections_1.GAMES_COLLECTION).find().toArray();
                }
                catch (error) {
                    console.log(error);
                }
            });
        }
    },
    Mutation: {
        createGame(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield context.collection(collections_1.GAMES_COLLECTION).insertOne(args.game);
                    return `Game ${args.title} added successfully`;
                }
                catch (error) {
                    console.log(error);
                }
            });
        }
    },
    Game: {
        developers(parent, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const devList = parent.developers.map((id) => __awaiter(this, void 0, void 0, function* () { return yield context.collection(collections_1.DEVELOPER_COLLECTION).findOne({ _id: new mongodb_1.ObjectId(id) }); }));
                return devList;
            });
        }
    }
};
