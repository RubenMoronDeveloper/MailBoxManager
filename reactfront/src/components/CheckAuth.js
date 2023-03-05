import {useIsAuthenticated} from 'react-auth-kit';
import { Navigate } from 'react-router-dom';


const CheckAuthComp = () => {
    const isAuthenticated = useIsAuthenticated()

    if(isAuthenticated()){
        
    }
    else {
        // Redirect to Login
    }
}
export default CheckAuthComp