import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './entities/entities.comment';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCardDTO } from 'src/cards/dto/create-card/create-card';
import { CreateCommentDTO } from './dto/create-comment';
import { CardsService } from 'src/cards/cards.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        private readonly cardService: CardsService
    ) {}

    findOneById(commentId: number) {
        return this.commentRepository.findOne({where: {id: commentId}, relations: ['card']})
    }
    
    getComments(cardId: number) {
        return this.commentRepository.find({where: {card: {id: cardId}}})
    }

    getComment(commentId: number) {
        return this.commentRepository.findOne({where: {id: commentId}})
    }

    async addComment(cardId: number, createComentDto: CreateCommentDTO) {
        const card = await this.cardService.cardByid(cardId)
        if (!card) {
            throw new NotFoundException('Card not Found')
        }
        const newComment = {...createComentDto, card}
        this.commentRepository.create(newComment);
        return this.commentRepository.save(newComment)
    }

    async deleteComment(commentId: number) {
        const comment = await this.getComment(commentId)
        console.log(comment)
        return this.commentRepository.remove(comment)
    }
}
