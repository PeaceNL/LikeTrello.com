import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';

@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')
export class CommentsController {
    constructor(
        private readonly commentService: CommentsService
    ){}


    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Get(':commentId')
    getComment(@Param('commentId') commentId: number) {
        return this.commentService.findOneById(commentId)
    }


    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Get()
    getComments(@Param('cardId') cardId: number) {
        return this.commentService.findCardsComments(cardId)
    }
}
