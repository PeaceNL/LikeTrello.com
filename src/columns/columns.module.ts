import { Module, forwardRef } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Columns } from './entities/entities.column';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository/users.repository';
import { UsersModule } from 'src/users/users.module';
import { FromOwner } from 'src/auth/guards/fromOwner.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CardsModule } from 'src/cards/cards.module';
import { CommentsModule } from 'src/comments/comments.module';
import { CardsService } from 'src/cards/cards.service';

@Module({
  imports: [
    forwardRef(() => CardsModule),
    TypeOrmModule.forFeature([Columns]),    
    UsersModule
  ],
  controllers: [ColumnsController],
  providers: [ColumnsService],
  exports: [ColumnsService]
})
export class ColumnsModule {}
