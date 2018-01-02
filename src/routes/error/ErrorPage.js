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

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  height: 100%;
  font-family: sans-serif;
  text-align: center;
  color: #888;
`
const H1 = styled.h1`
  font-weight: 400;
  color: #555;
`
const Pre = styled.pre`
  white-space: pre-wrap;
  text-align: left;
`

export default class ErrorPage extends React.Component {
  static propTypes = {
    error: PropTypes.shape({
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired,
    }),
  }

  static defaultProps = {
    error: null,
  }

  render() {
    if (__DEV__ && this.props.error) {
      return (
        <Root>
          <div>
            <H1>{this.props.error.name}</H1>
            <Pre>{this.props.error.stack}</Pre>
          </div>
        </Root>
      )
    }

    return (
      <Root>
        <div>
          <H1>Error</H1>
          <p>Sorry, a critical error occurred on this page.</p>
        </div>
      </Root>
    )
  }
}
