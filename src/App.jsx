import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Cars } from "./components/Cars";
import { Users } from "./pages/Users";

function App() {
  return (
    <>
      <h1>Hi</h1>
      <Routes>
        <Route path="/cars" element={<Cars />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
