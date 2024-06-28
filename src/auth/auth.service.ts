import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
    constructor (
        private usersService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(email: string, pass: string): Promise<any>{        
        const user = await this.usersService.findOneByEmail(email);
        // console.log(user)
        if (user && await bcrypt.compare(pass, user.password)) {
            const {password, ...rest} = user
            // console.log({...rest})
            return rest
        }
        return null
    }

    async login(loginDto: LoginDto): Promise<any> {
        try {            
            const user = await this.validateUser(loginDto.email, loginDto.password);
            // console.log(`in login ${user}`)
            if (!user) {
                return "Логин или пароль неверны"
            }else {                
                const payload = {userId: user.id, email: user.email}
                return {
                    accessToken: this.jwtService.sign(payload)
                }
            }
        } catch (error) {
            throw new Error(error)
        } 
    }    
}
