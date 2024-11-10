import {graphql} from '../../gql';
<<<<<<< HEAD
<<<<<<< HEAD


=======
>>>>>>> parent of e0a6a2e (Adding profile page)
=======
>>>>>>> parent of e0a6a2e (Adding profile page)
export const verifyUserGoogleTokenQuery = graphql(
     `#graphql 
    query VerifyUserGoogleToken($token: String!){
        
        verifyGoogleToken(token:$token)
    }
`)

<<<<<<< HEAD
<<<<<<< HEAD
export const getCurrentUserQuery = graphql(`
=======
export const getCurrentUserQuery =graphql(`
>>>>>>> parent of e0a6a2e (Adding profile page)
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
<<<<<<< HEAD
            
        }
    }
`)
=======
        }
    }
    `)
>>>>>>> parent of e0a6a2e (Adding profile page)
=======
        }
    }
    `)
>>>>>>> parent of e0a6a2e (Adding profile page)
