import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { User } from "src/users/entities/entities.user";
import { Card } from "src/cards/entities/entities.card";

@Entity()
export class Columns {
    @PrimaryGeneratedColumn()
    id: number   

    @Column()
    name: string

    @ManyToOne(()=> User, (user)=> user.columns)
    user: User
    
    @OneToMany(()=> Card, (card)=> card.column, {cascade: true, onDelete: 'CASCADE'})
    cards: Card[]
}
