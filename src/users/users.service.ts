import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/entities.user';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor( 
        @InjectRepository(User)
        readonly usersRepository: Repository<User>
    ){}    
    

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email } });
    }

    
    async getUserById(id: number): Promise<User | undefined> {
        return  await this.usersRepository.findOne({ where: {id}})          
    }

    
    async addUser(createUserDto: CreateUserDto): Promise<string | User> {
        try {
            const user = await this.usersRepository.findOne({where: {email: createUserDto.email}})
        if (user) {
            return 'Такой email уже существует'
        }
        const hashPass = await bcrypt.hash(createUserDto.password, 8)
        createUserDto.password = hashPass
        const newUser = this.usersRepository.create(createUserDto)        
        return this.usersRepository.save(newUser);
        } catch (error) {
            throw new Error(error)
        }
                
    }
}

