import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import Register from "./components/Register";
import Users from "./components/Users";
import { Notfound } from "./components/NotFound";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>

          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/notFound" element={<Notfound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
