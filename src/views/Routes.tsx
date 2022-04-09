import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Home from './pages/home/Home';
import ServerDownPage from './pages/misc/ServerDownPage';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import User from './pages/user/User';

function AuthGuard({
    isAuthenticated,
    component,
}: {
    isAuthenticated: boolean;
    component: JSX.Element;
}) {
    return isAuthenticated ? component : <Navigate to="/signin" />;
}

export default function RoutesHandler() {
    const isAuthenticated = useAuth();
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Home />
                }
            />
            <Route path="/signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
            <Route path="users" element={<User />} />
            <Route path="server-down" element={<ServerDownPage />} />
        </Routes>
    );
}
