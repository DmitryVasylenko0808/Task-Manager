import { Controller, Get, UseGuards, Request, Post, Delete, Param, ParseIntPipe, Body } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private readonly boardsService: BoardsService) {}

    @UseGuards(AuthGuard)
    @Get()
    async get(@Request() req) {
        return await this.boardsService.get(req.user.id);
    }

    @UseGuards(AuthGuard)
    @Get(":id")
    async getOne(@Param("id", ParseIntPipe) id: number) {
        return await this.boardsService.getOne(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(
        @Request() req, 
        @Body() body: CreateBoardDto
    ) {
        await this.boardsService.create(req.user.id, body);
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        await this.boardsService.delete(id);
    }
}
