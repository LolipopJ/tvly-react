/* eslint-disable react/display-name */
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const AppSnackbar = React.forwardRef((props, ref) => {
  const [msg, setMsg] = React.useState('');
  const [open, setOpen] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    handleSetSnackbar: (text) => {
      setMsg(text);
      setOpen(true);
    },
  }));

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={msg}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
});

export default AppSnackbar;
