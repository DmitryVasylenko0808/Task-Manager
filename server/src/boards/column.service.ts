import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddColumnDto } from './dto/add-column.dto';

@Injectable()
export class ColumnService {
    constructor(private readonly prismaService: PrismaService) {}

    async get(boardId: number) {
        const columns = await this.prismaService.column.findMany({
            where: {
                board_id: boardId
            },
            include: {
                tasks: true
            }
        });

        return columns;
    }

    async add(boardId: number, body: AddColumnDto) {
        const column = await this.prismaService.column.create({
            data: {
                title: body.title,
                board_id: boardId
            }
        });

        return column;
    }

    async delete(columnId: number) {
        const column = await this.prismaService.column.delete({
            where: {
                id: columnId
            }
        });

        return column;
    }
}
