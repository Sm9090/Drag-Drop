import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Typography } from '@mui/material';
import { resetPassword } from '../Config/firebase';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<HTMLDivElement>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ResetDialogSlide() {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddingColumn = async () => {
            await resetPassword(email)
            setOpen(false)
            setEmail('')
    }

    return (
        <React.Fragment >
            <button onClick={handleClickOpen} >
                Forgot Password?
            </button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{ style: { backgroundColor: 'rgb(229 231 235 ,1)', borderRadius: '8px', width: '350px' } }}
                className='opacity-100 rounded-lg   '
            >
                <DialogTitle>
                    <Typography variant="h6" style={{ fontFamily: 'Arial' , fontWeight: 'bolder' ,fontSize: "24px" }}>{"Password Reset "}</Typography>
                    <p className='text-[17px]'>To reset your password, enter the email address you use to sign in to </p>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <input type='email' name='email'  className='bg-white w-full rounded-xl  px-4 py-2 my-2  text-left items-center flex justify-between drop-shadow-lg' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='E-mail Address' />
                    <Button style={{ color: 'white', display: 'block' ,width: '100%' ,backgroundColor: '#18d618'}}  onClick={handleAddingColumn}>Send Reset Link</Button>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

