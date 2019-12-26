import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

import { login } from '../services/Backend';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const useStyles = makeStyles(theme => ({
  inputContainer: {
    flexDirection: 'column',
  },
  caption: {
    marginLeft: 0,
    marginTop: theme.spacing(2),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

async function handleSubmit({ username, password }) {
  const response = await login({ username, password });
  return {
    jwt: response.data.jwt,
    username: response.data.user.username,
    organization: response.data.user.organization.title,
  };
}

export default function LoginForm({ open, handleClose, handleLogin }) {
  const classes = useStyles();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Login
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Login to access more advanced scheduling features.
        </DialogContentText>
        <TextField
          error={Boolean(error)}
          id="standard-error-helper-text"
          label="Username"
          value={username}
          onChange={event => {
            setUsername(event.target.value);
          }}
          helperText={error || ''}
          fullWidth
        />
        <TextField
          error={Boolean(error)}
          id="standard-error-helper-text"
          label="Password"
          value={password}
          onChange={event => {
            setPassword(event.target.value);
          }}
          helperText={error || ''}
          fullWidth
          type="password"
        />
      </DialogContent>
      <DialogActions>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            onClick={async () => {
              setLoading(true);
              setError('');
              try {
                const response = await handleSubmit({ username, password });
                handleLogin(response);
              } catch (err) {
                setError('Invalid Credentials');
              } finally {
                setLoading(false);
              }
            }}
            color="primary"
            disabled={loading}
          >
            Login
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
}
