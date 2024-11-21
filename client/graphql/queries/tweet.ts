import { graphql } from "@/gql";
export const getAllPostsQuery = graphql(
  `
    #graphql
    query GetAllPosts {
      getAllPosts {
        id
        content
        imageUrl
        createdAt
        author {
          id
          firstName
          lastName
          profileImageURL
        }
      }
    }
  `
);

export const getSignedURLForPostQuery = graphql(`
  query GetSignedURL($imageName: String!,$imageType: String!) {
    getSignedURLForPost(imageName: $imageName, imageType: $imageType)
  }
`);
