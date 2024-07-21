import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import WhyUs from './components/WhyUs';
import ExploreVenues from './components/ExploreVenues';
import CustomerReviews from './components/CustomerReviews';
import SustainablePractices from './components/SustainablePractices';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <WhyUs />
      <ExploreVenues />
      <CustomerReviews />
      <SustainablePractices />
      <Footer />
    </div>
  );
}

export default App;
