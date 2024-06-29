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

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'bigData',
      entities: [User, Columns, Card, Comment],
      synchronize: false,
  }),
  AuthModule,
  UsersModule,
  ColumnsModule,
  CardsModule, 
  CommentsModule,
  PassportModule.register({defaultStrategy: 'jwt'})]  
})
export class AppModule {}
