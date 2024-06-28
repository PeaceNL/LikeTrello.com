import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import { Columns } from "src/columns/entities/entities.column"

@Entity()
export class User {
    @PrimaryGeneratedColumn()    
    id: number

    @Column()
    email: string

    @Column({nullable:true})
    login: string

    @Column()
    password: string

    @OneToMany(()=> Columns, (column) => column.user)
    columns: Columns[]
}
