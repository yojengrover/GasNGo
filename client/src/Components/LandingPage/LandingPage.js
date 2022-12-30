import React, { useState, useEffect } from 'react';
import cover from '../../imgs/cover.jpg'
import SearchResults from '../SearchResults/SearchResults';
import {getVEHICLES} from "../../Graphql/Query"
import {useQuery} from "@apollo/client"
import Geocode from "react-geocode";

import './LandingPage.css';
import Header from '../Header/Header';
const LandingPage = () => {
   const [homeEnabled, setHomeEnabled] = useState(true);
   const [signedIn, isSignedIn] = useState(false);
   const [startDate,setStartDate] = useState();
   const [endDate,setendDate] = useState();
   const [pickup,setPickup] = useState();
   const [drop,setDrop] = useState();
   const [wdata, setData] = useState();


   
	const {loading, error, data} = useQuery(getVEHICLES);
   const toSearchPage = () =>{
	setHomeEnabled(!homeEnabled);
	console.log(startDate);
	console.log(endDate);
	console.log(drop);
	console.log(pickup);

   } 

   const [lat,setLat]=useState()
    const [lon,setLon]=useState()

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((postion)=>{
            setLat(postion.coords.latitude)
            setLon(postion.coords.longitude)
        })
    })
    
    return (
	<div>
		<Header setHomeEnabled={setHomeEnabled} isSignedIn={isSignedIn} signedIn={signedIn} ns={1} />
 {homeEnabled ? <div className='container'>
		 <div className='row'>
			<div className='col'>
             <div className='tagLine_sec'>
				<span className='tagLine_sec_heading'>Rides and Rentals</span>
				<span className='tagLine_sec_statement'>Rent the best quality Cars with Us</span>
				</div>    
			</div>
			<div className='col'>
              <div className='poster_sec'>
			  <img src={cover} class="img-fluid" alt="Responsive image"/>
				</div> 
			</div>
		</div>
		<div className='row'>
        	<div className="section-center">
            					<div className="booking-form">
                                <div className="form-header">
							<h1>Make your reservation</h1>
						</div>
                        <form className='booking'>
                        <div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<span class="form-label">Pick up</span>
										<select class="form-control" onChange={(event) => {setPickup(event.target.value)}}>
											<option>Kitchener, Fairway Mall</option>
											<option>Waterloo</option>
											<option>Cambridge</option>
										</select>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<span class="form-label">Drop</span>
										<select class="form-control" onChange={(event) => {setDrop(event.target.value)}}>
											<option>Torronto</option>
											<option>Missisuaga</option>
											<option>Cambridge</option>
										</select>
									</div>
								</div>
							</div>
                        <div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<span class="form-label">Start Date</span>
										<input class="form-control" onChange={(event) => {setStartDate(event.target.value)}} type="date" required />
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<span class="form-label">End Date</span>
										<input class="form-control" onChange={(event) => {setendDate(event.target.value)}} type="date" required />
									</div>
								</div>
							</div>
                            <div className='row'>
                            
                            </div>
                            <div class="form-btn">
								<button class="submit-btn" onClick={toSearchPage}>Search Rides</button>
							</div>
                        </form>
                                </div>
       	 	</div>
		</div>
			
	</div> :
	<div>
	<SearchResults dataArray={data.getVehicles} backToHome={setHomeEnabled} 
	isSignedIn={isSignedIn} startDate={startDate} endDate={endDate} drop={drop} pickup={pickup}/>	
	</div>}
	
	</div>
    );
};

export default LandingPage;