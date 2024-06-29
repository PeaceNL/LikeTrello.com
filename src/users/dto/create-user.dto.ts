import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, ValidateNested, IsEmail, Min, Max, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsEmail()
    @ApiProperty({example: 'exampleEmail@gmail.com', description: 'Valid Email'})
    email: string;   

    @IsString()
    @ApiProperty({example: 'dsljcb[gjhcvjnhbnt&:)', description: 'Password must hame more 6 symbols'})
    @MinLength(6, {message: 'Пароль должень быть не менее 6 символов'})
    password: string;    
}
