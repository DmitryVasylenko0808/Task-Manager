import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';

@Injectable()
export class TasksService {
    constructor(private readonly prismaService: PrismaService) {}

    async getOneById(id: number) {
        const task = await this.prismaService.task.findUnique({
            where: { id },
            include: {
                column: true,
                priority: true,
                subtasks: true
            }
        });

        if (!task) {
            throw new BadRequestException("Task is not found");
        };

        return task;
    }

    async create(body: CreateTaskDto) {
        const { title, description, columnId, priorityId, subtasks } = body;

        const subtasksData = subtasks.map(s => ({ title: s }));

        const task = await this.prismaService.task.create({
            data: {
                title,
                description,
                column_id: columnId,
                priority_id: priorityId,
                subtasks: {
                    createMany: {
                        data: subtasksData
                    }
                }
            }
        })

        return task;
    }

    async edit(id: number, body: EditTaskDto) {
        const task = await this.prismaService.task.update({
            where: { id },
            data: {
                title: body.title,
                description: body.description,
                column_id: body.columnId,
                priority_id: body.priorityId,
                subtasks: {
                    deleteMany: {},
                    createMany: {
                        data: body.subtasks
                    }      
                }
            }
        });

        return task;
    }

    async delete(id: number) {
        const task = await this.prismaService.task.delete({
            where: { id }
        });

        return task;
    }
}
