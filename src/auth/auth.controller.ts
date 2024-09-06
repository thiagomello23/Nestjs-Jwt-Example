import { Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly usersService: UsersService
    ){}

    @Post()
    createUser() {

    }

}
