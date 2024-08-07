import { Body, Controller, Get, Param, Post, UseGuards, Delete } from '@nestjs/common';
import { CardsService } from './cards.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
import { CreateCardDTO } from './dto/create-card';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('Cards')
@ApiBearerAuth()
@Controller('users/:userId/columns/:columnId/cards')
export class CardsController {
    constructor(
        private readonly cardsService: CardsService
    ) {}

    @Get(':cardId')
    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @ApiOperation({summary: 'Get One Card By Id'})
    @ApiParam({name: 'cardId', required: true})
    @ApiResponse({ status: 200, description: 'Card found' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    getCard(        
        @Param('cardId') cardId: number
    ) {
        return this.cardsService.getCard(cardId)
    }

    @Get()
    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @ApiOperation({summary: 'Get all cars for column'})    
    @ApiResponse({status: 200, description: 'Cards found'})
    @ApiResponse({status: 403, description: 'Forbidden'})
    getCards(        
        @Param('columnId') columnId: number
    ) {
        return this.cardsService.getCards(columnId)
    }

    @Post()
    @UseGuards(JwtAuthGuard, OwnershipGuard)    
    @ApiOperation({summary: 'Add a new Card'})
    @ApiBody({type: CreateCardDTO})
    @ApiParam({name: 'columnId', required: true})
    @ApiResponse({status:201, description: 'Card has been created'})
    @ApiResponse({status:403, description: 'Forbidden'})
    addCard(
        @Param('columnId') columnId: number,
        @Body() createcardDTO: CreateCardDTO
    ) {
        return this.cardsService.addCard(columnId, createcardDTO)
    }


    @Delete(':cardId')
    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @ApiOperation({summary: 'Delete a card'})
    @ApiParam({name: 'cardId', required: true})
    @ApiResponse({status:202, description: 'Card has been deleted'})
    @ApiResponse({status:403, description: 'Forbidden'})
    deleteCard(@Param('cardId')cardId: number) {
        return this.cardsService.deleteCard(cardId)
    }

}
