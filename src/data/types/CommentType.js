import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql'
import UserType from './UserType'
import PostType from './PostType'

const CommentType = new ObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: new NonNull(ID) },
    body: { type: StringType },
    user: {
      type: new NonNull(UserType),
      resolve: comment => comment.getUser(),
    },
    post: {
      type: new NonNull(PostType),
      resolve: comment => comment.getPost(),
    },
  }),
})

export default CommentType
