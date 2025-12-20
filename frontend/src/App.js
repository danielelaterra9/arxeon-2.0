import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Servizi from "./pages/Servizi";
import Valutazione from "./pages/Valutazione";
import ValutazioneConferma from "./pages/ValutazioneConferma";
import Metodo from "./pages/Metodo";
import Contatti from "./pages/Contatti";
import CheckoutBasic from "./pages/checkout/CheckoutBasic";
import CheckoutPremium from "./pages/checkout/CheckoutPremium";
import CheckoutGold from "./pages/checkout/CheckoutGold";
import ThankYou from "./pages/ThankYou";
import Onboarding from "./pages/Onboarding";

// Layout component to conditionally show footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isCheckout = location.pathname.startsWith('/checkout');
  const isThankYou = location.pathname === '/thank-you';
  const isOnboarding = location.pathname === '/onboarding';
  
  return (
    <>
      <Header />
      {children}
      {!isCheckout && !isThankYou && !isOnboarding && <Footer />}
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servizi" element={<Servizi />} />
            <Route path="/valutazione" element={<Valutazione />} />
            <Route path="/valutazione/conferma" element={<ValutazioneConferma />} />
            <Route path="/metodo" element={<Metodo />} />
            <Route path="/contatti" element={<Contatti />} />
            <Route path="/checkout/basic" element={<CheckoutBasic />} />
            <Route path="/checkout/premium" element={<CheckoutPremium />} />
            <Route path="/checkout/gold" element={<CheckoutGold />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/onboarding" element={<Onboarding />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <Toaster 
        position="top-right" 
        richColors 
        toastOptions={{
          style: {
            background: '#302f2c',
            color: '#ffffff',
            border: '1px solid #3f4816',
          },
        }}
      />
    </div>
  );
}

export default App;
