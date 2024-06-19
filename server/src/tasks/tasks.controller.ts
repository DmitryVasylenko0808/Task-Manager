import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';
import { ToggleSubtaskDto } from './dto/toggle-subtask.dto';
import { SubtasksService } from './subtasks.service';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
        private readonly subtaskService: SubtasksService
    ) {}

    @Get(":id")
    @UseGuards(AuthGuard)
    async getOne(@Param("id", ParseIntPipe) id: number) {
        return await this.tasksService.getOneById(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() body: CreateTaskDto) {
        await this.tasksService.create(body);
    }

    @Patch(":id")
    @UseGuards(AuthGuard)
    async edit(
        @Param("id", ParseIntPipe) id: number,
        @Body() body: EditTaskDto
    ) {
        return await this.tasksService.edit(id, body);
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    async delete(@Param("id", ParseIntPipe) id: number) {
        await this.tasksService.delete(id);
    }

    @Patch(":id/subtasks/:subtaskId")
    @UseGuards(AuthGuard)
    async toggleSubtask(
        @Param("subtaskId", ParseIntPipe) subtaskId: number,
        @Body() body: ToggleSubtaskDto
    ) {
        return await this.subtaskService.toggle(subtaskId, body); 
    }
}
