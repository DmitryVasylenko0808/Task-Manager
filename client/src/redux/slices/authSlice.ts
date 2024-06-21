import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = {
    id: number;
    login: string;
}

type AuthState = {
    user: User | null
}

const initialState: AuthState = {
    user: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        }
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;