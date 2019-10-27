import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

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
}));

export default function Settings({
  open,
  handleClose,
  weekdays,
  handleWeekdaysChange,
}) {
  const classes = useStyles();

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Settings
      </DialogTitle>
      <DialogContent>
        <Grid container justify="flex-start" spacing={2}>
          <Grid item md={6} xs={12}>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant="caption" className={classes.caption}>
                Open Weekdays
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={weekdays.sunday}
                      onChange={handleWeekdaysChange('sunday')}
                      value="true"
                      color="primary"
                    />
                  }
                  label="Sunday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={weekdays.monday}
                      onChange={handleWeekdaysChange('monday')}
                      value="true"
                      color="primary"
                    />
                  }
                  label="Monday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={weekdays.tuesday}
                      onChange={handleWeekdaysChange('tuesday')}
                      value="true"
                      color="primary"
                    />
                  }
                  label="Tuesday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={weekdays.wednesday}
                      onChange={handleWeekdaysChange('wednesday')}
                      value="true"
                      color="primary"
                    />
                  }
                  label="Wednesday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={weekdays.thursday}
                      onChange={handleWeekdaysChange('thursday')}
                      value="true"
                      color="primary"
                    />
                  }
                  label="Thursday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={weekdays.friday}
                      onChange={handleWeekdaysChange('friday')}
                      value="true"
                      color="primary"
                    />
                  }
                  label="Friday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={weekdays.saturday}
                      onChange={handleWeekdaysChange('saturday')}
                      value="true"
                      color="primary"
                    />
                  }
                  label="Saturday"
                />
              </FormGroup>
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
