import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma.service';
import { SubtasksService } from './subtasks.service';
import { PriorityService } from './priority.service';
import { PrioritiesController } from './priorities.controller';

@Module({
    imports: [AuthModule],
    controllers: [TasksController, PrioritiesController],
    providers: [TasksService, PrismaService, SubtasksService, PriorityService]
})
export class TasksModule {}
