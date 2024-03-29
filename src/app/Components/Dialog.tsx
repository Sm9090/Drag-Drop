import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import PlusIcon from '../Icons/plusIcon';
import { Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ createColumn }: any) {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState<string | undefined>(undefined)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddingColumn = () => {
        createColumn(text)
        setOpen(false)
        setText('')

    }

    return (
        <React.Fragment >

            <button onClick={handleClickOpen} className='flex gap-2 justify-center items-center rounded-lg min-w-[250px] h-[40px] bg-white/10
                         hover:bg-white/20 mt-4 text-sm text-white'>
                <PlusIcon />
                Add another list
            </button>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{ style: { backgroundColor: 'rgb(229 231 235)' , borderRadius: '8px' , width: '300px'} }}
                className='opacity-100 rounded-lg   '
                
            >
                <DialogTitle>
                <Typography variant="h6" style={{ fontFamily: 'latin, sans-serif' }}>{"Column Title"}</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <input type='text' className='bg-white w-full rounded-xl  px-4 py-2 my-2  text-left items-center flex justify-between drop-shadow-lg' value={text} onChange={(e) => setText(e.target.value)} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{color: 'black' ,}} onClick={handleAddingColumn}>ADD</Button>
                    <Button style={{color: 'black' ,}} onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

