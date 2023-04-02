import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteConfirmation({ openDialog, setOpenDialog, selectedRecorde }) {
  
    const onDialogClose = () => {
        setOpenDialog({ isOpen: false, title: '', subTitle: '' });
      };

  return (
    <div>
      
      <Dialog
        open={openDialog.isOpen}
        onClose={onDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            {openDialog.title}
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-slide-description">
          {openDialog.subTitle}
          </DialogContentText>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setOpenDialog({ ...openDialog, isOpen: false })}>No</Button>
          <Button onClick={openDialog.onConfirm}  autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}