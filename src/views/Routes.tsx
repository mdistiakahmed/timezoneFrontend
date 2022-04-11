import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ApplicationContext } from '../context/AppContext';
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
    const { state } = useContext(ApplicationContext);
    const isAuthenticated = useAuth(state.token.value);
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
            <Route path="/signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
            <Route path="server-down" element={<ServerDownPage />} />
        </Routes>
    );
}
