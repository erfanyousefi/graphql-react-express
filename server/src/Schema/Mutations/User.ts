import { raw } from "express"
import { GraphQLID, GraphQLString } from "graphql"
import { Users } from "../../Entities/Users"
import { ResultType } from "../TypeDefs/Result"
import { UserType } from "../TypeDefs/User"

export const CREATE_USER = {
    type: UserType,
    args: {
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    resolve: async (_: any, args: any) => {
        const { name, username, password } = args
        const {raw} = await Users.insert({ name, username, password })
        return {...args, id : raw.insertId}
    }
}
export const DELETE_USER = {
    type : ResultType,
    args : {
        id : {type : GraphQLID}
    },
    resolve : async (_ : any, args : any) => {
        const {id} = args;
        const user = await Users.findOne({id});
        if(!user) return {status : 404, message : "NotFound", success : false}
        const result = await Users.delete({id});
        if(result.affected) return {status : 200, success : true, message : "remove done!"}
        return {status : 404, success : false, message : "can't remove"}
    }
}

export const UPDATE_PASSWORD = {
    type : ResultType,
    args : {
        id : {type : GraphQLID},
        oldPassword : {type : GraphQLString},
        newPassword : {type : GraphQLString}
    },
    resolve : async (_ : any, args : any) => {
        const {id, oldPassword, newPassword} = args;
        const user = await Users.findOne({id});
        if(!user) return {status : 404, success : false, message : "NotFound"}
        if(user.password !== oldPassword) return {status : 400, success : false, message : "your old password is mistak"}
        const result = await Users.update({id}, {password : newPassword});
        if(!result.affected) return {status : 405, success : false, message : "no fields changes"}
        return {status : 200, success : true, message : "update password Done!"}
    }
}