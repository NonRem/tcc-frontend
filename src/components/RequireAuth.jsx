import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const {auth} = useAuth();
    const location = useLocation();
    const token = JSON.parse(window.localStorage.getItem('accessToken'))

    return (
        auth?.username
            ? <Outlet />
            : token !== undefined && token?.expires > new Date().getTime()
            ? <Outlet />
            : <Navigate to="/" state={{ from: location}} replace />
    )
}

export default RequireAuth;