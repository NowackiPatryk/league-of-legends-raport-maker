import dotenv = require('dotenv');
dotenv.config();

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Match } from 'src/match/match.entity';
import { User } from 'src/user/user.entity';
import { Raport } from 'src/raport/raport.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: [
    User,
    Match,
    Raport,
  ],
};
