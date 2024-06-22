import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL_BOARDS } from "../../constants/api";
import { GetBoardsDto } from "./dto/GetBoardsDTO";
import { GetOneBoardDto } from "./dto/GetOneBoardDTO";

type CreateBoardParams = {
    title: string;
}

export const boardsApi = createApi({
    reducerPath: "boardsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL_BOARDS,
        prepareHeaders: headers => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
        }
    }),
    tagTypes: ["Boards"],
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
        })
    })
});

export const { 
    useGetBoardsQuery,
    useLazyGetBoardsQuery,
    useGetOneBoardQuery,
    useCreateBoardMutation,
    useDeleteBoardMutation
 } = boardsApi;