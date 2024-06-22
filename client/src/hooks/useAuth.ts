import { useLazyGetMeQuery } from "../api/auth/authApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUser } from "../redux/slices/authSlice";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    
    const user = useAppSelector(state => state.auth.user)

    const [triggerGetMe] = useLazyGetMeQuery();

    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;

    const setAuthData = () => {
        triggerGetMe()
        .unwrap()
        .then((data) => {
            dispatch(setUser(data));
        }
    )}

    const authenticate = (token: string) => {
        localStorage.setItem("token", token);
        setAuthData();
    };

    const logOut = () => {
        localStorage.removeItem("token");
        dispatch(setUser(null));
    }

    return {
        token,
        isAuthenticated,
        user,
        authenticate,
        setAuthData,
        logOut
    }
}