import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  inputContainer: {
    flexDirection: 'column',
  },
  caption: {
    marginLeft: 0,
    marginTop: theme.spacing(2),
  },
}));

const ISOToWeekday = {
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
  7: 'sunday',
};

const weekdayToISO = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
};

function findNextOccurrenceOfWeekday(start, weekday) {
  const ISOValue = weekdayToISO[weekday];
  if (start.weekday() > ISOValue) {
    return start
      .clone()
      .add(1, 'week')
      .day(ISOValue);
  } else {
    return start.clone().day(ISOValue);
  }
}

export default function Schedule({ selectedDate, weekdays, occurrences }) {
  const classes = useStyles();

  const weekdaysToSchedule = [];
  for (let [key, value] of Object.entries(weekdays)) {
    if (value) {
      weekdaysToSchedule.push(key);
    }
  }

  if (!weekdaysToSchedule.length || occurrences < 1) {
    return null;
  }

  // Find the day to start with
  // Start with the day of the selected date if possible
  // Otherwise move forward in the week
  // If the end of the week is reached, default to the first position
  let dayToFind = Number(selectedDate.format('E'));
  let startingPosition = 0;

  for (let ii = dayToFind; ii < 8; ii++) {
    const positionOfDay = weekdaysToSchedule.indexOf(ISOToWeekday[ii]);
    if (positionOfDay > -1) {
      startingPosition = positionOfDay;
      break;
    }
  }

  const firstDay = ISOToWeekday[selectedDate.format('E')];
  const firstDayPosition = weekdaysToSchedule.indexOf(firstDay);

  const schedule = [];
  for (let ii = 0; ii < occurrences; ii++) {
    if (ii === 0 && startingPosition === firstDayPosition) {
      // Start with the selected date
      schedule.push(selectedDate);
    } else {
      const weekday =
        weekdaysToSchedule[(startingPosition + ii) % weekdaysToSchedule.length];
      if (ii === 0) {
        // Use the next occurrence of the week day, after the selected date
        // schedule.push(selectedDate.calendar())
        schedule.push(findNextOccurrenceOfWeekday(selectedDate, weekday));
      } else {
        // Use the next occurrence of the week day, after the last date
        schedule.push(findNextOccurrenceOfWeekday(schedule[ii - 1], weekday));
      }
    }
  }
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Typography variant="h6" className={classes.title}>
        Schedule
      </Typography>
      <Typography variant="body1" align="left">
        {schedule.map((day, index) => (
          <>
            {day.format('dddd, M/D h:mm A')}
            <br />
          </>
        ))}
      </Typography>
    </Box>
  );
}
