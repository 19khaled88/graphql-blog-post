import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { gql } from 'apollo-server-express';
import fs from 'fs';
import { DocumentNode } from 'graphql';
import path from 'path';
import resolvers from './resolvers';


// Function to read the schema files and load them as DocumentNode
const loadSchemaFromFile = (filePath: string): DocumentNode => {
    const schemaString = fs.readFileSync(filePath, 'utf-8');
    return gql(schemaString);
  };


// Load all GraphQL type definitions
const typeDefsArray = loadFilesSync(path.join(__dirname, './schemas'), { extensions: ['.graphql'] });

const characterSchemaPath = path.join(__dirname, './schemas/character.graphql');
const gameSchemaPath = path.join(__dirname, './schemas/game.graphql');


// Load schema files and convert them to DocumentNode
const characterSchema: DocumentNode = loadSchemaFromFile(characterSchemaPath);
const gameSchema: DocumentNode = loadSchemaFromFile(gameSchemaPath);


// Merge all type definitions into a single schema definition
const mergedTypeDefs = mergeTypeDefs([characterSchema, gameSchema]);

// Provide the merged type definitions and resolvers to makeExecutableSchema
export const schema = makeExecutableSchema({
  typeDefs: mergedTypeDefs,
  resolvers: resolvers, // You should provide your resolvers here
});


