import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import Register from "./components/Register";
import Users from "./components/Users";
import { Notfound } from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Users />} />
          <Route path="/notFound" element={<Notfound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
