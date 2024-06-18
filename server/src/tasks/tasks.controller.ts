import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get(":id")
    @UseGuards(AuthGuard)
    async getOne(@Param("id", ParseIntPipe) id: number) {
        return await this.tasksService.getOneById(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() body: unknown) {}

    @Patch(":id")
    @UseGuards(AuthGuard)
    async edit(
        @Param("id", ParseIntPipe) id: number,
        @Body() body: unknown
    ) {}

    @Delete(":id")
    @UseGuards(AuthGuard)
    async delete(@Param("id", ParseIntPipe) id: number) {}
}
