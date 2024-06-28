import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Get()
    loginPage() {
        return "Введите логин и пароль"
    }

    @Post('login')
    @UsePipes(new ValidationPipe({ transform: true }))
    login(@Body() loginDto: LoginDto): Promise<any> {
        return this.authService.login(loginDto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('test')
    test() {
        return true
    }
}
