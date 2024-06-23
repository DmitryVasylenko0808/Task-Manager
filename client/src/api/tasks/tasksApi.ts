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
        editTask: builder.mutation<unknown, unknown>({
            query: ({ id, ...body }) => ({
                url: `/${id}`,
                method: "PATCH",
                body
            })
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
        })
    })
});

export const { 
    useGetOneTaskQuery,
    useCreateTaskMutation,
    useEditTaskMutation,
    useDeleteTaskMutation
 } = tasksApi;