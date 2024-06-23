import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL_TASKS } from "../../constants/api";
import { GetOneTaskDto } from "./dto/GetOneTaskDTO";

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
            invalidatesTags: ["Tasks", "Columns"]
        }),
        editTask: builder.mutation<unknown, unknown>({
            query: ({ id, ...body }) => ({
                url: `/${id}`,
                method: "PATCH",
                body
            })
        }),
        deleteTask: builder.mutation<unknown, unknown>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            })
        })
    })
});

export const { 
    useGetOneTaskQuery,
    useCreateTaskMutation,
    useEditTaskMutation,
    useDeleteTaskMutation
 } = tasksApi;