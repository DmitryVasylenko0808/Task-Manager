import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    constructor(private readonly prismaService: PrismaService) {}

    async get(userId: number) {
        const boards = await this.prismaService.board.findMany({
            where: {
                user_id: userId
            }
        });

        return boards;
    }

    async getOne(id: number) {
        const board = await this.prismaService.board.findUnique({
            where: { id }
        });

        if (!board) {
            throw new BadRequestException("Board is not found");
        }

        return board;
    }

    async create(userId: number, body: CreateBoardDto) {
        const board = await this.prismaService.board.create({
            data: {
                user_id: userId,
                title: body.title
            }
        });

        return board;
    }

    async delete(id: number) {
        const board = await this.prismaService.board.delete({
            where: { id }
        });

        return board;
    }
}
