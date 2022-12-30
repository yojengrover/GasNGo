import React from 'react';
import './Models.css';
import {useQuery} from "@apollo/client"
import {getVEHICLES} from "../../Graphql/Query"
import Header from '../Header/Header';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './Models.css';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  
             
}));

function Models(props) {
  const {loading, error, data} = useQuery(getVEHICLES);
  var myarry = [
    {
      carname: "BMW",
      fueltyp: "Gas",
      transmissiontyp:"Automatic",
      Model: "5 Series",
      DailyPrice: 420
    },
    {
        carname: "BMW",
        fueltyp: "Diesel",
        transmissiontyp:"Manual",
        Model: "6 Series",
        DailyPrice: 520
      },
      {
        carname: "BMW",
        fueltyp: "Gas",
        transmissiontyp:"Automatic",
        Model: "7 Series",
        DailyPrice: 820
      },
      {
        carname: "BMW",
        fueltyp: "Gas",
        transmissiontyp:"Automatic",
        Model: "7 Series",
        DailyPrice: 820
      },
      {
        carname: "BMW",
        fueltyp: "Gas",
        transmissiontyp:"Automatic",
        Model: "7 Series",
        DailyPrice: 820
      },
      {
        carname: "BMW",
        fueltyp: "Gas",
        transmissiontyp:"Automatic",
        Model: "7 Series",
        DailyPrice: 820
      },
      {
        carname: "BMW",
        fueltyp: "Gas",
        transmissiontyp:"Automatic",
        Model: "7 Series",
        DailyPrice: 820
      },
      {
        carname: "BMW",
        fueltyp: "Gas",
        transmissiontyp:"Automatic",
        Model: "7 Series",
        DailyPrice: 820
      },
]
    


  return (
        <div>
          
          <Header ns={2}/>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">

        {data.getVehicles.map((car) => (
          <div class="col mb-4">
            <div class="card">
              <img src={car.carimg} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{car.carname}</h5>
                <p class="card-text">{car.Model}</p>
                <p class="card-text">{car.transmissiontyp} {car.fueltyp}</p>
              </div>
            </div>
          </div>))}
      </div>
</div>
    );
}

export default Models;