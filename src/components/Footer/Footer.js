/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import styled, { css } from 'react-emotion'
import Link from '../Link'

const Root = styled.div`
  background: #333;
  color: #fff;
`
const Container = styled.div`
  margin: 0 auto;
  padding: 20px 15px;
  max-width: 1000px;
  text-align: center;
`
const textAndLink = css`
  padding: 2px 5px;
  font-size: 1em;
`
const Text = styled.span`
  ${textAndLink};
  color: rgba(255, 255, 255, 0.5);
`
const StyledLink = styled(Link)`
  ${textAndLink};

  &,
  &:active,
  &:visited {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
  }

  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`
const Spacer = styled.span`
  color: rgba(255, 255, 255, 0.3);
`

export default class Footer extends React.Component {
  render() {
    return (
      <Root>
        <Container>
          <Text>© Your Company</Text>
          <Spacer>·</Spacer>
          <StyledLink to="/">Home</StyledLink>
          <Spacer>·</Spacer>
          <StyledLink to="/admin">Admin</StyledLink>
          <Spacer>·</Spacer>
          <StyledLink to="/privacy">Privacy</StyledLink>
          <Spacer>·</Spacer>
          <StyledLink to="/not-found">Not Found</StyledLink>
        </Container>
      </Root>
    )
  }
}
