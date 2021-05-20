import mongoose from 'mongoose'
import { composeWithMongooseDiscriminators } from 'graphql-compose-mongoose'

const { Schema } = mongoose
const enumPostType = {
    STATUS: 'StatusPost',
    PHOTO: 'PhotoPost'
}

const PostSchema = new Schema({
    timestamp: {type: Date, default: Date.now()},
    postById: {type: String, ref: 'User', require: true},
    type: {type: String, enum: Object.keys(enumPostType), require: true}
})

const StatusPostSchema = new Schema({
    status: {type: String, require: true},
})

const PhotoPostSchema = new Schema({
    caption: {type: String, require: true},
    url: {type: String, require: true}
})

PostSchema.set('discriminatorKey', 'type')

const discriminatorOptions = {
    inputType: {
      removeFields: ['timestamp'],
    },
  }


export const PostModel = mongoose.model('Post', PostSchema)
export const StatusPostModel = PostModel.discriminator(enumPostType.STATUS, StatusPostSchema)
export const PhotoPostModel = PostModel.discriminator(enumPostType.PHOTO, PhotoPostSchema)

export const PostTC = composeWithMongooseDiscriminators(PostModel)
export const StatusPostTC = PostTC.discriminator(StatusPostModel, {name: enumPostType.STATUS, ...discriminatorOptions})
export const PhotoPostTC = PostTC.discriminator(PhotoPostModel, {name: enumPostType.PHOTO, ...discriminatorOptions})
export default PostModel