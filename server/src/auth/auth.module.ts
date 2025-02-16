import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: "24h"
      }
    })
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
