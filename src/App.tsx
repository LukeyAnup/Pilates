import "./App.css";

import ContactUs from "./components/contact/contact";
import Footer from "./components/footer";
import Home from "./components/home/home";

import Navbar from "./components/navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pricing from "./components/pricing";
import Classes from "./components/classes/classes";
import Barre from "./components/classes/barre";
import ReformerPilates from "./components/classes/reformerPilates";
import Yoga from "./components/classes/yoga";
import ScrollToTop from "./components/scrollToTop";

export default function App() {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classes/barre" element={<Barre />} />
          <Route
            path="/classes/reformer-pilates"
            element={<ReformerPilates />}
          />
          <Route path="/classes/yoga" element={<Yoga />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
