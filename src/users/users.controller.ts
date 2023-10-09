import { UsersService } from './users.service';
import { Controller, Post, HttpCode, HttpStatus, Header, Body, Request, UseGuards, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { LoginCheckResponse, LoginUserRequest, LoginUserResponse, LogoutUserResponse, SignupResponse } from './types';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @ApiOkResponse({type: SignupResponse})
    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-type', 'application/json')
    createUser(@Body() createUserDto: CreateUserDto){
        return this.usersService.create(createUserDto);
    }

    @ApiBody({type: LoginUserRequest})
    @ApiOkResponse({type: LoginUserResponse})
    @Post('/login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    login(@Request() req){
        return {user: req.user, msg: 'Logged in'};
    }

    @ApiOkResponse({type: LoginCheckResponse})
    @Get('/login-check')
    @UseGuards(AuthenticatedGuard)
    loginCheck(@Request() req){
        return req.user;
    }

    @ApiOkResponse({type: LogoutUserResponse})
    @Get('/logout')
    logout(@Request() req){
        req.session.destroy();
        return {msg: 'session has ended'};
    }

}
