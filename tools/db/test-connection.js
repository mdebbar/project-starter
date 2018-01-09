import sequelize from '../../src/data/sequelize'
import config from '../../src/data/sequelize.config'

// Test whether we can connect to the db or not.
export default async function testConnection() {
  try {
    await sequelize.authenticate()
    console.info('Successfully connected to DB!')
  } catch (err) {
    console.error('Failed to connect to DB')
    console.error(err)
    console.info('Database config:', config)
  } finally {
    sequelize.close()
  }
}
