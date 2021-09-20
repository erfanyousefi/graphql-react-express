import { GraphQLBoolean, GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

export const ResultType = new GraphQLObjectType({
    name: "Result",
    fields: {
        code: { type: GraphQLID },
        status: { type: GraphQLID },
        error: { type: GraphQLString },
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
    }
})