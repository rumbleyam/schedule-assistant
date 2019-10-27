import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Holidays from 'date-holidays';

const hd = new Holidays();
hd.init('US');

const useStyles = makeStyles(theme => ({
  inputContainer: {
    flexDirection: 'column',
  },
  caption: {
    marginLeft: 0,
    marginTop: theme.spacing(2),
  },
  closed: {
    color: 'red',
    textDecoration: 'line-through',
  },
  holiday: {
    fontWeight: 'bold',
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
  if (start.weekday() >= ISOValue) {
    return start
      .clone()
      .add(1, 'week')
      .day(ISOValue);
  } else {
    return start.clone().day(ISOValue);
  }
}

function isHoliday(moment, closedHolidays) {
  const holiday = hd.isHoliday(moment.toDate());
  if (holiday && closedHolidays[holiday.name]) {
    return holiday.name;
  }
}

export default function Schedule({
  selectedDate,
  weekdays,
  occurrences,
  closedHolidays,
}) {
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
  let daysToBook = occurrences;

  const schedule = [];
  for (let ii = 0; ii < daysToBook; ii++) {
    let nextDay;
    const weekday =
      weekdaysToSchedule[(startingPosition + ii) % weekdaysToSchedule.length];
    if (ii === 0 && startingPosition === firstDayPosition) {
      // Start with the selected date
      nextDay = selectedDate;
    } else if (ii === 0) {
      nextDay = findNextOccurrenceOfWeekday(selectedDate, weekday);
    } else {
      nextDay = findNextOccurrenceOfWeekday(schedule[ii - 1].day, weekday);
    }
    const holiday = isHoliday(nextDay, closedHolidays);

    schedule.push({
      day: nextDay,
      status: holiday ? 'closed' : 'available',
      holiday,
    });

    if (holiday) {
      // Add a day on the end
      daysToBook++;
    }
  }
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Typography variant="h6" className={classes.title}>
        Schedule
      </Typography>
      <Typography variant="body1" align="left">
        {schedule.map(({ day, status, holiday }, index) => (
          <Fragment key={`schedule_${index}`}>
            <span className={classes[status]}>
              {day.format('dddd, M/D h:mm A')}
            </span>
            {holiday && (
              <span className={classes.holiday}> (Closed for {holiday})</span>
            )}
            <br />
          </Fragment>
        ))}
      </Typography>
    </Box>
  );
}
