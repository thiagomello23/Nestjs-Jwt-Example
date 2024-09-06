import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './config/prisma/prisma.service';
import { PrismaModule } from './config/prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './config/pipes/validation.pipe';
import { AuthenticationGuard } from './config/guards/authentication.guard';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard
    }
  ]
})
export class AppModule {}
