import { Columns } from "src/columns/entities/entities.column"
import { Comment } from "src/comments/entities/entities.comment"
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from "typeorm"

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @ManyToOne(()=> Columns, (column)=> column.cards, {onDelete: 'CASCADE'})
    column: Columns
    @OneToMany(()=> Comment, (comment) => comment.card, {cascade: true, onDelete:'CASCADE'})
    comments: Comment[]

}
