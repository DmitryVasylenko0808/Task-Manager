import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
    constructor(private readonly prismaService: PrismaService) {}

    async getOneById(id: number) {
        const task = await this.prismaService.task.findUnique({
            where: { id },
            include: {
                subtasks: true
            }
        });

        if (!task) {
            throw new BadRequestException("Task is not found");
        };

        return task;
    }
}
