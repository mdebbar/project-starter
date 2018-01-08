import { GraphQLList as List } from 'graphql'
import PostType from 'data/types/PostType'
import { Post } from 'data/models'

const posts = {
  type: new List(PostType),
  resolve: () => Post.findAll(),
}

export default posts
