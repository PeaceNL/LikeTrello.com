import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { ColumnsService } from "src/columns/columns.service";
import { CardsService } from "src/cards/cards.service";
import { CommentsService } from "src/comments/comments.service";

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private readonly columnsService: ColumnsService,
    private readonly cardsService: CardsService,
    private readonly commentsService: CommentsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // console.log(user)
    const { userId, columnId, cardId, commentId } = request.params;
    // console.log(userId, columnId, cardId, commentId)

    if (userId && +userId !== user.userId) {
      throw new ForbiddenException('You do not own this resource');
    }

    if (columnId) {
      await this.checkColumnOwnership(+columnId, user.userId);
    }

    if (cardId) {
      await this.checkCardOwnership(+cardId, +columnId, user.userId);
    }

    if (commentId) {
      await this.checkCommentOwnership(+commentId, +cardId, +columnId, user.userId);
    }

    return true;
  }

  private async checkColumnOwnership(columnId: number, userId: number) {
    const column = await this.columnsService.findOneById(columnId);
    // console.log(column.user.id)    
    if (!column || column.user.id !== userId) {
      throw new ForbiddenException('You do not own this column');
    }
  }

  private async checkCardOwnership(cardId: number, columnId: number, userId: number) {
    const card = await this.cardsService.findOneById(cardId);
    if (!card) {
      throw new ForbiddenException('Card not found');
    }
    // console.log(card);
    console.log(`check columnIds ${card.column.id} ${columnId}`);
    if (card.column.id !== columnId) {
      throw new ForbiddenException('Column do not own this card');
    }
    await this.checkColumnOwnership(card.column.id, userId);
    
  }

  private async checkCommentOwnership(commentId: number, cardId: number, columnId: number, userId: number) {
    const comment = await this.commentsService.findOneById(commentId);
    if (!comment) {
      throw new ForbiddenException('Comment not found');
    }
    console.log(`check cardIds ${comment.card.id} ${cardId}`);
    
    if (comment.card.id !== cardId) {
      throw new ForbiddenException('Card do not own this comment');
    }  
    await this.checkCardOwnership(comment.card.id, columnId, userId);
    
  }
}