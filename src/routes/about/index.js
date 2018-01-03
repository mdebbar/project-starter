/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import { AppBar } from 'react-toolbox/lib/app_bar'
import { Button } from 'react-toolbox/lib/button'
import Layout from 'components/Layout'
import Page from 'components/Page'
import about from './about.md'

function action() {
  return {
    chunks: ['about'],
    title: about.title,
    component: (
      <>
        <AppBar
          title="Trying the toolbox"
          leftIcon="account_circle"
          rightIcon="menu"
        />
        <Layout>
          <Button>About me</Button>
          <Page {...about} />
        </Layout>
      </>
    ),
  }
}

export default action
