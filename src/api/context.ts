import { PrismaClient } from '@prisma/client'

export type GraphQLContext = {
  prisma: PrismaClient
}

const prisma = new PrismaClient()

export function createContext(): GraphQLContext {
  return { prisma }
}