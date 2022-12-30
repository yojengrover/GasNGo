import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { SCREENS } from "./responsive.ts";
import JeepImg from "../../imgs/jeep.png";
import { BookingSteps } from "./bookingSteps.tsx";
import { TopSection } from "./topSection.tsx";
import Header from '../Header/Header';
import './AboutUs.css';


const AboutUsContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-wrap
    items-center
    justify-center
    pt-4
    pb-4
    pr-7
    pl-7
    md:pl-0
    md:pr-0
    bg-white
  `};
`;

const CarContainer = styled.div`
  width: auto;
  height: 15em;
  margin-left: -50px;

  img {
    width: auto;
    height: 100%;
  }

  @media (min-width: ${SCREENS.md}) {
    height: 28em;
  }

  @media (min-width: ${SCREENS.lg}) {
    height: 30em;
  }

  @media (min-width: ${SCREENS["2xl"]}) {
    height: 35em;
    margin-left: 0;
  }
`;

const InfoContainer = styled.div`
  ${tw`
    md:w-1/2
    flex
    flex-col
    md:ml-6
    2xl:ml-16
  `};
`;

const Title = styled.h1`
  ${tw`
    text-black
    text-2xl
    md:text-5xl
    font-extrabold
    md:font-black
    md:leading-normal
  `};
`;

const InfoText = styled.p`
  ${tw`
    md:max-w-2xl
    text-sm
    md:text-base
    text-gray-500
    font-normal
    mt-4
  `};
`;

export function AboutUs() {
  const contributorDetails = [{
    name:"Yojen Grover",
    gitLink:"github.com/yojengrover",
    post:"ReactJS Developer"
  },
  {
    name:"DhruvKumar Sonani",
    gitLink:"github.com/dhruvksonani",
    post:"Developer"
  },
  {
    name:"Depanshu Kumar",
    gitLink:"github.com/deep21",
    post:"Developer"
  },]
  return (<div>
    <Header ns={3}/>
    <AboutUsContainer>
      <CarContainer >
        <img src={JeepImg} alt="jeepImage"/>
      </CarContainer>

      <InfoContainer>
        <Title>Feel The Best Experience With Our Rental Deals</Title>
        <InfoText>
        Why Gas n Go?

Skip the rental counter
More bang for your buck

Find deals on all kinds of drives — from the everyday to the extraordinary — complete with a better, more convenient experience versus rental car companies. Find the perfect vehicle for your budget, starting at $25 per day.

Free cancellation

Cancel for a full refund up to 24 hours before your trip starts. Because life happens and it helps to be flexible when it does.

Convenient delivery options

Get your car delivered right to you or wherever you’re going. Many hosts offer delivery to custom locations or popular points of interest like airports, train stations, and hotels.
        </InfoText>
      </InfoContainer>
      <TopSection />
      <BookingSteps />
      
    </AboutUsContainer>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
      { contributorDetails.map((person)=>(
      <div class="col mb-4">
      <div class="card">
      <div class="card-header">
        Contributor Details
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">{person.name}</li>
        <li class="list-group-item">{person.post}</li>
        <li class="list-group-item">{person.gitLink}</li>
        
      </ul>
    </div></div>))}</div>
    </div>
  );
}

export default AboutUs;