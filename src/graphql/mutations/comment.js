import {CaptionCommentTC, PhotoCommentTC} from '../../models'
import { authorize } from './middleware'

export const createCaptionComment = CaptionCommentTC.getResolver('createOne', [authorize])
export const createPhotoComment = PhotoCommentTC.getResolver('createOne')