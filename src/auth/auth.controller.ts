import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/config/pipes/validation.pipe';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly usersService: UsersService
    ){}

    @Post()
    createUser(
        @Body() user: CreateUserDto
    ) {
        return this.usersService.createNewUser(user)
    }

}
