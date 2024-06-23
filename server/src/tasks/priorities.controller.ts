import { Controller, Get, UseGuards } from '@nestjs/common';
import { PriorityService } from './priority.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('priorities')
@UseGuards(AuthGuard)
export class PrioritiesController {
    constructor(private readonly prioritiesService: PriorityService) {}

    @Get()
    async get() {
        return await this.prioritiesService.get();
    }
}
