import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Get()
    @ApiOperation({summary: 'This page for login'})
    loginPage() {
        return "Page for login"
    }



    @Post('login')
    @ApiOperation({summary: 'Log in to your account'})  
    @ApiBody({type: LoginDto})
    @ApiResponse({status:200, description: 'Congratulations! Start Work!'})
      
    login(@Body() loginDto: LoginDto): Promise<any> {
        return this.authService.login(loginDto)
    }    
}
