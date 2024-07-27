import React, { Suspense } from 'react';
import './App.css';
import Spinner from './components/Spinner';

const Header = React.lazy(() => import('./components/Header'));
const HeroSection = React.lazy(() => import('./components/HeroSection'));
const WhyUs = React.lazy(() => import('./components/WhyUs'));
const ExploreVenues = React.lazy(() => import('./components/ExploreVenues'));
const CustomerReviews = React.lazy(() => import('./components/CustomerReviews'));
const SustainablePractices = React.lazy(() => import('./components/SustainablePractices'));
const Footer = React.lazy(() => import('./components/Footer'));


const App = () => {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner />
      </div>
    }>
      <div className="App">
        <Header />
        <HeroSection />
        <WhyUs />
        <ExploreVenues />
        <CustomerReviews />
        <SustainablePractices />
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
