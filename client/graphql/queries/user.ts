// import { gql } from 'graphql-request';
import {graphql} from '../../gql';

export const verifyUserGoogleTokenQuery = graphql(
     `#graphql 
    query VerifyUserGoogleToken($token: String!){
        
        verifyGoogleToken(token:$token)
    }
`)


// export const getCurrentUserQuery = graphql(`
//     query GetCurrentUser{
//         getCurrentUser {
//             id
//             email
//             profileImageURL
//             firstName
//             lastName
//         }
//     }
// `) as const;

export const getCurrentUserQuery = graphql(`
  #graphql
  query GetCurrentUser {
    getCurrentUser {
      id
      email
      profileImageURL
      firstName
      lastName
      recommendedUsers{
        id
        firstName
        lastName
        profileImageURL
      }
      followers{
        id
        firstName
        lastName
        profileImageURL
      }
      following{
        id
        firstName
        lastName
        profileImageURL
      }      
      posts{
        id
        content
        imageUrl
        author{
            id
            firstName
            lastName
            profileImageURL
        }
      }
    }
  }
`)

export const getUserByIdQuery = graphql(`
    #graphql
    
    query GetUserById($id: ID!){
        getUserById(id:$id){
            id
            email
            profileImageURL
            firstName
            lastName
            followers{
              id
              firstName
              lastName
              profileImageURL
            }
            following{
              id
              firstName
              lastName
              profileImageURL
            }
            posts{
                id
                content
                author{
                    firstName
                    lastName
                    profileImageURL
                }
            }
        }
    }
`)  
