import React, {useState, useEffect} from 'react';
import './SearchResults.css';
import { useNavigate  } from "react-router-dom";
import { ReactSession } from "react-client-session";
import cover from '../../imgs/angularfront.jpg'
import {useQuery} from "@apollo/client"
import {getVEHICLES} from "../../Graphql/Query"
import SuggestionMessage from '../SuggestionDialog/SuggestionMessage';
const SearchResults = (props) => {
  
    //const {loading, error, data} = useQuery(getVEHICLES);
    const [sortStates, setSortStates] = useState(false);
    const [array, setArray] =useState([]) 
    const [newArray, setnewArray] = useState([]);
    const [isSignedInSC, setisSignedInSC] = useState(props.signedIn);
    const [filterStates, setFilterStates] = useState(false);
    const [loginInMessage, setLoginMessage] = useState(false);
    const [preparedCar, setpreparedCar] =useState([]); 
    const [filterClick, setfilterClick] =useState(0); 
    const {startDate,endDate,pickup, drop } =props;
    if(isSignedInSC){
        props.isSignedIn(true);
    }
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
    ]

    useEffect(() => {
    setArray(props.dataArray)
    }, []);
   

    const sortData = () => {
       //setnewArray([...sortedArray]); 
        }



        const filterByGas = () =>{
            var newArray = array.filter(function (el) {
                return el.fueltyp === "Gas"});
            setnewArray(newArray)
            setFilterStates(true);
            setfilterClick(1);

            // setnewArray([...sortedArray]); 
    
        }

        const filterByDiesel = () =>{
            var newArray = array.filter(function (el) {
                return el.fueltyp === "Diesel"});
            setnewArray(newArray)
            setFilterStates(true);
            setfilterClick(2);
    
        }

        const filterByElectric = () =>{
            var newArray = array.filter(function (el) {
                return el.fueltyp === "Electric"});
            setnewArray(newArray)
            setFilterStates(true);
            setfilterClick(3);
    
        }

        const filterByAutomatic = () =>{
            var newArray = array.filter(function (el) {
                return el.transmissiontyp === "Automatic"});
            setnewArray(newArray)
            setFilterStates(true);
            setfilterClick(6);
    
        }

        const filterByManual = () =>{
            var newArray = array.filter(function (el) {
                return el.transmissiontyp === "Manual"});
            setnewArray(newArray)
            setFilterStates(true);
            setfilterClick(7);
    
        }

        const filterBy5seater = () =>{
            var newArray = array.filter(function (el) {
                return el.Condition === "5"});
            setnewArray(newArray)
            setFilterStates(true);
            setfilterClick(4);
    
        }

        const filterBy7seater = () =>{
            var newArray = array.filter(function (el) {
                return el.Condition === "7"});
            setnewArray(newArray)
            setFilterStates(true);
            setfilterClick(5);
    
        }


        const resetAll = () =>{
            setFilterStates(false);
            setSortStates(false);
            setfilterClick(0);

        }
         
        const backtoHome =() =>{
            props.backToHome(true)
        }
        const navigate = useNavigate ();
        const signInCheck = (id) =>{
            var newArray = array.filter(function (el) {
                return el.carname === id});
                console.log(newArray);
                setpreparedCar(newArray);
            if(ReactSession.get("isSignedIn") === "Yes"){
                navigate("/payment",{state:{id:1,
                    carimg:newArray[0].carimg,
                    carname:newArray[0].carname,
                    fueltyp:newArray[0].fueltyp,
                    transmissiontyp:newArray[0].transmissiontyp,
                    Model:newArray[0].Model,
                    DailyPrice:newArray[0].DailyPrice}});
            }else{
                setpreparedCar(id);
                setLoginMessage(true)
            }
        }


    
    return (
        <div>
            <div class="searchcontainer">
                    <div className="sort-container">
                        <div className='filterdiv'>
                            <button className='btn btn-outline-secondary' onClick={backtoHome}>Back to Homepage</button>
                            <div className='sortfilters'>
                              <div className='sortHeader'>
                                <span>Filters</span>
                                <button className='btn btn-outline-secondary' onClick={resetAll}>Reset All</button>
                                </div>
                            
                              <div className='filters'>
                                <span className='sort-Header'>Car type</span>
                                <div className='filtersType'>
                                <button type="button"  class={filterClick === 6?"filterclicked":"btn btn-outline-danger"} onClick={filterByAutomatic}>Automatic</button>
                                <button type="button"  class={filterClick === 7?"filterclicked":"btn btn-outline-danger"} onClick={filterByManual}>Manual</button></div>
                                <span className='sort-Header'>Fuel Type</span>
                                <div className='filtersFuel'>
                                <button type="button" class={filterClick === 1?"filterclicked":"btn btn-outline-danger"} onClick={filterByGas}>Gas</button>
                                <button type="button" class={filterClick === 2?"filterclicked":"btn btn-outline-danger"} onClick={filterByDiesel}>Diesel</button>
                                <button type="button" class={filterClick === 3?"filterclicked":"btn btn-outline-danger"} onClick={filterByElectric}>Electric</button> </div>
                                <span className='sort-Header'>Seats</span>
                                <div className='filtersSeats'>
                                <button type="button"  class={filterClick === 4?"filterclicked":"btn btn-outline-danger"} onClick={filterBy5seater}>5 seater</button>
                                <button type="button"  class={filterClick === 5?"filterclicked":"btn btn-outline-danger"} onClick={filterBy7seater}>7 seater</button></div>
                                </div> 
                            </div>
                        </div>
                    </div>
                    
                    <div className="pageResults-container">
                        <div className='section-1'>
                            <div className='section'>
                                <span className='resultText'>{pickup}-- {'> '}{drop}  </span></div>
                            <div className='section'>
                               <span className='resultText'>{startDate}--  {'> '} {endDate}</span>
                               </div>
                        </div>
                         {
                            array && !sortStates && !filterStates ? 
                            array.map((car)=>(
                        <div className='resultsdiv' onClick={() =>signInCheck(car.carname)}>
                            <div className='detailsdiv'>
                                <div className='carimage'>
                                    <img class="img-fluid" src={car.carimg} />
                                </div>
                                <div className='detailsDiv'>
                                    <div>
                                        <span className='carName'>{car.carname}</span>
                                    </div>
                                    <div className='detailsdiv-1'>
                                        <span>{car.transmissiontyp}</span>
                                        <span>{car.fueltyp}</span>
                                    </div>
                                    <div className='detailsdiv-2'>
                                    
                                    <span>4.7 (2348)</span></div>
                                    <span>{car.Model}</span>
                                </div>
                            </div>
                            <div className='pricingdiv'>
                                <span className='carPrice'>${car.DailyPrice}</span>
                                <div>
                                <button className='btn btn-outline-danger' >Book Now</button>
                                </div>
                            </div>
                        </div>)):(newArray.map((car)=>(
                        <div className='resultsdiv'onClick={() =>signInCheck(car.carname)}>
                            <div className='detailsdiv'>
                                <div className='carimage'>
                                    <img src={car.carimg} className="img-fluid" alt="Responsive image"/>
                                </div>
                                <div className='detailsDiv'>
                                    <div>
                                        <span className='carName'>{car.carname}</span>
                                    </div>
                                    <div className='detailsdiv-1'>
                                        <span>{car.transmissiontyp}</span>
                                        <span>{car.fueltyp}</span>
                                    </div>
                                    <div className='detailsdiv-2'>
                                    
                                    <span>4.7 (2348)</span></div>
                                    <span>{car.Model}</span>
                                </div>
                            </div>
                            <div className='pricingdiv'>
                                <span className='carPrice'>${car.DailyPrice}</span>
                                <div>
                                <button className='btn btn-outline-danger' >Book Now</button>
                                </div>
                            </div>
                        </div>)))
}
                    </div>
                    {loginInMessage && <>
                    <SuggestionMessage isSignedIn={setisSignedInSC} setOpen={true} setLoginMessage={setLoginMessage}
                     carDetails={preparedCar} dataArray={array} 
                    />
                    </>}
            </div>
        </div>
    );
}

export default SearchResults;