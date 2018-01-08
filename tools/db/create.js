import mysql from 'mysql2/promise'
import config from '../../src/config'

const { host, username, password } = config.db

export default async function create() {
  const connection = await mysql.createConnection({
    host,
    user: username,
    password,
    charset: 'utf8mb4',
  })

  try {
    const sql = `
      CREATE DATABASE IF NOT EXISTS ${config.db.name}
      CHARACTER SET utf8mb4
      COLLATE utf8mb4_unicode_ci
    `
    const [{ warningStatus }] = await connection.query(sql)
    if (warningStatus > 0) {
      console.info('Database already exists')
    } else {
      console.info('Database created!')
    }
  } catch (err) {
    console.error('Error occurred during the creation of db')
    console.error(err)
  } finally {
    // In all cases, we end the connection.
    connection.end()
  }
}
