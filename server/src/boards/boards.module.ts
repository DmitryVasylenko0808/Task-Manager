import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { PrismaService } from 'src/prisma.service';
import { BoardsService } from './boards.service';
import { AuthModule } from 'src/auth/auth.module';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';

@Module({
  imports: [AuthModule],
  controllers: [BoardsController, ColumnController],
  providers: [PrismaService, BoardsService, ColumnService]
})
export class BoardsModule {}
