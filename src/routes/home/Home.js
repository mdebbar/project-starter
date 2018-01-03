// @flow
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import styled from 'react-emotion'
import { propType as graphqlType } from 'graphql-anywhere'
import { Button } from 'semantic-ui-react'
import connectLoaded from 'apollo/connectLoaded'
import FeedPosts from 'apollo/queries/FeedPosts.gql'
import { MAX_CONTENT_WIDTH } from 'components/constants'
import Post from 'features/feed/Post'

const Root = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`
const Container = styled.div`
  margin: 0 auto;
  padding: 0 0 40px;
  max-width: ${MAX_CONTENT_WIDTH}px;
`

class Home extends React.Component<any> {
  static propTypes = {
    data: graphqlType(FeedPosts),
  }

  render() {
    return (
      <Root>
        <Container>
          <h1>News Feed</h1>
          <Button>Click Me!</Button>
          {this.props.data.posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </Container>
      </Root>
    )
  }
}

export default connectLoaded(FeedPosts, Home)
