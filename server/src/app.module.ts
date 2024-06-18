import { Module } from '@nestjs/common';
import { PrismaService } from "./prisma.service";
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [AuthModule, BoardsModule, TasksModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
