import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';

@Controller('users/:userId/columns/:columnId/cards')
export class CardsController {
    constructor(
        private readonly cardsService: CardsService
    ) {}

    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Get(':cardId')
    getCards(
        @Param('userId') userId:number,
        @Param('columnId') columnId:number,
        @Param('cardId') cardId: number
    ) {
        return this.cardsService.findOneById(cardId)
    }

}
