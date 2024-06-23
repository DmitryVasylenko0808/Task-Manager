type Column = {
    id: number;
    title: string;
    board_id: number;
};

type Priority = {
    id: number;
    title: string;
    value: number;
};

export type Subtask = {
    id: number;
    title: string;
    done: boolean;
    task_id: number;
};

export type TaskDetails = {
    id: number;
    title: string;
    description: string;
    column_id: number;
    column: Column;
    priority_id: number;
    priority: Priority;
    subtasks: Subtask[];
};

export type GetOneTaskDto = TaskDetails;