import { IsString } from "class-validator";

export class CreateCommentDTO {
    @IsString()
    text: string
}
