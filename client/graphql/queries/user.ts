import {graphql} from '../../gql';
<<<<<<< HEAD


=======
>>>>>>> parent of e0a6a2e (Adding profile page)
export const verifyUserGoogleTokenQuery = graphql(
     `#graphql 
    query VerifyUserGoogleToken($token: String!){
        
        verifyGoogleToken(token:$token)
    }
`)

<<<<<<< HEAD
export const getCurrentUserQuery = graphql(`
=======
export const getCurrentUserQuery =graphql(`
>>>>>>> parent of e0a6a2e (Adding profile page)
    query GetCurrentUser{
        getCurrentUser {
            id
            email
            profileImageURL
            firstName
            lastName
<<<<<<< HEAD
            
        }
    }
`)
=======
        }
    }
    `)
>>>>>>> parent of e0a6a2e (Adding profile page)
