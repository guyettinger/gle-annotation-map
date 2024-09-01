import { QueryGetAnnotationArgs } from '../../../graphql/server/resolvers-types.ts';
import type { GraphQLContext } from '../context.ts';

export const getAnnotation = (
  _parent: unknown,
  args: QueryGetAnnotationArgs,
  context: GraphQLContext,
) => {
  return context.prisma.annotation.findUnique({
    where: {
      id: args.id,
    },
  });
};
