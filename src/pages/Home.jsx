import React from 'react'
import { useSelector } from 'react-redux';
import HeroSection from '../components/homePage/HeroSection';
import HostingPlane from '../components/homePage/HostingPlane';

import TrustSection from '../components/homePage/TrustSection';
import FeaturesSection from '../components/homePage/FeaturesSection';
import TestimonialSection from '../components/homePage/testimonials';
import HostingFAQ from '../components/homePage/HostingFAQ';


const Home = () => {

  const { user, loading } = useSelector((state) => state.user);

  return (
    <div>
      {/* <Header /> */}
      <HeroSection/>
      <HostingPlane/>
      <TrustSection/>
      <FeaturesSection/>
      <TestimonialSection/>
      <HostingFAQ/>
      
      
    </div>
  )
}

export default Home
