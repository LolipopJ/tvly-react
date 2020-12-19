/* eslint-disable react/display-name */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  snackbar: {
    // 应保证 snackbar 在 fab 的上方
    // 参考: https://material-ui.com/components/snackbars/#snackbars-and-floating-action-buttons-fabs
    bottom: theme.spacing(11),
  },
}));

const AppSnackbar = React.forwardRef((props, ref) => {
  const classes = useStyles();

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
        className={classes.snackbar}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
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
