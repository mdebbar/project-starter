/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { MAX_CONTENT_WIDTH } from 'components/constants'

const Root = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`
const Container = styled.div`
  margin: 0 auto;
  padding: 0 0 40px;
  max-width: ${MAX_CONTENT_WIDTH}px;
`
const NewsItem = styled.article`
  margin: 0 0 2rem;
`
const NewsTitle = styled.h1`
  font-size: 1.5rem;
`
const NewsDesc = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 1.125rem;
  }

  pre {
    white-space: pre-wrap;
    font-size: 0.875rem;
  }

  img {
    max-width: 100%;
  }
`

class Home extends React.Component {
  static propTypes = {
    news: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        content: PropTypes.string,
      }),
    ).isRequired,
  }

  render() {
    return (
      <Root>
        <Container>
          <h1>React.js News</h1>
          {this.props.news.map(item => (
            <NewsItem key={item.link}>
              <NewsTitle>
                <a href={item.link}>{item.title}</a>
              </NewsTitle>
              <NewsDesc dangerouslySetInnerHTML={{ __html: item.content }} />
            </NewsItem>
          ))}
        </Container>
      </Root>
    )
  }
}

export default Home
