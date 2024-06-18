import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ColumnService } from './column.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('boards/:boardId/columns')
export class ColumnController {
    constructor(private readonly columnService: ColumnService) {}

    @Get()
    @UseGuards(AuthGuard)
    async get(@Param("boardId", ParseIntPipe) boardId: number) {
        return await this.columnService.get(boardId);
    }

    @Post()
    @UseGuards(AuthGuard)
    async add(
        @Param("boardId", ParseIntPipe) boardId: number, 
        @Body() body: unknown
    ) {}

    @Delete(":columnId")
    @UseGuards(AuthGuard)
    async delete(@Param("columnId", ParseIntPipe) columnId: number) {}
}
