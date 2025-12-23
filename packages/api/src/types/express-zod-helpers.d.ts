import { RequestHandler } from 'express';
import { z } from 'zod';

// Helper type to extract parameters from Zod schema
export type ExtractedParams<T extends z.AnyZodObject> = T extends z.ZodObject<{
  params: infer P;
}>
  ? z.infer<P>
  : never;

// Helper type to extract body from Zod schema
export type ExtractedBody<T extends z.AnyZodObject> = T extends z.ZodObject<{
  body: infer B;
}>
  ? z.infer<B>
  : never;

// Helper type to extract query from Zod schema
export type ExtractedQuery<T extends z.AnyZodObject> = T extends z.ZodObject<{
  query: infer Q;
}>
  ? z.infer<Q>
  : never;

// Generic RequestHandler that can be used with Zod schemas
export type ValidatedRequestHandler<
  P extends z.AnyZodObject = z.AnyZodObject,
  ResBody = any,
  ReqBody extends z.AnyZodObject = z.AnyZodObject,
  ReqQuery extends z.AnyZodObject = z.AnyZodObject,
> = RequestHandler<
  ExtractedParams<P>,
  ResBody,
  ExtractedBody<ReqBody>,
  ExtractedQuery<ReqQuery>
>;
