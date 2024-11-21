export const types = `#graphql
    input CreatePostData{
        imageUrl: String
        content: String!
    }
    type Post{
        id: ID!
        imageUrl: String
        content: String!
        createdAt: String
        author: User
    }
`;