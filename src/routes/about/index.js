/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import Button from 'material-ui/Button'
import Input from 'material-ui/Input'
import Layout from 'components/Layout'
import Page from 'components/Page'
import about from './about.md'

function action() {
  return {
    chunks: ['about'],
    title: about.title,
    component: (
      <Layout>
        <Input />
        <Button>Now!</Button>
        <Page {...about} />
      </Layout>
    ),
  }
}

export default action
