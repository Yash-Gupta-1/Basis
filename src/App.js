import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './actions';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const nevigate = useNavigate()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  useEffect(() => {
    if (user === "") {
      nevigate('/login')
    }
  }, [user, nevigate])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Login  */}
        <Route path="/login" element={<Login />} />
        {/* Signup */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
