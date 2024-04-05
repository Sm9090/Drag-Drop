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
        children: React.ReactElement<any, any>;
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
                PaperProps={{ style: { backgroundColor: 'rgb(229 231 235 ,1)', borderRadius: '8px', width: '500px' } }}
                className='opacity-100 rounded-lg   '
            >
                <DialogTitle>
                    <Typography variant="h6" style={{ fontFamily: 'Arial' , fontWeight: 'bolder' ,fontSize: "24px" ,textAlign: "center" }}>{"Password Reset "}</Typography>
                    <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, repellendus beatae a nostrum recusandae ducimus mollitia, porro officiis, aut minus facilis possimus veniam rerum sapiente veritatis ex ipsa odit eius.</p>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <input type='email' name='email'  className='bg-white w-full rounded-xl  px-4 py-2 my-2  text-left items-center flex justify-between drop-shadow-lg' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{ color: 'black', }} onClick={handleAddingColumn}>Reset</Button>
                    <Button style={{ color: 'black', }} onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

