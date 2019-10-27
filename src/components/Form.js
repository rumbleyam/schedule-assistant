import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  inputContainer: {
    flexDirection: 'column',
  },
  caption: {
    marginLeft: 0,
    marginTop: theme.spacing(2),
  },
}));

export default function Form({
  selectedDate,
  handleDateChange,
  weekdays,
  handleWeekdaysChange,
  occurrences,
  handleOccurrenceChange,
  handleResetPress,
  openWeekdays,
}) {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label="Start Date"
        format="MM/DD/YY"
        value={selectedDate}
        onChange={handleDateChange}
        fullWidth
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
      <KeyboardTimePicker
        margin="normal"
        id="time-picker"
        label="Time Slot"
        minutesStep={5}
        value={selectedDate}
        onChange={handleDateChange}
        fullWidth
        KeyboardButtonProps={{
          'aria-label': 'change time',
        }}
      />
      <Typography variant="caption" className={classes.caption}>
        Weekdays
      </Typography>
      <FormGroup>
        {openWeekdays.sunday && (
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
        )}
        {openWeekdays.monday && (
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
        )}
        {openWeekdays.tuesday && (
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
        )}
        {openWeekdays.wednesday && (
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
        )}
        {openWeekdays.thursday && (
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
        )}
        {openWeekdays.friday && (
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
        )}
        {openWeekdays.saturday && (
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
        )}
      </FormGroup>
      <TextField
        id="occurrences"
        label="Occurrences"
        value={occurrences}
        onChange={handleOccurrenceChange}
        type="number"
        className={classes.textField}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
      />
      <Button variant="contained" onClick={handleResetPress} fullWidth>
        Reset
      </Button>
    </Box>
  );
}
