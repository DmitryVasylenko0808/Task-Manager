import { Controller, Get, UseGuards, Request, Post, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('boards')
export class BoardsController {
    constructor(private readonly boardsService: BoardsService) {}

    @UseGuards(AuthGuard)
    @Get()
    async get(@Request() req) {
        return await this.boardsService.get(req.user.id);
    }

    // @UseGuards(AuthGuard)
    @Get(":id")
    async getOne(@Param("id", ParseIntPipe) id: number) {
        return await this.boardsService.getOne(id);
    }

    // @UseGuards(AuthGuard)
    @Post()
    async create(@Request() req) {}

    // @UseGuards(AuthGuard)
    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number) {}
}
