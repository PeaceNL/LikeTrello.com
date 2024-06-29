import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Columns } from './entities/entities.column';
import { UsersService } from 'src/users/users.service';
import { CreateColumnDTO } from './dto/create-column.dto';
import { User } from 'src/users/entities/entities.user';




@Injectable()
export class ColumnsService {
    constructor(
        @InjectRepository(Columns)
        private readonly columnRepository: Repository<Columns>,
        private readonly usersService: UsersService
    ){}

    async getUsersColumns(userId: number): Promise<Columns[]> {       
       return this.columnRepository.find({ where: { user: { id: userId } } });
       
    }

    async findOneById(columnId: number): Promise<Columns> {       
        return this.columnRepository.findOne({where: {id: columnId}, relations: ['user']});
        
     }
    

    async addColumns(userId: number, createColumnDTO: CreateColumnDTO): Promise<Columns | string> {
        const user = await this.usersService.getUserById(userId)
        if (!(user instanceof User)) {
            return 'User not found'
        }

        const newColumn = this.columnRepository.create({...createColumnDTO, user})
        const saveColumn = await this.columnRepository.save(newColumn)
        return saveColumn.name
    }

    async getColumn(columnId: number) {
        return this.columnRepository.findOne({ where: { id: columnId}, relations: ['cards']});
    }


    async deleteColumn(columnId: number) {
        const column = await this.columnRepository.findOne({ where: { id: columnId}, relations: ['cards']});  //, relations: ['cards'] 
        console.log(columnId)
        console.log(column)
        if (!column) {
            throw new NotFoundException('Column not found or does not belong to the user');
          }
        await this.columnRepository.remove(column)
    }            
}
