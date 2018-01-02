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
import Link from '../Link'

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
const HighlightedLink = styled(StyledLink)`
  margin-right: 8px;
  margin-left: 8px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.15);
  color: #fff;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`
const Spacer = styled.span`
  color: rgba(255, 255, 255, 0.3);
`

export default class Navigation extends React.Component {
  render() {
    return (
      <Root role="navigation">
        <StyledLink to="/about">About</StyledLink>
        <StyledLink to="/contact">Contact</StyledLink>
        <Spacer> | </Spacer>
        <StyledLink to="/login">Log in</StyledLink>
        <Spacer>or</Spacer>
        <HighlightedLink to="/register">Sign up</HighlightedLink>
      </Root>
    )
  }
}
