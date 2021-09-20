import { GraphQLList, GraphQLString } from "graphql"
import { Users } from "../../Entities/Users"
import { UserType } from "../TypeDefs/User"

export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    resolve: () => {
        return Users.find({
            order: {
                id : 'DESC'
            }
        })
    }
}