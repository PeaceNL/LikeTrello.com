import { IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateColumnDTO {
    @IsString()
    @ApiProperty({example: 'Some column name'})
    name: string

    }
