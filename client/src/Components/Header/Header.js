import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import 'bootstrap/dist/css/bootstrap.css';
import './Header.css';
import { Link } from "react-router-dom";
import SuggestionMessage from '../SuggestionDialog/SuggestionMessage';
import { ReactSession } from "react-client-session";
const Header = (props) => {
  const [loginInMessage, setLoginMessage] = useState(false);
  const [changed, setStatechanged] = useState(false);
  const [navSelected, setnavSelected] = useState(props.ns);
  
  const setLoginPage = () =>{
       setLoginMessage(true); 
  }

  const setLogout = () =>{
    ReactSession.set("isSignedIn","No")
    setStatechanged(!changed)
  }

  const backtoHome = () => {
         props.setHomeEnabled(true);
  }
  const isSignedIn = ReactSession.get("isSignedIn");
  const FullName = ReactSession.get("name"); 
  
  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
  
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  

  return (
    <div>
    <header>
      <nav class="navbar navbar-expand-lg navbar-light">
  <div class="container-fluid">
  <Link class="navbar-brand fw-bold" to="/" >Gas N Go</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class={navSelected ===1 ? "nav-link-active-red":"nav-link active"} to="/" onClick={backtoHome}>Home</Link>
        </li>
        <li class="nav-item">
          <Link class={navSelected ===2 ? "nav-link-active-red":"nav-link active"} to="/models">Models</Link>
        </li>
        <li class="nav-item">
        <Link class={navSelected ===3 ? "nav-link-active-red":"nav-link active"} to="/aboutus">About Us</Link>
        </li>
      </ul>
{isSignedIn === "Yes" ?   <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button variant="contained" {...bindTrigger(popupState)}
          >
            
          <Avatar {...stringAvatar(FullName + " G")} />
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography sx={{ p: 2 }}><button class="btn btn-outline-dark fw-bold"  onClick={setLogout}>Logout</button></Typography>
          </Popover>
        </div>
      )}
    </PopupState>:
 <button class="btn btn-outline-dark fw-bold" type="submit" onClick={setLoginPage}>Login/Sign Up</button>
}    

</div>
  </div>
</nav>

    </header>
    <div>{loginInMessage && <SuggestionMessage setOpen={true} openLoginPage={true} setLoginMessage={setLoginMessage} />}</div>
    </div>
  );
}

export default Header;

