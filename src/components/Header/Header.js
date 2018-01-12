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
import Link from 'components/Link'
import Navigation from 'components/Navigation'
import logoUrl from './logo-small.png'
import logoUrl2x from './logo-small@2x.png'

const Root = styled.div`
  background: #373277;
  color: #fff;
`

const Container = styled.div`
  margin: 0 auto;
  padding: 20px 0;
  max-width: ${MAX_CONTENT_WIDTH}px;
`

const BrandLink = styled(Link)`
  color: #7bf4ff;
  text-decoration: none;
  font-size: 1.75em; /* ~28px */
`

const BrandText = styled.span`
  margin-left: 10px;
`

const Banner = styled.div`
  text-align: center;
`

const BannerTitle = styled.h1`
  margin: 0;
  padding: 10px;
  font-weight: normal;
  font-size: 4em;
  line-height: 1em;
`

const BannerDesc = styled.p`
  padding: 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.25em;
  margin: 0;
`

export default class Header extends React.Component {
  render() {
    return (
      <Root>
        <Container>
          <Navigation />
          <BrandLink to="/">
            <img
              src={logoUrl}
              srcSet={`${logoUrl2x} 2x`}
              width="38"
              height="38"
              alt="React"
            />
            <BrandText>Mouad Debbar</BrandText>
          </BrandLink>
          <Banner>
            <BannerTitle>React</BannerTitle>
            <BannerDesc>Project Starter</BannerDesc>
          </Banner>
        </Container>
      </Root>
    )
  }
}
