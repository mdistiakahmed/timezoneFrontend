import './App.css';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import User from './pages/user/User';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="users" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
