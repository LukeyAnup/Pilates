import "./App.css";

import ContactUs from "./components/contact/contact";
import Footer from "./components/footer";
import Home from "./components/home/home";

import Navbar from "./components/navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pricing from "./components/pricing";
import Classes from "./components/classes/classes";
import AboutUsPage from "./components/about/about";
import SchedulePage from "./components/schedule/schedule";

export default function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}
