import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ColumnService } from './column.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddColumnDto } from './dto/add-column.dto';

@Controller('boards/:boardId/columns')
@UseGuards(AuthGuard)
export class ColumnController {
    constructor(private readonly columnService: ColumnService) {}

    @Get()
    async get(@Param("boardId", ParseIntPipe) boardId: number) {
        return await this.columnService.get(boardId);
    }

    @Post()
    async add(
        @Param("boardId", ParseIntPipe) boardId: number, 
        @Body() body: AddColumnDto
    ) {
        await this.columnService.add(boardId, body);
    }

    @Delete(":columnId")
    async delete(@Param("columnId", ParseIntPipe) columnId: number) {
        await this.columnService.delete(columnId);
    }
}
