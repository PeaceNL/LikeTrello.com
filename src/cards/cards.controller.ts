import { Body, Controller, Get, Param, Post, UseGuards, Delete } from '@nestjs/common';
import { CardsService } from './cards.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
import { CreateCardDTO } from './dto/create-card';

@Controller('users/:userId/columns/:columnId/cards')
export class CardsController {
    constructor(
        private readonly cardsService: CardsService
    ) {}

    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Get(':cardId')
    getCard(        
        @Param('cardId') cardId: number
    ) {
        return this.cardsService.getCard(cardId)
    }

    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Get()
    getCards(        
        @Param('columnId') columnId: number
    ) {
        return this.cardsService.getCards(columnId)
    }

    @UseGuards(JwtAuthGuard, OwnershipGuard)    
    @Post()
    addCard(
        @Param('columnId') columnId: number,
        @Body() createcardDTO: CreateCardDTO) {
        return this.cardsService.addCard(columnId, createcardDTO)
    }


    @UseGuards(JwtAuthGuard, OwnershipGuard) 
    @Delete(':cardId')
    deleteCard(@Param('cardId')cardId: number) {
        return this.cardsService.deleteCard(cardId)
    }

}
