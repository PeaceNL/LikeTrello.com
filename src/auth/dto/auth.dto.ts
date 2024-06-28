import { IsEmail, IsString, MinLength } from "class-validator";
export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6, {message: 'Пароль Должен быть не менее 6 символов'})
    password: string;
}
