import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL_BOARDS } from "../../constants/api";
import { GetBoardsDto } from "./dto/GetBoardsDTO";
import { GetOneBoardDto } from "./dto/GetOneBoardDTO";
import { GetColumnsDto } from "./dto/GetColumnsDTO";

type CreateBoardParams = {
    title: string;
};

type AddColumnParams = {
    id: number;
    title: string;
};

type DeleteColumnParams = {
    boardId: number;
    columnId: number;
}

export const boardsApi = createApi({
    reducerPath: "boardsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL_BOARDS,
        prepareHeaders: headers => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
        }
    }),
    tagTypes: ["Boards", "Columns"],
    endpoints: builder => ({
        getBoards: builder.query<GetBoardsDto, void>({
            query: () => "/",
            providesTags: ["Boards"]
        }),
        getOneBoard: builder.query<GetOneBoardDto, number>({
            query: (id) => `/${id}`,
            providesTags: ["Boards"]
        }),
        createBoard: builder.mutation<void, CreateBoardParams>({
            query: (body) => ({
                url: "/",
                method: "POST",
                body
            }),
            invalidatesTags: ["Boards"]
        }),
        deleteBoard: builder.mutation<void, number>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Boards"]
        }),
        getColumns: builder.query<GetColumnsDto, number>({
            query: (id) => `/${id}/columns`,
            providesTags: ["Columns"]
        }),
        addColumn: builder.mutation<void, AddColumnParams>({
            query: ({id, ...body}) => ({
                url: `/${id}/columns`,
                method: "POST",
                body
            }),
            invalidatesTags: ["Columns"]
        }),
        deleteColumn: builder.mutation<void, DeleteColumnParams>({
            query: ({ boardId, columnId }) => ({ 
                url: `/${boardId}/columns/${columnId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Columns"]
        })
    })
});

export const { 
    useGetBoardsQuery,
    useLazyGetBoardsQuery,
    useGetOneBoardQuery,
    useCreateBoardMutation,
    useDeleteBoardMutation,
    useGetColumnsQuery,
    useAddColumnMutation,
    useDeleteColumnMutation
 } = boardsApi;