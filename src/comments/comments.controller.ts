import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
import { CreateCommentDTO } from './dto/create-comment';

@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')
export class CommentsController {
    constructor(
        private readonly commentService: CommentsService
    ){}


    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Get(':commentId')
    getComment(@Param('commentId') commentId: number) {
        return this.commentService.getComment(commentId)
    }


    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Get()
    getComments(@Param('cardId') cardId: number) {
        return this.commentService.getComments(cardId)
    }


    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Post()
    addComment(
        @Body() createComentDto: CreateCommentDTO,
        @Param('cardId') cardId: number) {
            return this.commentService.addComment(cardId, createComentDto)
    }

    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Delete(':commentId')
    deleteComment(
        @Param('commentId') commentId: number
    ) {
        return this.commentService.deleteComment(commentId)
    }
}
