import { Post } from "@prisma/client";
import { prismaClient } from "../clients/db";
import { GraphqlContext } from "../interfaces";
interface CreatePostPayload {
  content: string;
  imageUrl?: string;
}
const queries = {
  getAllPosts: async (parent: any, args: any, ctx: GraphqlContext) => {
    const posts = await prismaClient.post.findMany({
        orderBy: { createdAt: "desc" },
    });
    return posts;
  },
}
const mutations = {
  createPost: async (
    parent: any,
    { payload }: { payload: CreatePostPayload },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw new Error("You must be logged in to create a post");
    const post = await prismaClient.post.create({
      data:{
        content: payload.content,
        imageURL: payload.imageUrl,
        author: { connect: { id: String(ctx.user.id) } },
      }
    });
    return post;
  },
};
const extraResolvers = {
    Post:{
        author: (parent: Post) => prismaClient.user.findUnique({ where: { id: parent.authorId } }),
    }
};
export const resolvers = { mutations,extraResolvers,queries };
// export default resolvers;
