import { graphql } from "@/gql";
export const getAllPostsQuery = graphql(
  `
    #graphql
    query GetAllPosts {
      getAllPosts {
        id
        content
        imageUrl
        author {
          firstName
          lastName
          profileImageURL
        }
      }
    }
  `
);
