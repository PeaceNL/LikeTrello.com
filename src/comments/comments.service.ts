import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './entities/entities.comment';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>
    ) {}

    findOneById(commentId: number) {
        return this.commentRepository.findOne({where: {id: commentId}, relations: ['card']})
    }

    findCardsComments(cardId: number) {
        return this.commentRepository.find({where: {card: {id: cardId}}});
    } 
}
