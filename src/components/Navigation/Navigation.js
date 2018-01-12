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
import Link from 'components/Link'

const Root = styled.div`
  float: right;
  margin: 6px 0 0;
`
const StyledLink = styled(Link)`
  display: inline-block;
  padding: 3px 8px;
  text-decoration: none;
  font-size: 1.125em; /* ~18px */

  &,
  &:active,
  &:visited {
    color: rgba(255, 255, 255, 0.6);
  }

  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`

export default class Navigation extends React.Component {
  render() {
    return (
      <Root role="navigation">
        <StyledLink to="/about">About</StyledLink>
      </Root>
    )
  }
}
