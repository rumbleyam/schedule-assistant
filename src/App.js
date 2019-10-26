import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { deepPurple, blueGrey } from '@material-ui/core/colors';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Form from './components/Form';
import Schedule from './components/Schedule';

const moment = new MomentUtils();

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: blueGrey,
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    marginLeft: theme.spacing(1),
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(
    moment
      .date()
      .set('h', 8)
      .set('m', 0),
  );
  const [weekdays, setWeekdays] = React.useState({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });
  const [occurrences, setOccurrences] = React.useState(1);

  const handleWeekdaysChange = name => event => {
    setWeekdays({ ...weekdays, [name]: event.target.checked });
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleOccurrenceChange = event => {
    const number = Number(event.target.value);
    if (event.target.value === '' || (!isNaN(number) && number > 0)) {
      setOccurrences(event.target.value);
    }
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AppBar position="static">
            <Toolbar>
              <CalendarIcon />
              <Typography variant="h6" className={classes.title}>
                Schedule Assistant
              </Typography>
              <IconButton
                edge="end"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu">
                <SettingsIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Paper className={classes.paper}>
            <Grid container justify="flex-start" spacing={2}>
              <Grid item md={3} sm={12}>
                <Form
                  selectedDate={selectedDate}
                  handleDateChange={handleDateChange}
                  weekdays={weekdays}
                  handleWeekdaysChange={handleWeekdaysChange}
                  occurrences={occurrences}
                  handleOccurrenceChange={handleOccurrenceChange}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Schedule
                  selectedDate={selectedDate}
                  weekdays={weekdays}
                  occurrences={occurrences}
                />
              </Grid>
            </Grid>
          </Paper>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </div>
  );
}
