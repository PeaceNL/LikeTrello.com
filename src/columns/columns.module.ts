import { Module, forwardRef } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Columns } from './entities/entities.column';
import { UsersModule } from 'src/users/users.module';
import { CardsModule } from 'src/cards/cards.module';
import { CommentsModule } from 'src/comments/comments.module';


@Module({
  imports: [
    forwardRef(() => CommentsModule),
    forwardRef(() => CardsModule),
    TypeOrmModule.forFeature([Columns]),    
    UsersModule,
  ],
  controllers: [ColumnsController],
  providers: [ColumnsService],
  exports: [ColumnsService]
})
export class ColumnsModule {}
