import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const todoRouter = createTRPCRouter({
  createTodo: publicProcedure
    .input(z.object({
      text: z.string(),
      completed: z.boolean(),
    }))
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.todo.create({
        data: {
          ...input,
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-non-null-assertion
          userId: ctx?.session!.user!.id
        }
      })
    }),
  getAllTodos: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany({
      orderBy: {
        createdAt: "asc"
      }
    });
  }),
  updateTodo: protectedProcedure
    .input(z.object({
      id: z.string(),
      text: z.string().optional(),
      completed: z.boolean().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.todo.update({
        data: {
          text: input.text,
          completed: input.completed,
        },
        where: {
          id: input.id
        }
      })
    }),
  deleteTodo: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.todo.delete({
        where: {
          id: input.id
        }
      })
    })
});
