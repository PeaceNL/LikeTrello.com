import { Card } from "src/cards/entities/entities.card"
import {PrimaryGeneratedColumn, Entity, Column,  ManyToOne} from "typeorm"

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @ManyToOne(()=> Card, (card) => card.comments, {onDelete: 'CASCADE'})
    card: Card
}
