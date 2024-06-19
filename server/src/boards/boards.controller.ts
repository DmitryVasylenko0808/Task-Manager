import { Controller, Get, UseGuards, Request, Post, Delete, Param, ParseIntPipe, Body } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardsController {
    constructor(private readonly boardsService: BoardsService) {}

    @Get()
    async get(@Request() req) {
        return await this.boardsService.get(req.user.id);
    }

    @Get(":id")
    async getOne(@Param("id", ParseIntPipe) id: number) {
        return await this.boardsService.getOne(id);
    }

    @Post()
    async create(
        @Request() req, 
        @Body() body: CreateBoardDto
    ) {
        await this.boardsService.create(req.user.id, body);
    }

    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        await this.boardsService.delete(id);
    }
}
