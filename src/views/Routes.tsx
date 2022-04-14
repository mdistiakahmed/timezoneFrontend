import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Home from './pages/home/Home';
import ServerDownPage from './pages/misc/ServerDownPage';
import Signin from './pages/signin';
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
                    <AuthGuard
                        component={<Home />}
                        isAuthenticated={isAuthenticated}
                    />
                }
            />
            <Route
                path="users"
                element={
                    <AuthGuard
                        component={<User />}
                        isAuthenticated={isAuthenticated}
                    />
                }
            />
            <Route path="/sign-in" element={<Signin />} />
            <Route path="sign-up" element={<Signup />} />
            {/* <Route path="server-down" element={<ServerDownPage />} /> */}
            <Route path="*" element={<div>Not found</div>} />
        </Routes>
    );
}
