import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDTO } from './dto/create-column.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Columns')
@ApiBearerAuth()
@Controller('users/:userId/columns/')
export class ColumnsController {

    constructor(private readonly columnsService: ColumnsService){}


    @Get()
    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @ApiOperation({summary: 'Get all users column'})
    @ApiResponse({status: 200, description: 'get all user columns'})
    @ApiResponse({status: 403, description: 'Forbidden'})
    getColumnsByUserId(@Param('userId') userId: number): Promise<any> {
        return this.columnsService.getUsersColumns(userId);
    }

    @Get(':columnId')
    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @ApiOperation({summary: 'Get column by Id'})
    @ApiParam({name: 'columnId', required: true})
    @ApiResponse({status: 200, description: 'Get column by Id'})
    @ApiResponse({status: 403, description: 'Forbidden'})
    getColumn(        
        @Param('columnId') columnId: number,
    ) {
        return this.columnsService.getColumn(columnId)
    }


    @Post()
    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @ApiOperation({summary: 'Create new column'})
    @ApiParam({name: 'userId', required: true})
    @ApiBody({type: CreateColumnDTO})
    @ApiResponse({status: 201, description: 'column has been created'})
    @ApiResponse({status: 403, description: 'Forbidden'})
    addColumnToUser(
        @Param('userId') userId: number,
        @Body() createColumnDTO: CreateColumnDTO
    ): Promise<any> {
        return this.columnsService.addColumns(userId, createColumnDTO)
    }


    @Delete(':columnId')
    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @ApiOperation({summary: 'Delete columns by Id'})    
    @ApiParam({name: 'columnId', required: true})
    @ApiResponse({status: 202, description:'Column hase been Deleted'})
    @ApiResponse({status: 403, description:'Forbidden'})
    deleteColumn(        
        @Param('columnId') columnId: number,
    ) {
        return this.columnsService.deleteColumn(columnId)
    }
}
