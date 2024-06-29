import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
import { CreateCommentDTO } from './dto/create-comment';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Comments')
@ApiBearerAuth()
@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')
export class CommentsController {
    constructor(
        private readonly commentService: CommentsService
    ){}

    @Get(':commentId')
    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @ApiOperation({summary: 'Get Comment by Id'})
    @ApiParam({name: 'commentId', required: true})
    @ApiResponse({status: 200, description: 'Get comment by Id'})
    @ApiResponse({status: 403, description: 'Forbidden'})
    getComment(@Param('commentId') commentId: number) {
        return this.commentService.getComment(commentId)
    }


    @Get()
    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @ApiOperation({summary: 'Get all card comments'})
    @ApiResponse({status: 200, description: 'Get all card comments'})    
    @ApiResponse({status: 403, description: 'Forbidden'})    
    getComments(@Param('cardId') cardId: number) {
        return this.commentService.getComments(cardId)
    }


    @Post()
    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @ApiOperation({summary: 'Create new comment'})
    @ApiBody({type: CreateCommentDTO})
    @ApiParam({name: 'cardId', required: true})
    @ApiResponse({status: 201, description: 'Comment has been Created'})    
    @ApiResponse({status: 403, description: 'Forbidden'}) 
    addComment(
        @Body() createComentDto: CreateCommentDTO,
        @Param('cardId') cardId: number) {
            return this.commentService.addComment(cardId, createComentDto)
    }

    @Delete(':commentId')
    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @ApiOperation({summary: 'Delete comment by Id'})
    @ApiParam({name: 'commentId', required: true})
    @ApiResponse({status: 202, description: 'comment has been Deleted'})    
    @ApiResponse({status: 403, description: 'Forbidden'}) 
    deleteComment(
        @Param('commentId') commentId: number
    ) {
        return this.commentService.deleteComment(commentId)
    }
}
