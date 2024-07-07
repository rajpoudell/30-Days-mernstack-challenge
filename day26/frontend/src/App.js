import "./App.css";
import { Form } from "./Form";

import { Route, Routes } from "react-router-dom";
import { Navbar } from "./navbar/navbar";
import {Login} from "./Login";
import { Nomatch } from "./Nomatch";
import HomePage from "./Home";
function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Navbar />}>
          {/* Nested routes under the Navbar */}
          <Route index element={<HomePage />} />   
          <Route path="/register" element={<Form />} />   
          <Route path="/login" element={<Login />} />   
          <Route path="*" element={<Nomatch />} />   
        </Route>
      </Routes>
    </div>
  );
}

export default App;
