import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCommentDTO {
    @IsString()
    @ApiProperty({example: 'Some text in comment'})
    text: string
}
