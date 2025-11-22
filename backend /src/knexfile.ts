import 'dotenv/config';
import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'sqlite3',
  connection: { filename: './dev.sqlite3' },
  useNullAsDefault: true,
  migrations: {
    directory: './src/infra/database/migrations',
    extension: 'ts'
  },
  seeds: {
    directory: './src/infra/database/seeds',
    extension: 'ts'
  }
};

export default config;