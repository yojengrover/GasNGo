import React, {useState} from 'react';
import { useNavigate  } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Payment from '../Payment/Payment';
import { useLocation } from 'react-router-dom';
import './SuggestionMessage.css'
import {getUser} from "../../Graphql/Query"
import {CREATE_USER_MUTATION} from '../../Graphql/Mutation';
import { useMutation, useQuery } from '@apollo/client';
import { ReactSession } from "react-client-session";


const SuggestionMessage = (props) => {
  const [open, setOpen] = useState(props.setOpen);
  const [openLoginDialog, setOpenLoginDialog] = useState(props.openLoginPage);
  const [openPaymentsPage, setopenPaymentsPage] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  const [FullName, setFullName] = useState("");
  const [DrivingLicence, setDrivingLicence] = useState("");
  const [email, setEmail] = useState("");
  const [userNotFound, setUserNotfound] = useState(false);
  const [wrongPassword,setWrongPassword] = useState(false);
  const [password, setpassword] = useState("");
  const [changed, setchange] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [emailEr, setUseremailEr] = useState("");
  const [dlER, setUserdlER] = useState("");
  const [passEr, setpassEr] = useState("");
  const [createUser, {error}] = useMutation(CREATE_USER_MUTATION);
  const {loading, data} = useQuery(getUser);
  const handleClickOpen = () => {
    setOpen(true);
  };

  ReactSession.setStoreType("localStorage");


  const {isSignedIn} = props;
  console.log(props);

  const handleClose = () => {
    setOpen(false);
    console.log(open);
    props.setLoginMessage(false);
  };


  const toLoginPage = () =>{
    setOpenLoginDialog(true)
    console.log(openLoginDialog);

  }

  const toRegisterPage = () =>{
    setOpenRegisterDialog(true)

  }

  const navigate = useNavigate ();

  const handlePayment = () => {
    var newArray = props.dataArray.filter(function (el) {
      return el.carname === props.carDetails});
    const [carname,
    fueltyp,
    transmissiontyp,
    Model,
    DailyPrice, carimg] = newArray;  
    navigate("/payment",{state:{id:2,
      carname:carname,
      fueltyp:fueltyp,
      carimg:carimg,
      transmissiontyp:transmissiontyp,
      Model:Model,
      DailyPrice:DailyPrice}});
    console.log(props.carDetails);
  }
 const loginUser = ()=>
 {
  var newArray = data.getUsers.filter(function (el) {
    return el.email === userEmail});

    if(newArray.length>0){
    const password = newArray[0].password;
    if(password === userPassword){
      ReactSession.set("isSignedIn", "Yes");
      ReactSession.set("name",newArray[0].FullName );
      ReactSession.set("Dl", newArray[0].DrivingLicence);
      ReactSession.set("email",newArray[0].email );
      console.log("Succesful");
      handleClose();
    }else{
      setWrongPassword(true);
    }
    }
    else{
      setUserNotfound(true);
    }
 }
 const location = useLocation();
  const addUser =()=>
  {
    if(FullName=== "" || DrivingLicence === "" || email === "" || password === "" ){
      alert("All Fields are Mandatory")
      return
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setUseremailEr(true)
      return 
    }


    createUser({
      variables: {
        FullName:FullName,
        DrivingLicence :DrivingLicence,
        email:email,
        password: password

      }
    })
    setchange(!changed);
    handleClose();
    window.location.reload(false);

    if(error) {
      console.log(error)
    }
  }
  return (
   <> { !openPaymentsPage?<div>
     
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >{ !openLoginDialog ? (
        <DialogTitle id="alert-dialog-title">
          {"GasNGo"}
        </DialogTitle>):(<DialogTitle id="alert-dialog-title">
        <h1 className='loginHeading'>{!openRegisterDialog?"Login":"Registeration Form"}</h1>
        </DialogTitle>)}
        { !openLoginDialog ? ( <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, you want to continue without Logging In ? 
          </DialogContentText>
        </DialogContent>):(
          !openRegisterDialog?(<DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div class="container">
      <form className="loginForm">
        
        <label for="useremail">Email</label>
        <input type="email" name="email" id="useremail" onChange={(e)=>{
          setUserEmail(e.target.value)}} required />
        {userNotFound && (<span className='errormessage'>User Not Found</span>)}
        <label for="password">Password</label>
        <input type="password" name="password" id="userpassword"  onChange={(e)=>{
          setUserPassword(e.target.value)}}required />
        {wrongPassword && (<span className='errormessage'>Invalid password</span>)}
        <span className='loginSpan'>Forgot Password</span>
        <span>Don't have a Account ? <a className='registerLink' onClick={toRegisterPage}>Register</a></span>
        </form>
        </div>
          </DialogContentText>
        </DialogContent>):(
        <div class="registerForm"><form action="#">
    <div class="user__details">
      <div class="input__box">
        <span class="details">Full Name</span>
        <input 
        
        type="text" className='registerInput' placeholder="E.g: John Smith" onChange={(e)=>{
          setFullName(e.target.value);
        }} required/>
      </div>
      <div class="input__box">
        <span class="details">Email</span>
        <input type="email" placeholder="johnsmith@hotmail.com" onChange={(e)=>{
          setEmail(e.target.value);
        }}  required/>
        {emailEr && (<span className='errormessage'>Invalid Email</span>)}
      </div>
      <div class="input__box">
        <span class="details">Driving Licence</span>
        <input type="tel" className='registerInput' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="012-345-6789"  
        onChange={(e)=>{
          setDrivingLicence(e.target.value);
        }}
        required/>
      </div>
      <div class="input__box">
        <span class="details">Password</span>
        <input type="password" placeholder="********" 
         onChange={(e)=>{
          setpassword(e.target.value);
        }}
        required/>
      </div>
      <div class="input__box">
        <span class="details">Confirm Password</span>
        <input type="password" placeholder="********" required/>
      </div>

    </div>
  </form></div>))}
        { !openLoginDialog ? (<DialogActions>
          <Button onClick={handlePayment}>Continue as Guest</Button>
          <Button onClick={toLoginPage} autoFocus>
            Login
          </Button>
        </DialogActions>):( <DialogActions>
          <Button autoFocus className='loginButtons' onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={!openRegisterDialog? loginUser : addUser} autoFocus className='loginButtons'>
            {!openRegisterDialog? "Login":"Register"}
          </Button>
        </DialogActions>)}
      </Dialog>
    </div>:<div><Payment /></div>}</>
  );
}

export default SuggestionMessage;