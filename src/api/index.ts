import express from 'express';
import { createSchema, createYoga } from 'graphql-yoga';
import { readFileSync } from 'node:fs';
import { MutationCreateAnnotationArgs, Resolvers } from '../graphql/resolvers-types.ts';
import { createContext, type GraphQLContext } from './context.ts';
import { QueryGetAnnotationArgs } from '../graphql/graphql.ts';

// create an express api
const api = express();

// create a graphql schema
const typeDefs = readFileSync('./src/schema/schema.graphql', 'utf8');
const resolvers: Resolvers = {
  Query: {
    annotations: (_parent: unknown, _args: {}, context: GraphQLContext) => {
      return context.prisma.annotation.findMany();
    },
    getAnnotation: (_parent: unknown, args: QueryGetAnnotationArgs, context: GraphQLContext) => {
      return context.prisma.annotation.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  Mutation: {
    createAnnotation: async (
      _parent: unknown,
      args: MutationCreateAnnotationArgs,
      context: GraphQLContext,
    ) => {
      return context.prisma.annotation.create({
        data: {
          title: args.input?.title ?? '',
        },
      });
    },
  },
};

const schema = createSchema({ typeDefs, resolvers });

// create a graphql api
// @ts-ignore
const graphqlApi = createYoga({ schema, context: createContext });

// bind the graphql api to /graphql
api.use(graphqlApi.graphqlEndpoint, graphqlApi);

// start listening
api.listen(4000, () =>
  console.log('Running a GraphQL API server at http://localhost:4000' + graphqlApi.graphqlEndpoint),
);
