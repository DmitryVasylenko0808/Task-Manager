import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL_TASKS } from "../../constants/api";
import { GetOneTaskDto } from "./dto/GetOneTaskDTO";
import { boardsApi } from "../boards/boardsApi";

type AddTaskParams = {
    title: string;
    description: string;
    columnId: number;
    priorityId: number;
    subtasks: string[];
};

type EditTaskParams = {
    id: number;
    title: string;
    description: string;
    columnId: number;
    priorityId: number;
    subtasks: {
        title: string;
        done?: boolean;
        id?: number;
        task_id?: number;
    }[];
};

type ToggleSubtaskParams = {
    id: number;
    subtaskId: number;
    value: boolean;
}

export const tasksApi = createApi({
    reducerPath: "tasksApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL_TASKS,
        prepareHeaders: headers => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
        }
    }),
    tagTypes: ["Tasks", "Columns"],
    endpoints: builder => ({
        getOneTask: builder.query<GetOneTaskDto, number>({
            query: (id) => `/${id}`,
            providesTags: ["Tasks"]
        }),
        createTask: builder.mutation<void, AddTaskParams>({
            query: (body) => ({
                url: "/",
                method: "POST",
                body
            }),
            invalidatesTags: ["Tasks"],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(boardsApi.util.invalidateTags(["Columns"]))
            },
        }),
        editTask: builder.mutation<void, EditTaskParams>({
            query: ({ id, ...body }) => ({
                url: `/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["Tasks"],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(boardsApi.util.invalidateTags(["Columns"]))
            },
        }),
        deleteTask: builder.mutation<void, number>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Tasks"],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(boardsApi.util.invalidateTags(["Columns"]))
            },
        }),
        toggleSubTask: builder.mutation<void, ToggleSubtaskParams>({
            query: ({ id, subtaskId, ...body }) => ({ 
                url: `/${id}/subtasks/${subtaskId}`,
                method: "PATCH",
                body
            }),
            onQueryStarted({ id, subtaskId, ...body }, { dispatch, queryFulfilled }) {
                const result = dispatch(
                    tasksApi.util.updateQueryData("getOneTask", id, (draft) => {
                        draft.subtasks = draft.subtasks.map((s) => s.id === subtaskId ? { ...s, done: body.value } : s )
                    }))

                queryFulfilled.catch(result.undo)
            },
        })
    })
});

export const { 
    useGetOneTaskQuery,
    useCreateTaskMutation,
    useEditTaskMutation,
    useDeleteTaskMutation,
    useToggleSubTaskMutation
 } = tasksApi;