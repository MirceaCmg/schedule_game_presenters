import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Presenters from "./pages/Presenters";
import Tables from "./pages/Tables";
import Schedule from "./pages/Schedule";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Schedule />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/presenters" element={<Presenters />} />
      </Routes>
    </Router>
  );
}

export default App;
