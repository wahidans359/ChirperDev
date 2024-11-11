/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  #graphql\n  mutation CreatePost($payload: CreatePostData!) {\n    createPost(payload: $payload) {\n      id\n    }\n  }\n": types.CreatePostDocument,
    "#graphql\n    mutation FollowUser($to:ID!) {\n        followUser(to:$to)\n    }\n": types.FollowUserDocument,
    "#graphql\n    mutation UnFollowUser($to:ID!) {\n        unfollowUser(to:$to)\n    }\n": types.UnFollowUserDocument,
    "\n    #graphql\n    query GetAllPosts {\n      getAllPosts {\n        id\n        content\n        imageUrl\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  ": types.GetAllPostsDocument,
    "\n  query GetSignedURL($imageName: String!,$imageType: String!) {\n    getSignedURLForPost(imageName: $imageName, imageType: $imageType)\n  }\n": types.GetSignedUrlDocument,
    "#graphql \n    query VerifyUserGoogleToken($token: String!){\n        \n        verifyGoogleToken(token:$token)\n    }\n": types.VerifyUserGoogleTokenDocument,
    "\n  #graphql\n  query GetCurrentUser {\n    getCurrentUser {\n      id\n      email\n      profileImageURL\n      firstName\n      lastName\n      recommendedUsers{\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      followers{\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      following{\n        id\n        firstName\n        lastName\n        profileImageURL\n      }      \n      posts{\n        id\n        content\n        imageUrl\n        author{\n            id\n            firstName\n            lastName\n            profileImageURL\n        }\n      }\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n    #graphql\n    \n    query GetUserById($id: ID!){\n        getUserById(id:$id){\n            id\n            email\n            profileImageURL\n            firstName\n            lastName\n            followers{\n              id\n              firstName\n              lastName\n              profileImageURL\n            }\n            following{\n              id\n              firstName\n              lastName\n              profileImageURL\n            }\n            posts{\n                id\n                content\n                author{\n                    firstName\n                    lastName\n                    profileImageURL\n                }\n            }\n        }\n    }\n": types.GetUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation CreatePost($payload: CreatePostData!) {\n    createPost(payload: $payload) {\n      id\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  mutation CreatePost($payload: CreatePostData!) {\n    createPost(payload: $payload) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation FollowUser($to:ID!) {\n        followUser(to:$to)\n    }\n"): (typeof documents)["#graphql\n    mutation FollowUser($to:ID!) {\n        followUser(to:$to)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation UnFollowUser($to:ID!) {\n        unfollowUser(to:$to)\n    }\n"): (typeof documents)["#graphql\n    mutation UnFollowUser($to:ID!) {\n        unfollowUser(to:$to)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query GetAllPosts {\n      getAllPosts {\n        id\n        content\n        imageUrl\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  "): (typeof documents)["\n    #graphql\n    query GetAllPosts {\n      getAllPosts {\n        id\n        content\n        imageUrl\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSignedURL($imageName: String!,$imageType: String!) {\n    getSignedURLForPost(imageName: $imageName, imageType: $imageType)\n  }\n"): (typeof documents)["\n  query GetSignedURL($imageName: String!,$imageType: String!) {\n    getSignedURLForPost(imageName: $imageName, imageType: $imageType)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql \n    query VerifyUserGoogleToken($token: String!){\n        \n        verifyGoogleToken(token:$token)\n    }\n"): (typeof documents)["#graphql \n    query VerifyUserGoogleToken($token: String!){\n        \n        verifyGoogleToken(token:$token)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query GetCurrentUser {\n    getCurrentUser {\n      id\n      email\n      profileImageURL\n      firstName\n      lastName\n      recommendedUsers{\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      followers{\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      following{\n        id\n        firstName\n        lastName\n        profileImageURL\n      }      \n      posts{\n        id\n        content\n        imageUrl\n        author{\n            id\n            firstName\n            lastName\n            profileImageURL\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetCurrentUser {\n    getCurrentUser {\n      id\n      email\n      profileImageURL\n      firstName\n      lastName\n      recommendedUsers{\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      followers{\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      following{\n        id\n        firstName\n        lastName\n        profileImageURL\n      }      \n      posts{\n        id\n        content\n        imageUrl\n        author{\n            id\n            firstName\n            lastName\n            profileImageURL\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    \n    query GetUserById($id: ID!){\n        getUserById(id:$id){\n            id\n            email\n            profileImageURL\n            firstName\n            lastName\n            followers{\n              id\n              firstName\n              lastName\n              profileImageURL\n            }\n            following{\n              id\n              firstName\n              lastName\n              profileImageURL\n            }\n            posts{\n                id\n                content\n                author{\n                    firstName\n                    lastName\n                    profileImageURL\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    \n    query GetUserById($id: ID!){\n        getUserById(id:$id){\n            id\n            email\n            profileImageURL\n            firstName\n            lastName\n            followers{\n              id\n              firstName\n              lastName\n              profileImageURL\n            }\n            following{\n              id\n              firstName\n              lastName\n              profileImageURL\n            }\n            posts{\n                id\n                content\n                author{\n                    firstName\n                    lastName\n                    profileImageURL\n                }\n            }\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;