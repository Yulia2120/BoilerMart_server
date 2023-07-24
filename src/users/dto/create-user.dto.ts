import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto{
    @ApiProperty({example:'Jown'})
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({example:'jown1234'})
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({example:'jown@gmail.com'})
    @IsNotEmpty()
    readonly email: string;
}