import { Module } from '@nestjs/common';
import { PrismaService } from "./prisma.service";
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [AuthModule, BoardsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
