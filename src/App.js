import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        {/* Login  */}
        <Route path="/" element={<Login />} />
        {/* Signup */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
