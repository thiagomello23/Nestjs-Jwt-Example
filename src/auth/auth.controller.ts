import { Body, Controller, Get, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { User } from '@prisma/client';
import { ValidationPipe } from 'src/config/pipes/validation.pipe';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthenticationGuard } from 'src/config/guards/authentication.guard';
import { Request } from "express"
import { Role } from 'src/config/decorators/role.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ){}

    @Post()
    @Role("admin")
    createUser(
        @Body() user: CreateUserDto
    ): Promise<User> {
        return this.usersService.createNewUser(user)
    }

    @Post("/login")
    @Role("public")
    login(
        @Body() loginDto: LoginDto
    ): Promise<Token> {
        return this.authService.login(loginDto)
    }

    @Get("validate")
    @Role("public")
    validate(
        @Req() request: Request
    ) {
        const userPayload = request["user"]
        return userPayload;
    }
}
