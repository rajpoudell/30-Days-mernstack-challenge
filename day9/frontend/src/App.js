import "./App.css";
import { Form } from "./Form";

import { Route, Routes } from "react-router-dom";
import { Navbar } from "./navbar/navbar";
import Login from "./Login";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route path="/register" element={<Form/>}/>   
          <Route path="/login" element={<Login/>}/>   

        </Route>
      </Routes>
    </div>
  );
}

export default App;
