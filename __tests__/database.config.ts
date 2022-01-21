import { createConnection, getConnection, Connection, ConnectionOptions } from 'typeorm';
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

const getNewConnection = async (connectionOptions: ConnectionOptions): Promise<Connection> => {
  try {
    const connection = await createConnection(connectionOptions);

    console.log('Successfully connected to postgres!');
    return connection;
  } catch (error) {
    console.log('Error: could not connect to postgres!');
    throw new Error(error);
  }
};

export const TypeormHelper = {
  connection: null as Connection,
  async connect(): Promise<Connection> {
    const connection = await getNewConnection(options);
    await connection.synchronize();
    this.connection = connection;

    return this.connection;
  },
};

const connection = {
  async create() {
    await TypeormHelper.connect();
  },

  async close() {
    await TypeormHelper.connection.close();
  },

  async clear() {
    const currConnection = TypeormHelper.connection;
    const entities = currConnection.entityMetadatas;

    await Promise.all(
      entities.map(async (entity) => {
        const repository = currConnection.getRepository(entity.name);
        await repository.query(`DELETE FROM "${entity.tableName}"`);
      }),
    );
  },

  async getInstance() {
    return getConnection();
  },
};

export default connection;
