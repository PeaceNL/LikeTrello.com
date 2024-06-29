import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/entities.user";
import { InjectRepository } from "@nestjs/typeorm";

//в итоге не использовал отсюда а вызывал заного в сервисе

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User)
        readonly userRepository: Repository<User>
    ) {}
    
}
