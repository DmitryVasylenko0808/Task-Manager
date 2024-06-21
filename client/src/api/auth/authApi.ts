import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL_AUTH } from "../../constants/api";
import { GetMeDto } from "./dto/GetMeDTO";

type AuthParams = {
    login: string;
    password: string;
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL_AUTH,
        prepareHeaders: headers => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
        }
    }),
    endpoints: builder => ({
        signUp: builder.mutation<{ token: string }, AuthParams>({
            query: body => ({
                url: "/sign-up",
                method: "POST",
                body
            })
        }),
        signIn: builder.mutation<{ token: string }, AuthParams>({
            query: body => ({
                url: "/sign-in",
                method: "POST",
                body
            })
        }),
        getMe: builder.query<GetMeDto, void>({
            query: () => "/me"
        })
    }
)});

export const {
    useSignUpMutation,
    useSignInMutation,
    useLazyGetMeQuery
} = authApi;