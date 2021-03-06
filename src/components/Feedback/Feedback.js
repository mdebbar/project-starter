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
import { MAX_CONTENT_WIDTH } from 'components/constants'

const Root = styled.div`
  background: #f5f5f5;
  color: #333;
`
const Container = styled.div`
  margin: 0 auto;
  padding: 20px 8px;
  max-width: ${MAX_CONTENT_WIDTH}px;
  text-align: center;
  font-size: 1.5em; /* ~24px */
`
const Link = styled.a`
  &,
  &:active,
  &:hover,
  &:visited {
    color: #333;
    text-decoration: none;
  }

  &:hover {
    text-decoration: underline;
  }
`
const Spacer = styled.span`
  padding-right: 15px;
  padding-left: 15px;
`

export default class Feedback extends React.Component {
  render() {
    return (
      <Root>
        <Container>
          <Link href="https://stackoverflow.com">Ask a question</Link>
          <Spacer>|</Spacer>
          <Link href="https://github.com/mdebbar/project-starter/issues">
            Report an issue
          </Link>
        </Container>
      </Root>
    )
  }
}
