import { createConnection, getConnection, ConnectionOptions } from 'typeorm';
import 'dotenv/config';

import { User } from '../src/db/models';

const dbEntities = [User];

const options: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_TEST_HOST,
  port: Number(process.env.DATABASE_TEST_PORT),
  username: process.env.DATABASE_TEST_USER,
  password: process.env.DATABASE_TEST_PASSWORD,
  database: process.env.DATABASE_TEST_NAME,
  logging: false,
  synchronize: true,
  entities: dbEntities,
  cli: { entitiesDir: '../src/db/models' },
};

const connection = {
  async create() {
    await createConnection(options);
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const currConnection = getConnection();
    const entities = currConnection.entityMetadatas;

    await Promise.all(
      entities.map(async (entity) => {
        const repository = currConnection.getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName}`);
      }),
    );
  },

  async getInstance() {
    return getConnection();
  },
};

export default connection;
