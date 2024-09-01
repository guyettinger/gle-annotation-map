import type { GraphQLContext } from '../context.ts';

export const getAnnotations = (_parent: unknown, _args: {}, context: GraphQLContext) => {
  return context.prisma.annotation.findMany();
};
