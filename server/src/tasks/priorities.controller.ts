import { Controller, Get } from '@nestjs/common';
import { PriorityService } from './priority.service';

@Controller('priorities')
export class PrioritiesController {
    constructor(private readonly prioritiesService: PriorityService) {}

    @Get()
    async get() {
        return await this.prioritiesService.get();
    }
}
