import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDTO } from './dto/create-column.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FromOwner } from 'src/auth/guards/fromOwner.guard';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';

@Controller('users/:userId/columns/')
export class ColumnsController {

    constructor(private readonly columnsService: ColumnsService){}


    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Get()
    getColumnsByUserId(@Param('userId') userId: number): Promise<any> {
        return this.columnsService.getUsersColumns(userId);
    }

    
    @Post()
    addColumnToUser(
        @Param('userId') userId: number,
        @Body() createColumnDTO: CreateColumnDTO
    ): Promise<any> {
        return this.columnsService.addColumns(userId, createColumnDTO)
    }

    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Get(':columnId')
    getColumn(
        @Param('userId') userId: number,
        @Param('columnId') columnId: number,
    ) {
        return this.columnsService.getColumn(columnId)
    }

    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Delete(':columnId')
    deleteColumn(
        @Param('userId') userId: number,
        @Param('columnId') columnId: number,
    ) {
        return this.columnsService.deleteColumn(columnId)
    }
}
