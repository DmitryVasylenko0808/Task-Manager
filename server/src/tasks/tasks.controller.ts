import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';
import { ToggleSubtaskDto } from './dto/toggle-subtask.dto';
import { SubtasksService } from './subtasks.service';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
        private readonly subtaskService: SubtasksService
    ) {}

    @Get(":id")
    async getOne(@Param("id", ParseIntPipe) id: number) {
        return await this.tasksService.getOneById(id);
    }

    @Post()
    async create(@Body() body: CreateTaskDto) {
        await this.tasksService.create(body);
    }

    @Patch(":id")
    async edit(
        @Param("id", ParseIntPipe) id: number,
        @Body() body: EditTaskDto
    ) {
        await this.tasksService.edit(id, body);
    }

    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        await this.tasksService.delete(id);
    }

    @Patch(":id/subtasks/:subtaskId")
    async toggleSubtask(
        @Param("subtaskId", ParseIntPipe) subtaskId: number,
        @Body() body: ToggleSubtaskDto
    ) {
        await this.subtaskService.toggle(subtaskId, body); 
    }
}
