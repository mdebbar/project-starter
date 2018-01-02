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

export default class Page extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired,
  }

  render() {
    const { title, html } = this.props
    return (
      <Root>
        <Container>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Container>
      </Root>
    )
  }
}
