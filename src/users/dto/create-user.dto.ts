import { IsString, IsInt, ValidateNested, IsEmail, Min, Max, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsEmail()
    email: string;   

    @IsString()
    @MinLength(6, {message: 'Пароль должень быть не менее 6 символов'})
    password: string;    
}
