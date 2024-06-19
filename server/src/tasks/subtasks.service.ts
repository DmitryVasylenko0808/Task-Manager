import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ToggleSubtaskDto } from './dto/toggle-subtask.dto';

@Injectable()
export class SubtasksService {
    constructor(private readonly prismaService: PrismaService) {}

    async toggle(subtaskId: number, body: ToggleSubtaskDto) {
        const { value } = body;

        const subtask = await this.prismaService.subtask.update({
            where: {
                id: subtaskId
            },
            data: {
                done: value
            }
        });

        return subtask;
    }
}
