import { Module, forwardRef } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/entities.comment';
import { ColumnsModule } from 'src/columns/columns.module';
import { CardsModule } from 'src/cards/cards.module';

@Module({
  imports: [
    forwardRef(() => ColumnsModule),
    forwardRef(() => CardsModule),
    TypeOrmModule.forFeature([Comment]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService]
})
export class CommentsModule {}
