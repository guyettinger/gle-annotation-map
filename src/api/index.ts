import express from 'express';
import { createSchema, createYoga } from 'graphql-yoga';
import { readFileSync } from 'node:fs';
import { createContext } from './context.ts';
import { Resolvers } from '../../graphql/server/resolvers-types.ts';
import { createAnnotation } from './annotation/createAnnotation.ts';
import { updateAnnotation } from './annotation/updateAnnotation.ts';
import { deleteAnnotation } from './annotation/deleteAnnotation.ts';
import { getAnnotation } from './annotation/getAnnotation.ts';
import { getAnnotations } from './annotation/getAnnotations.ts';

// create an express api
const api = express();

// create a graphql schema
const typeDefs = readFileSync('./graphql/schema.graphql', 'utf8');
const resolvers: Resolvers = {
  Query: {
    getAnnotations,
    getAnnotation,
  },
  Mutation: {
    createAnnotation,
    updateAnnotation,
    deleteAnnotation,
  },
};

const schema = createSchema({ typeDefs, resolvers });

// create a graphql api (using graphql-yoga)
// @ts-ignore
const graphqlApi = createYoga({ schema, context: createContext });

// bind the graphql api to /graphql
api.use(graphqlApi.graphqlEndpoint, graphqlApi);

// start listening
api.listen(4000, () =>
  console.log('Running a GraphQL API server at http://localhost:4000' + graphqlApi.graphqlEndpoint),
);
