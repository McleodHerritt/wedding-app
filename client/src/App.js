import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import RSVPPage from "./pages/RSVPPage";
import GalleryPage from "./pages/GalleryPage";
import InvitationPage from "./pages/InvitationPage";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rsvp" element={<RSVPPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/invitation" element={<InvitationPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
