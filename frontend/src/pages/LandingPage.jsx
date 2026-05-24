import React from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ValueLadder } from "../components/ValueLadder";
import { DecisionArchitecture } from "../components/DecisionArchitecture";
import { Pillars13 } from "../components/Pillars13";
import { Strategy } from "../components/Strategy";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0b0e] text-white">
      <div className="grain-overlay" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <ValueLadder />
        <DecisionArchitecture />
        <Pillars13 />
        <Strategy />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
