"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_merge_resolvers_1 = __importDefault(require("graphql-merge-resolvers"));
const character_1 = require("./character");
const game_1 = require("./game");
const developer_1 = require("./developer");
const resolvers = graphql_merge_resolvers_1.default.merge([
    character_1.characterResolver,
    game_1.gameResolvers,
    developer_1.developerResolvers
]);
exports.default = resolvers;
