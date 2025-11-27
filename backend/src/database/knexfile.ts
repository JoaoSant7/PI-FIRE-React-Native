// src/database/knexfile.ts
import type { Knex } from 'knex';
import path from 'path';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: path.resolve(__dirname, '../../database.sqlite')
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, './migrations'),
      extension: 'ts'
    },
    seeds: {
      directory: path.resolve(__dirname, './seeds'),
      extension: 'ts'
    },
    pool: {
      afterCreate: (conn: any, cb: any) => {
        conn.pragma('foreign_keys = ON');
        cb();
      }
    }
  },

  production: {
    client: 'better-sqlite3',
    connection: {
      filename: path.resolve(__dirname, '../../database.sqlite')
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, './migrations'),
      extension: 'js'
    },
    seeds: {
      directory: path.resolve(__dirname, './seeds'),
      extension: 'js'
    },
    pool: {
      afterCreate: (conn: any, cb: any) => {
        conn.pragma('foreign_keys = ON');
        conn.pragma('journal_mode = WAL');
        cb();
      }
    }
  }
};

export default config;