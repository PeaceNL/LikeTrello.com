import { IsString } from "class-validator"


export class CreateColumnDTO {
    @IsString()
    name: string

    }
