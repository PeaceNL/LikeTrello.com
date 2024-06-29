import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/entities.user';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly userServise: UsersService){}

    @Get()    
    @ApiOperation({summary: 'Hello Users'})
    @ApiResponse({status: 200, description:'Lets login for working with likeTrelloCom'})
    users() {
        return 'Hello Users'
    }


    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()   
    @Get(':id')
    @ApiOperation({summary: 'Get user by Id'})
    @ApiResponse({status: 200, description: 'User found'})
    @ApiResponse({status: 403, description: 'Forbidden'})
    getUserById(@Param('id') id: number): Promise<User | string> {
        return this.userServise.getUserById(id)
    }   

    
    @Post()
    @ApiOperation({summary: 'Create a new User'})
    @ApiBody({type: CreateUserDto}) 
    @ApiResponse({status: 201, description: 'User has been created'})    
    addUser(@Body() createUserDto: CreateUserDto): Promise<User | string> {
        return this.userServise.addUser(createUserDto);
    }
    
}
