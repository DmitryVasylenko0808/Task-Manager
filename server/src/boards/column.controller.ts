import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ColumnService } from './column.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddColumnDto } from './dto/add-column.dto';

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
        @Body() body: AddColumnDto
    ) {
        await this.columnService.add(boardId, body);
    }

    @Delete(":columnId")
    @UseGuards(AuthGuard)
    async delete(@Param("columnId", ParseIntPipe) columnId: number) {
        await this.columnService.delete(columnId);
    }
}
