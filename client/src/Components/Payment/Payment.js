import React, { useState, useRef, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { ReactSession } from "react-client-session";
import './Payment.css';


const Payment = () => {

  const location = useLocation();
  //Condition,
  // Milege,
  
  // rating,
  // transmissiontyp

  console.log(location.state);
  const isSignedIn = ReactSession.get("isSignedIn");
  const Dl = ReactSession.get("Dl");
  const email = ReactSession.get("email");
  console.log(email);
  return (

    <div className="App-body">
      <Header />
      <h3>Booking Details</h3>
      <div className='bookingdetails'>
        <Stack
          component="form"
          sx={{
            width: '25ch',
          }}
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <TextField
            placeholder='Email'
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue={isSignedIn === "Yes" ? email : ''}
            variant="filled"
            size="small"

          />
          <TextField
            hiddenLabel
            placeholder='Driving Licence'
            id="filled-hidden-label-small"
            defaultValue={isSignedIn === "Yes" ? Dl : ''}
            variant="filled"
          />
        </Stack>
{location.state.id == 2 ?
        <div className='resultsdiv1'>
          <div className='carimage'>
            <img src={location.state.carname.carimg} className="img-fluid" alt="Responsive image" />
          </div>
          <div className='detailsdiv'>

            <div className='detailsDiv'>
              <div>
                <span className='carName'>{location.state.carname.carname}</span>
              </div>
              <div className='detailsdiv-1'>
      
                <span>{location.state.carname.fueltyp}</span>
              </div>
              <div className='detailsdiv-2'>

                </div>
              <span>{location.state.carname.Model}</span>
            </div>
          </div>
          <div className='pricingdiv'>
            <span className='carPrice'>${location.state.carname.DailyPrice}</span>
            <div>

            </div>
          </div>
        </div>:<div className='resultsdiv1'>
          <div className='carimage'>
            <img src={location.state.carimg} className="img-fluid" alt="Responsive image" />
          </div>
          <div className='detailsdiv'>

            <div className='detailsDiv'>
              <div>
                <span className='carName'>{location.state.carname}</span>
              </div>
              <div className='detailsdiv-1'>
      
                <span>{location.state.fueltyp}</span>
              </div>
              <div className='detailsdiv-2'>

                </div>
              <span>{location.state.Model}</span>
            </div>
          </div>
          <div className='pricingdiv'>
            <span className='carPrice'>${location.state.DailyPrice}</span>
            <div>

            </div>
          </div>
        </div>
}

      </div>

      <p>

      </p>
      <PayPalScriptProvider
        options={{ "client-id": "AYj-DxLTDtqbVoXSlm4wxPZmqqUWVRm_oFcvY4K7egnrRvoX3S75de8ZTxDCRJB49zOEONaT-OuR_Yfj" }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "43.99",
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            const details = await actions.order.capture();
            const name = details.payer.name.given_name;
            alert("Transaction completed by " + name);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default Payment;

