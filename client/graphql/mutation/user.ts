import { graphql } from "@/gql";

export const folllowUserMutation = graphql(`#graphql
    mutation FollowUser($to:ID!) {
        followUser(to:$to)
    }
`);
export const unfolllowUserMutation = graphql(`#graphql
    mutation UnFollowUser($to:ID!) {
        unfollowUser(to:$to)
    }
`);