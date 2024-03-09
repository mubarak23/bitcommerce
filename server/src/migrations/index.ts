import typeOrmConfig from '../ormconfig'
import { createConnection } from 'typeorm'

const runDatabaseMigrations = async () => {
  const connection = await createConnection(typeOrmConfig)
  await connection.runMigrations()
}

export default runDatabaseMigrations
