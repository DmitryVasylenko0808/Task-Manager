export class CreateTaskDto {
    readonly title: string;
    readonly description: string;
    readonly columnId: number;
    readonly priorityId: number;
    readonly subtasks: string[];
}