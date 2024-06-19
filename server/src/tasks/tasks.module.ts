import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma.service';
import { SubtasksService } from './subtasks.service';

@Module({
    imports: [AuthModule],
    controllers: [TasksController],
    providers: [TasksService, PrismaService, SubtasksService]
})
export class TasksModule {}
