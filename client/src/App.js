import React, {useEffect} from 'react';
import Footer from './Components/Footer/Footer'
import AboutUs from './Components/AboutUs/AboutUs'
import LandingPage from './Components/LandingPage/LandingPage';
import Models from './Components/Models/Models';
import Payment from './Components/Payment/Payment';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';

function App() {
  useEffect(() => {
    document.title = "GasNGo";  
  }, []);
  return (
    <div className="App">
      <title>GasNGo</title>
      <Router>
      <Routes>
        <Route path="/" exact="true" element={<LandingPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/models" element={<Models />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
