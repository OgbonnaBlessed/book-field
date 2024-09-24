import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { HashRouter as Router } from "react-router-dom";
import Footer from './Components/Footer/Footer'
import AnimatedRoutes from "./Components/AnimatedRoutes/AnimatedRoutes";

function App() {
  return (
    <div>
      <Router>
      <Navbar />
        <AnimatedRoutes/>
      <Footer />
      </Router>
    </div>
  );
}

export default App;
