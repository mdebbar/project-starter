import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql'
import UserType from './UserType'

const PostType = new ObjectType({
  name: 'Post',
  fields: {
    id: { type: new NonNull(ID) },
    body: { type: StringType },
    user: { type: UserType },
  },
})

export default PostType
