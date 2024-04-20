import "./App.css";
import { Form } from "./Form";

import { Route, Routes } from "react-router-dom";
import { Navbar } from "./navbar/navbar";
import Login from "./Login";
import { Nomatch } from "./Nomatch";
import { Home } from "./Home";
import Profile from "./components/Profile";
import Updateuserdetails from "./components/Updateuserdetails";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Navbar/>}>
          
          <Route path="/" element={<Home/>}/>   
          <Route path="/register" element={<Form/>}/>   
          <Route path="/login" element={<Login/>}/>   
          <Route path="/myprofile" element={<Profile/>}/>   
          <Route path="/editprofile" element={<Updateuserdetails/>}/>   
          <Route path="*" element={<Nomatch/>}/>   

        </Route>
      </Routes>
    </div>
  );
}

export default App;
