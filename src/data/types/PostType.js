import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql'
import UserType from './UserType'
import CommentType from './CommentType'

const PostType = new ObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new NonNull(ID) },
    body: { type: StringType },
    user: {
      type: new NonNull(UserType),
      resolve: post => post.getUser(),
    },
    comments: {
      type: new List(CommentType),
      resolve: post => post.getComments(),
    },
  }),
})

export default PostType
