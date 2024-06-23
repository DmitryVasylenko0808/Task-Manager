import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL_PRIORITIES } from "../../constants/api";
import { GetPrioritiesDto } from "./dto/GetPrioritiesDTO";

export const prioritiesApi = createApi({
    reducerPath: "prioritiesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL_PRIORITIES,
        prepareHeaders: headers => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
        }
    }),
    endpoints: builder => ({
        getPriorities: builder.query<GetPrioritiesDto, void>({
            query: () => "/"
        })
    })
});

export const { 
    useGetPrioritiesQuery
 } = prioritiesApi;