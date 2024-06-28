import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/entities.card';
import { CardsRepository } from './cards.repository/cards.repository';
import { Repository } from 'typeorm';

@Injectable()
export class CardsService {
    constructor(
        @InjectRepository(Card)
        private readonly cardRepository: Repository<Card>

    ){}    

    findOneById(cardId: number) {
        return this.cardRepository.findOne({where: {id: cardId}, relations:['column']});
    }

    findByColumnId(columnId: number) {
        return this.cardRepository.find({where: {column: {id: columnId}}})
    }
    
}
