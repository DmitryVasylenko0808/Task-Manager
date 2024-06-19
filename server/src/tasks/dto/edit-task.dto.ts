type Subtask = {
    title: string;
    id?: number;
    done?: boolean;
}

export class EditTaskDto {
    readonly title: string;
    readonly description: string;
    readonly columnId: number;
    readonly priorityId: number;
    readonly subtasks: Subtask[];
}