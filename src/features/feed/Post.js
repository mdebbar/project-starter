import React, { Component } from 'react'
import { propType as gqlType } from 'graphql-anywhere'
import PostDetails from 'apollo/queries/PostDetails.fragment.gql'

export default class Post extends Component {
  static propTypes = {
    post: gqlType(PostDetails).isRequired,
  }

  render() {
    const { post } = this.props
    return <p>{post.body}</p>
  }
}
