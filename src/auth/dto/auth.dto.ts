import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @IsEmail()
    @ApiProperty({example: 'PDestroyer@gmail.com', description: 'Need Valid Email'})
    email: string;

    @IsString()
    @ApiProperty({example: 'pass!must@have#more$six%symbols^', description: 'Password must hame more 6 symbols'})
    @MinLength(6, {message: 'Пароль Должен быть не менее 6 символов'})
    password: string;
}
