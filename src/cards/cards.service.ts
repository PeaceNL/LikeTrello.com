import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/entities.card';
import { Repository } from 'typeorm';
import { CreateCardDTO } from './dto/create-card';
import { ColumnsService } from 'src/columns/columns.service';

@Injectable()
export class CardsService {
    constructor(
        @InjectRepository(Card)
        private readonly cardRepository: Repository<Card>,
        private readonly columnsService: ColumnsService
    ){}    

    cardByid(cardId: number) {
        return this.cardRepository.findOne({where: {id: cardId}});
    }

    findOneById(cardId: number) {
        return this.cardRepository.findOne({where: {id: cardId}, relations:['column']});
    }

    getCards(columnId: number) {
        return this.cardRepository.find({where: {column: {id: columnId}}})
    }

    getCard(cardId: number) {
        return this.cardRepository.findOne({ where: { id: cardId}, relations: ['comments']});
    }

    async addCard(columnId: number, createcardDTO: CreateCardDTO) {
        const column = await this.columnsService.findOneById(columnId);
            if (!column) {
                throw new NotFoundException('Column not found');
            }
            console.log({...createcardDTO}, columnId);        
        const newCard = {...createcardDTO, column}
            console.log(newCard);        
        this.cardRepository.create(newCard);
        return this.cardRepository.save(newCard);
    }

    async deleteCard(cardId: number) {
        const removedCard = await this.getCard(cardId)
        if (!removedCard) {
            throw new NotFoundException('Card not Found')
        }
        return await this.cardRepository.remove(removedCard)
    }
    
}
