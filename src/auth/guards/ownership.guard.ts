import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";
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
    const user = request.user; // JWT token user information
    // console.log(user)
    const { userId, columnId, cardId, commentId } = request.params;
    // console.log(userId, columnId, cardId, commentId)

    if (userId && +userId !== user.userId) {
      throw new ForbiddenException('You do not own this resource');
    }

    if (columnId) {
      await this.checkColumnOwnership(columnId, user.userId);
    }

    if (cardId) {
      await this.checkCardOwnership(cardId, user.userId);
    }

    if (commentId) {
      await this.checkCommentOwnership(commentId, user.userId);
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

  private async checkCardOwnership(cardId: number, userId: number) {
    const card = await this.cardsService.findOneById(cardId);
    if (!card) {
      throw new ForbiddenException('Card not found');
    }
    console.log(card);
    await this.checkColumnOwnership(card.column.id, userId);
  }

  private async checkCommentOwnership(commentId: number, userId: number) {
    const comment = await this.commentsService.findOneById(commentId);
    if (!comment) {
      throw new ForbiddenException('Comment not found');
    }
    await this.checkCardOwnership(comment.card.id, userId);
  }
}