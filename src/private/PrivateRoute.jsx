
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import CustomLoader from "../CustomLoader/CustomLoader";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading){
        return <CustomLoader/>
    }

    if (user.email) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;
