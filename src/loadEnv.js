/* eslint-env node */
// When running locally, load env variables from .env files.
// The main file `.env` is committed in the git repo and contains defaults for development.
// The other `.env.local` can be used locally to override.
if (process.env.NODE_ENV === 'development') {
  const { config } = require('dotenv')
  config({ path: '.env.local' })
  config({ path: '.env' })
}
