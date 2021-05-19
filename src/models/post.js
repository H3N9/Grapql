import mongoose from 'mongoose'
import { composeWithMongooseDiscriminators } from 'graphql-compose-mongoose'

const { Schema } = mongoose
const enumPostType = {
    STATUS: 'StatusPost',
    PHOTO: 'Photo'
}

const PostSchema = new Schema({
    timestamp: {type: Date, default: Date.now()},
    postById: {type: String, ref: 'User', require: true},
    type: {type: String, enum: Object.keys(enumPostType), require: true}
})

const StatusSchema = new Schema({
    status: {type: String, require: true},
})

const PhotoSchema = new Schema({
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
export const StatusModel = PostModel.discriminator(enumPostType.STATUS, StatusSchema)
export const PhotoModel = PostModel.discriminator(enumPostType.PHOTO, PhotoSchema)

export const PostTC = composeWithMongooseDiscriminators(PostModel)
export const StatusTC = PostTC.discriminator(StatusModel, {name: enumPostType.STATUS, ...discriminatorOptions})
export const PhotoTC = PostTC.discriminator(PhotoModel, {name: enumPostType.PHOTO, ...discriminatorOptions})
export default PostModel