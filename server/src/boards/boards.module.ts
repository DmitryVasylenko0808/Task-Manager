import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { PrismaService } from 'src/prisma.service';
import { BoardsService } from './boards.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [BoardsController],
  providers: [PrismaService, BoardsService]
})
export class BoardsModule {}
