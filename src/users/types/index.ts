import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest{
    @ApiProperty({example: 'Jown'})
    username: string;

    @ApiProperty({example: 'jown1234'})
    password: string;
}

export class LoginUserResponse{
    @ApiProperty({example: {user:{
        userId:1,
        username:'Jown',
        password:'jown1234'
    }}})
    user: {
        userId: number;
        username: string;
        password: string
    }

    @ApiProperty({example: 'Logged in'})
    msg: string;
}

export class LogoutUserResponse{
    @ApiProperty({example: 'session has ended'})
    msg: string;
}

export class LoginCheckResponse{
    @ApiProperty({example: 1})
    userId:number;

    @ApiProperty({example: 'Jown'})
    username: string;

    @ApiProperty({example: 'jown@gmail.com'})
    email: string;
}

export class SignupResponse{
    @ApiProperty({example: 1})
    userId:number;

    @ApiProperty({example: 'Jown'})
    username: string;

    @ApiProperty({example: '$2b$10$.pX0H52LmqJMPX0PVR6Wnu0A0lfMvtv1nIv35W1L.UsGlGSdCDhKy'})
    password: string;

    @ApiProperty({example: 'jown@gmail.com'})
    email: string;

    @ApiProperty({example: '2023-07-07T09:28:42.726Z'})
    updatedAt: string;

    @ApiProperty({example: '2023-07-07T09:28:42.726Z'})
    createdAt: string;
}