/* eslint-env node */

if (process.env.BROWSER) {
  throw new Error('Do not import `config.js` from inside the client-side code.')
}

module.exports = {
  // Node.js app
  port: process.env.PORT || 3000,

  // API URL to be used in the server-side code
  apiUrl:
    process.env.API_SERVER_URL ||
    `http://localhost:${process.env.PORT || 3000}`,

  // Database
  // http://docs.sequelizejs.com/manual/installation/usage.html#options
  sequelize: {
    database: process.env.DB_NAME || 'dev',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',

    benchmark: true,
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
    },

    define: {
      // http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-init
      freezeTableName: true,
    },
  },

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },
}
