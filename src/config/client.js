// WARNING: These configs will be sent down to the client. Please don't include
//          any sensitive information.
function getClientConfig() {
  // This object will be serialized in `src/server.js` and sent down with html.
  return {
    // API URL to be used in the client-side code
    apiUrl: process.env.API_CLIENT_URL || '',
  }
}

export default (process.env.BROWSER ? window.App.config : getClientConfig())
