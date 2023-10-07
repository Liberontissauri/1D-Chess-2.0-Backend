// --------------------------------------------------------
// This code is meant to be used by the migrations cli tool
// --------------------------------------------------------

import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

import { User } from 'src/Users/users.entity';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env['DB_HOST'],
  port: Number(process.env['DB_PORT']),
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_NAME'],
  entities: [User],
  migrations: ['dist/Migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
