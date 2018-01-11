/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql'
import PostType from './PostType'
import CommentType from './CommentType'

const UserType = new ObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new NonNull(ID) },
    email: { type: new NonNull(StringType) },
    posts: {
      type: new List(PostType),
      resolve: user => user.getPosts(),
    },
    comments: {
      type: new List(CommentType),
      resolve: user => user.getComments(),
    },
  }),
})

export default UserType
