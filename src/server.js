/* eslint-env node */
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// `loadEnv` has to be the first import so env variables are correctly
// setup before everything else.
import './loadEnv'
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import fetch from 'node-fetch'
import React from 'react'
import ReactDOM from 'react-dom/server'
import * as EmotionServer from 'emotion-server'
import { create } from 'jss'
import preset from 'jss-preset-default'
import JssProvider from 'react-jss/lib/JssProvider'
import { SheetsRegistry } from 'react-jss/lib/jss'
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from 'material-ui/styles'
import PrettyError from 'pretty-error'
import { getDataFromTree } from 'react-apollo'
import createApolloClient from './apollo/createClient'
import App from './components/App'
import Html from './components/Html'
import ErrorPage from './routes/error/ErrorPage'
import createFetch from './createFetch'
import router from './router'
import schema from './data/schema'
import assets from './assets.json' // eslint-disable-line import/no-unresolved
import serverConfig from './config/server'
import clientConfig from './config/client'

const app = express()

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {}
global.navigator.userAgent = global.navigator.userAgent || 'all'

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'))

if (__DEV__) {
  app.enable('trust proxy')
}

//
// GraphQL middleware
// -----------------------------------------------------------------------------
app.get(
  '/graphql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
)

app.use(
  '/graphql',
  graphqlExpress(req => ({
    schema,
    graphiql: __DEV__,
    rootValue: { request: req },
    pretty: __DEV__,
  })),
)

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const client = createApolloClient({ schema })

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Apollo client instance.
      client,
      // Universal HTTP client
      fetch: createFetch(fetch, {
        baseUrl: serverConfig.apiUrl,
        cookie: req.headers.cookie,
      }),
    }

    const route = await router.resolve({
      ...context,
      pathname: req.path,
      query: req.query,
    })

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect)
      return
    }

    const data = { ...route }

    // Stylesheets
    data.stylesheets = []
    if (assets.vendor.css) {
      data.stylesheets.push(assets.vendor.css)
    }
    if (route.chunks) {
      route.chunks.forEach(chunk => {
        if (assets[chunk].css) {
          data.stylesheets.push(assets[chunk].css)
        }
      })
    }
    if (assets.client.css) {
      data.stylesheets.push(assets.client.css)
    }

    // JavaScripts
    data.scripts = [assets.vendor.js]
    if (route.chunks) {
      data.scripts.push(...route.chunks.map(chunk => assets[chunk].js))
    }
    data.scripts.push(assets.client.js)

    const html = await renderPage(
      <App context={context}>{route.component}</App>,
      client,
      data,
    )

    res.status(route.status || 200)
    res.send(`<!doctype html>${html}`)
  } catch (err) {
    next(err)
  }
})

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError()
pe.skipNodeFiles()
pe.skipPackage('express')

// eslint-disable-next-line no-unused-vars
app.use(async (err, req, res, next) => {
  console.error(pe.render(err))
  const html = await renderPage(<ErrorPage error={err} />, null, {
    title: 'Internal Server Error',
    description: err.message,
  })
  res.status(err.status || 500)
  res.send(`<!doctype html>${html}`)
})

async function renderPage(element, client, data) {
  let apolloState = {}

  const jssSheetsRegistry = new SheetsRegistry()
  element = wrapElementForJSS(element, jssSheetsRegistry)

  if (client) {
    // SSR for Apollo Client
    // https://www.apollographql.com/docs/react/recipes/server-side-rendering.html
    await getDataFromTree(element)
    apolloState = client.extract()
  }
  const content = ReactDOM.renderToString(element)

  // SSR for Emotion
  // https://github.com/emotion-js/emotion/blob/v8.0.12/docs/ssr.md
  const emotionResult = EmotionServer.extractCritical(content)

  // Critical styles.
  data.styles = [
    // Emotion styles.
    { id: 'emotion', cssText: emotionResult.css },
    // JSS styles (for material-ui).
    { id: 'jss-mui', cssText: jssSheetsRegistry.toString() },
  ]

  // Serialize some data for client side consumption.
  data.app = {
    config: clientConfig,
    __EMOTION_IDS__: emotionResult.ids,
    __APOLLO_STATE__: apolloState,
  }

  return ReactDOM.renderToStaticMarkup(
    <Html {...data}>{emotionResult.html}</Html>,
  )
}

function wrapElementForJSS(element, sheetsRegistry) {
  // SSR for Material-ui/JSS
  // https://github.com/cssinjs/jss/blob/master/docs/ssr.md
  const jss = create(preset())
  const muiTheme = createMuiTheme()
  const generateClassName = createGenerateClassName()
  return (
    <JssProvider
      jss={jss}
      registry={sheetsRegistry}
      generateClassName={generateClassName}
    >
      <MuiThemeProvider theme={muiTheme} sheetsManager={new Map()}>
        {element}
      </MuiThemeProvider>
    </JssProvider>
  )
}

//
// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
  app.listen(serverConfig.port, () => {
    console.info(
      `The server is running at http://localhost:${serverConfig.port}/`,
    )
  })
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot
  module.hot.accept('./router')
}

export default app
