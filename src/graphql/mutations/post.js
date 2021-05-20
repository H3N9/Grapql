import { schemaComposer } from 'graphql-compose'
import {StatusPostTC, PhotoPostTC, PostTC, PostModel} from '../../models'

export const createStatusPost = StatusPostTC.getResolver('createOne').wrapResolve(
    (next) => async (req) => {
        if(!req.context?.user){
            throw new Error("Unauthorize")
        }
        return next({...req})
    }
)
export const createPhotoPost = PhotoPostTC.getResolver('createOne')

const specialInput = schemaComposer.createInputTC({
    name: 'speacialInput',
    fields: {
        status: "String!",
        postById: "String!"
    }
})

export const specialType = schemaComposer.createResolver({
    name: 'specialType',
    args: {record: specialInput},
    type: PostTC,
    resolve: async ({args, context}) => {
        if(!context?.user){
            throw new Error("Unauthorize")
        }
        const {postById, status} = args.record
        const post = await PostModel.findById(postById)
        console.log(post)
        return post
    }
})