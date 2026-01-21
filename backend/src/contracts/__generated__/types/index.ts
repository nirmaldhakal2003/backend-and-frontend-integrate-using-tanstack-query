import { z } from 'zod';
import type { Prisma } from '../client/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','password','createdAt','updatedAt']);

export const PostScalarFieldEnumSchema = z.enum(['id','title','content','published','authorId','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const userOrderByRelevanceFieldEnumSchema = z.enum(['name','email','password']);

export const NullsOrderSchema = z.enum(['first','last']);

export const postOrderByRelevanceFieldEnumSchema = z.enum(['title','content']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type user = z.infer<typeof userSchema>

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string().nullable(),
  published: z.boolean(),
  authorId: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type post = z.infer<typeof postSchema>
