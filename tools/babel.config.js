const pkg = require('../package.json')

module.exports = { createBabelConfig }

/**
 * @param {string} buildTarget - "web" | "node" | "cli"
 * @param {boolean} isDebug - true when building for dev mode.
 */
function createBabelConfig(buildTarget, isDebug) {
  // Babel configuration
  // https://babeljs.io/docs/usage/api/
  const config = {
    presets: [
      // A Babel preset that can automatically determine the Babel plugins and polyfills
      // https://github.com/babel/babel-preset-env
      [
        '@babel/preset-env',
        {
          targets: getEnvTargets(buildTarget, isDebug),
          // Only transform modules for cli mode. In web and node modes, webpack
          // will take care of modules.
          modules: buildTarget === 'cli' ? 'commonjs' : false,
          useBuiltIns: false,
          debug: false,
        },
      ],

      // Flow
      // https://github.com/babel/babel/tree/master/packages/babel-preset-flow
      '@babel/preset-flow',

      // JSX
      // https://github.com/babel/babel/tree/master/packages/babel-preset-react
      ['@babel/preset-react', { development: isDebug }],
    ],
    plugins: [
      // Emotion
      // https://github.com/emotion-js/emotion/tree/master/packages/babel-plugin-emotion
      //
      // `autoLabel` is disabled to prevent an issue with emotion-server. Once we
      // upgrade to emotion 9, we can re-enable `autoLabel`.
      ['emotion', { autoLabel: isDebug, sourceMap: isDebug }],

      // class { handleThing = () => { } }
      ['@babel/plugin-proposal-class-properties', { loose: true }],

      // The following two plugins use Object.assign directly, instead of Babel's
      // extends helper. Note that this assumes `Object.assign` is available.
      // { ...todo, completed: true }
      ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],

      // Adds syntax support for import()
      '@babel/plugin-syntax-dynamic-import',

      // Treat React JSX elements as value types and hoist them to the highest scope
      // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-constant-elements
      ...(isDebug ? [] : ['@babel/transform-react-constant-elements']),

      // Replaces the React.createElement function with one that is more optimized for production
      // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-inline-elements
      ...(isDebug ? [] : ['@babel/transform-react-inline-elements']),

      // Remove unnecessary React propTypes from the production build
      // https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types
      ...(isDebug ? [] : ['transform-react-remove-prop-types']),
    ],
    ignore: ['node_modules', 'build'],
  }
  return config
}

function getEnvTargets(buildTarget, isDebug) {
  switch (buildTarget) {
    case 'cli':
      return { node: 'current' }
    case 'node':
      return { node: pkg.engines.node.match(/(\d+\.?)+/)[0] }
    case 'web':
      return {
        browsers: pkg.browserslist,
        forceAllTransforms: !isDebug, // for UglifyJS
      }
    default:
      throw new Error(`Can't configure babel for [buildTarget=${buildTarget}]`)
  }
}
