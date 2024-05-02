// import './App.css';
import { Route, Routes } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { Navbar } from './components/Navbar';
import { Notfound } from './pages/Notfound';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar/>}>
          
          <Route path="/" element={<Home/>}/>   
          <Route path="/register" element={<Register/>}/>   
          <Route path="/login" element={<Login/>}/>   
          <Route path="*" element={<Notfound/>}/>   
          <Route path="/myprofile" element={<UserProfile/>}/>   




        </Route>
      </Routes>
    </div>
  );
}

export default App;
