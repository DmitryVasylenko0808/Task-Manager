export type Priority = {
    id: number;
    title: string;
    value: number;
}

export type Task = {
    id: number;
    column_id: number;
    title: string;
    description: string;
    priority: Priority;
};

export type Column = {
    id: number;
    board_id: number;
    title: string;
    tasks: Task[];
};

export type GetColumnsDto = Column[];