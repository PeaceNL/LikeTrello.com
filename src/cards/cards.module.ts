import { Module, forwardRef } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CommentsModule } from 'src/comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/entities.card';
import { ColumnsModule } from 'src/columns/columns.module';

@Module({
  imports: [
    forwardRef(() => ColumnsModule),   
    TypeOrmModule.forFeature([Card]),
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService]
})
export class CardsModule {}
