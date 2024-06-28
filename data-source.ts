import { DataSource } from 'typeorm';
import { User } from './src/users/entities/entities.user';
import { Columns } from './src/columns/entities/entities.column';
import { Card } from './src/cards/entities/entities.card';
import { Comment } from './src/comments/entities/entities.comment';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'bigData',
  entities: [User, Columns, Card, Comment],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
