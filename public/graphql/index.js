"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const load_files_1 = require("@graphql-tools/load-files");
const merge_1 = require("@graphql-tools/merge");
const schema_1 = require("@graphql-tools/schema");
const apollo_server_express_1 = require("apollo-server-express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const resolvers_1 = __importDefault(require("./resolvers"));
const loadSchemaFromFile = (filePath) => {
    const schemaString = fs_1.default.readFileSync(filePath, 'utf-8');
    return (0, apollo_server_express_1.gql)(schemaString);
};
const typeDefsArray = (0, load_files_1.loadFilesSync)(path_1.default.join(__dirname, './schemas'), { extensions: ['.graphql'] });
const characterSchemaPath = path_1.default.join(__dirname, './schemas/character.graphql');
const gameSchemaPath = path_1.default.join(__dirname, './schemas/game.graphql');
const developerSchemaPath = path_1.default.join(__dirname, './schemas/developer.graphql');
const characterSchema = loadSchemaFromFile(characterSchemaPath);
const gameSchema = loadSchemaFromFile(gameSchemaPath);
const developerSchema = loadSchemaFromFile(developerSchemaPath);
const mergedTypeDefs = (0, merge_1.mergeTypeDefs)([characterSchema, gameSchema, developerSchema]);
exports.schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: mergedTypeDefs,
    resolvers: resolvers_1.default,
});
