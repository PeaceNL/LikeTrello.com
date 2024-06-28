import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/entities.user';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly userServise: UsersService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    users() {
        return 'Hello Users'
    }

    
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getUserById(@Param('id') id: number): Promise<User | string> {
        return this.userServise.getUserById(id)
    }   

    @Post()
    @HttpCode(HttpStatus.CREATED)
    addUser(@Body() createUserDto: CreateUserDto): Promise<User | string> {
        return this.userServise.addUser(createUserDto);
    }
    
}
