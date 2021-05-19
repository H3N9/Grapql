import {StatusTC, PhotoTC} from '../../models'

export const createStatus = StatusTC.getResolver('createOne')
export const createPhoto = PhotoTC.getResolver('createOne')