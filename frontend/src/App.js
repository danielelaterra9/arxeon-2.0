import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster theme="dark" position="top-right" />
      </LanguageProvider>
    </div>
  );
}

export default App;
