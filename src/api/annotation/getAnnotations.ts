import type { GraphQLContext } from '../context.ts';
import { QueryGetAnnotationsArgs } from '../../../graphql/server/resolvers-types.ts';

export const getAnnotations = async (
  _parent: unknown,
  args: QueryGetAnnotationsArgs,
  context: GraphQLContext,
) => {
  const where = args.input?.filter
    ? {
        OR: [{ symbol: { contains: args.input.filter } }, { note: { contains: args.input.filter } }],
      }
    : {};

  const totalCount = await context.prisma.annotation.count({ where });
  const annotations = await context.prisma.annotation.findMany({
    where,
    skip: args.input?.skip ?? 0,
    take: args.input?.take ?? 10,
    //orderBy: args.input?.orderBy ? args.input.orderBy : undefined,
  });

  return {
    count: totalCount,
    annotations,
  };
};
