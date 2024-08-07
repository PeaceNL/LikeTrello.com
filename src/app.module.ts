import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/entities.user';
import { Columns } from './columns/entities/entities.column';
import { Card } from './cards/entities/entities.card';
import { Comment } from './comments/entities/entities.comment';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "pgsql", //process.env.DB_HOST
      port: 5432, //+process.env.DB_PORT,
      username: "postgres", //process.env.DB_USERNAME,
      password: "postgres", //process.env.DB_PASSWORD,
      database: "postgres", //process.env.DB_DATABASE,
      entities: [User, Columns, Card, Comment],
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    ColumnsModule,
    CardsModule, 
    CommentsModule,
    PassportModule.register({defaultStrategy: 'jwt'})
]  
})
export class AppModule {}
