import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Form from './Form'

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const {issueID, issueName} = props

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new event</DialogTitle>
        <Form issueID={issueID} issueName={issueName}/>
        
        <DialogActions>
          <Button onClick={handleClose} color="error">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}