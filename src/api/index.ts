import express from 'express';
import { createSchema, createYoga } from 'graphql-yoga';
import { readFileSync } from 'node:fs';
import { Resolvers } from '../graphql/resolvers-types.ts';

// create an express api
const api = express();

// create a graphql schema
const typeDefs = readFileSync('./src/schema/schema.graphql', 'utf8');
const resolvers: Resolvers = {
  Query: {
    // typed resolvers!
    annotations: () => {
      return [
        { id: 1, title: 'first' },
        { id: 2, title: 'second' },
      ];
    },
  },
};

const schema = createSchema({ typeDefs, resolvers });

// create a graphql api
const graphqlApi = createYoga({ schema });

// bind the graphql api to /graphql
api.use(graphqlApi.graphqlEndpoint, graphqlApi);

// start listening
api.listen(4000, () =>
  console.log('Running a GraphQL API server at http://localhost:4000' + graphqlApi.graphqlEndpoint),
);
