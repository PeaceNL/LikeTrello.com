import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCardDTO {
@IsString()
@ApiProperty({example: 'Some title'})
title: string
}
