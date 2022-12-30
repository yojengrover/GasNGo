import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Register from '../Register/Register';
export default function LoginMessage(props) {
  const [open, setOpen] = useState(props.setOpen);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseLogin = () => {
    setOpen(false);
    props.setLoginMessage(false);
    props.handleCLose();
  };


  const toRegisterPage = () =>{
    setOpenRegisterDialog(true)
    handleCloseLogin();

  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseLogin}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        <h1>Login</h1>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div class="container">
      <form class="form-1">
        
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required />
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required />
        <span>Forgot Password</span>
        <span>Don't have a Account ?<a onClick={toRegisterPage}>Register</a></span>
        </form>
        </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogin}>Continue as Guest</Button>
          <Button autoFocus>
            Cancel
          </Button>
          <Button autoFocus>
            Login
          </Button>
        </DialogActions>
      </Dialog>
      {openRegisterDialog && <><Register /></>}
    </div>
  );
}