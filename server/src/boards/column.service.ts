import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

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
}
