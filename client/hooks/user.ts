import { graphqlClient } from "@/clients/api"
import { getCurrentUserQuery, getUserByIdQuery } from "@/graphql/queries/user"
import { useQuery } from "@tanstack/react-query"
import { DocumentNode } from "graphql"


export const useCurrentUser = () =>{
    const query = useQuery({
        queryKey:['current-user'],
        queryFn: () => graphqlClient.request(getCurrentUserQuery as unknown as DocumentNode)
    })
    return {...query,user:query.data?.getCurrentUser }
}

export const useGetUserById = (id: string) => {
   
    const query = useQuery({
        queryKey: ["user", id], // ['user', id]
        queryFn: () => graphqlClient.request(getUserByIdQuery as unknown as DocumentNode, { id }),
    });
    return query;

}