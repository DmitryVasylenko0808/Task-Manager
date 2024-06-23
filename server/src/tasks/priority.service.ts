import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PriorityService {
    constructor(private readonly prismaService: PrismaService) {}

    async get() {
        const priorities = await this.prismaService.priority.findMany({
            orderBy: {
                value: 'asc'
            }
        });

        return priorities;
    }
}
