import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Pages/Home";
import Contact from "./Components/Pages/Contact";
import About from "./Components/Pages/About";
import Navbar from "./Components/Navbar";
import Player from "./Components/Player";
import Teams from "./Components/Teams";
import TeamPage from "./Components/TeamPage";
import Juries from "./Components/Juries";
import PlayerPage from "./Components/PlayerPage";
import Matches from "./Components/Matches";
import TermsAndConditions from "./Components/TermsAndConditions";
import MatchPage from "./Components/MatchPage";
import Dashboard from "./Components/Pages/Dashboard";
import UserContextProvider from "./Contexts/userContext";

const App = () => {
  return (
    <UserContextProvider>
    <div>
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot-password" element={<h1>Forgot Password Page</h1>} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/player" element={<Player/>} />
        <Route path="/teams" element={<Teams/>} />
        <Route path="/team/:id" element={<TeamPage />} />
        <Route path="/juries" element={<Juries />} />
        <Route path="/player/:id" element={<PlayerPage />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
        <Route path="/match/:id" element={<MatchPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </div>
    </UserContextProvider>
  );
};

export default App;
