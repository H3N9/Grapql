import mongoose from 'mongoose'
import { composeWithMongooseDiscriminators } from 'graphql-compose-mongoose'


const { Schema } = mongoose

const enumTypeComment = {
    PHOTO: 'PhotoComment',
    CAPTION: 'CaptionComment'
}

const CommentSchema = new Schema({
    type: {type: String, enum: Object.keys(enumTypeComment)},
    timestamp: {type: Date, default: Date.now()},
    postById: {type: String, require: true, ref: 'Post'}
})

const CaptionCommentSchema = new Schema({
    caption: {type: String, require: true}
})

const PhotoCommentSchema = new Schema({
    caption: {type: String},
    url: {type: String, require: true}
})

CommentSchema.set('discriminatorKey', 'type')

const discriminatorOptions = {
    inputType: {
      removeFields: ['timestamp'],
    },
}

export const CommentModel = mongoose.model('Comment', CommentSchema)
export const PhotoCommentModel = CommentModel.discriminator(enumTypeComment.PHOTO, PhotoCommentSchema)
export const CaptionCommentModel = CommentModel.discriminator(enumTypeComment.CAPTION, CaptionCommentSchema)

export const CommentTC = composeWithMongooseDiscriminators(CommentModel)
export const PhotoCommentTC = CommentTC.discriminator(PhotoCommentModel, {name: enumTypeComment.PHOTO, ...discriminatorOptions})
export const CaptionCommentTC = CommentTC.discriminator(CaptionCommentModel, {name: enumTypeComment.CAPTION, ...discriminatorOptions})

export default CommentModel