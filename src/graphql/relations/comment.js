import {CommentTC, PostTC} from '../../models'


CommentTC.addRelation(
    'post',
    {
        resolver: () => PostTC.getResolver('findById'),
        prepareArgs: {
            _id: (source) => source.postById
        },
        projection: {postById: 1}
    }
)