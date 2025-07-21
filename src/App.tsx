import "./App.css";
import AboutUs from "./components/about/contact";
import Footer from "./components/footer";
import Home from "./components/home/home";

import Navbar from "./components/navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pricing from "./components/pricing/pricing";

export default function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<AboutUs />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}
