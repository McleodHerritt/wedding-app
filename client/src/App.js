import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/Home/HomePage";
import RSVPPage from "./pages/RSVPPage/RSVPPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import InvitationPage from "./pages/Invitation/invitationPage";
import CouplesInfo from "./pages/CouplesInfo/CouplesInfo";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rsvp" element={<RSVPPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/invitation" element={<InvitationPage />} />
          <Route path="/couples-info" element={<CouplesInfo />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
