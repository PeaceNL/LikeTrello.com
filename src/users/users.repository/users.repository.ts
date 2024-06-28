import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/entities.user";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User)
        readonly userRepository: Repository<User>
    ) {}
    
}
