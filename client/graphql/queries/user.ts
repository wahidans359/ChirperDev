import { gql } from 'graphql-request';
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

export const getCurrentUserQuery = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      email
      profileImageURL
      firstName
      lastName
      posts{
        id
        content
        author{
            id
            firstName
            lastName
            profileImageURL
        }
      }
    }
  }
`

export const getUserByIdQuery = graphql(`
    #graphql
    
    query GetUserById($id: ID!){
        getUserById(id:$id){
            id
            email
            profileImageURL
            firstName
            lastName
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
