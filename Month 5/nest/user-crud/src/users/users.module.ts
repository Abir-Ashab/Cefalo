import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../common/guards/auth.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: 'APP_INTERCEPTOR', useClass: LoggingInterceptor },
  ],
})
export class UsersModule {}