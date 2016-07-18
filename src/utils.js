import moment from 'moment';
import { red400, indigo400, teal400, amber400 } from 'material-ui/styles/colors';

export const Matcher = {
  modules: {
    en_GB: [
      {
        name: 'onWeekDayRegEx',
        type: 'day',
        regex: / on (monday|tuesday|wednesday|thursday|friday|saturday|sunday)|on (monday|tuesday|wednesday|thursday|friday|saturday|sunday) /i,
        getResult(matches) {
          const condition = matches[1];
          switch (condition) {
            case 'monday':
              return moment().day(7 + 1).startOf('day').toDate();
            case 'tuesday':
              return moment().day(7 + 2).startOf('day').toDate();
            case 'wednesday':
              return moment().day(7 + 3).startOf('day').toDate();
            case 'thursday':
              return moment().day(7 + 4).startOf('day').toDate();
            case 'friday':
              return moment().day(7 + 5).startOf('day').toDate();
            case 'saturday':
              return moment().day(7 + 6).startOf('day').toDate();
            case 'sunday':
              return moment().day(7 + 7).startOf('day').toDate();
            default:
              return undefined;
          }
        },
      },
      {
        name: 'todayOrTomorrowOrAfterTomorrow',
        type: 'day',
        regex: / (today|tomorrow|the day after tomorrow)|(today|tomorrow|the day after tomorrow) /i,
        getResult(matches) {
          const condition = matches[1] || matches[2];
          switch (condition) {
            case 'today':
              return moment().startOf('day').toDate();
            case 'tomorrow':
              return moment().add('days', 1).startOf('day').toDate();
            case 'the day after tomorrow':
              return moment().add('days', 2).startOf('day').toDate();
            default:
              return undefined;
          }
        },
      },
      {
        name: 'atHoursAmPm',
        type: 'time',
        regex: / at ([1-9]|1[0-2])(am|pm)|at ([1-9]|1[0-2])(am|pm) /i,
        getResult(matches) {
          const period = matches[2];
          const periodHours = parseInt(matches[1], 10);
          let hours = 0;
          if (period === 'pm') {
            hours += 12;
          }
          if (periodHours !== 12) {
            hours += periodHours;
          }
          return moment().startOf('day').hours(hours).toDate();
        },
      },
      {
        name: 'atHoursDotMinutesAmPm',
        type: 'time',
        regex: / at ([1-9]|1[0-2])\.(00|[0-5][0-9]|[0-59])(am|pm)|at ([1-9]|1[0-2])\.(00|[0-5][0-9]|[0-59])(am|pm) /,
        getResult(matches) {
          const period = matches[3];
          const periodHours = parseInt(matches[1], 10);
          let hours = 0;
          if (period === 'pm') {
            hours += 12;
          }
          if (periodHours !== 12) {
            hours += periodHours;
          }
          const minutes = parseInt(matches[2], 10);
          return moment().startOf('day').hours(hours).minutes(minutes).toDate();
        },
      },
      {
        name: 'atHoursDoublePointsOrHMinutes',
        type: 'time',
        regex: / at (00|[0-9]|[0-1][1-9]|2[0-3])(?::|h)(00|[0-5][0-9]|[0-59])|at (00|[0-9]|[0-1][1-9]|2[0-3])(?::|h)(00|[0-5][0-9]|[0-59]) /i,
        getResult(matches) {
          const hours = parseInt(matches[1], 10);
          const minutes = parseInt(matches[2], 10);
          return moment().startOf('day').hours(hours).minutes(minutes).toDate();
        },
      },
      {
        name: 'tag',
        type: 'tag',
        regex: /(#[a-zA-Z0-9_-]{1,20})/i,
        getResult(matches) {
          console.log(matches);
          const hash = matches[1] || matches[2];
          return hash.replace('#', '');
        },
      },
    ],
  },
};

export const DefaultTags = {
  en_GB: [
    {
      name: 'Work',
      comments: 'Calls, meetings',
      color: red400,
      icon: 'work',
    },
    {
      name: 'Personnal',
      comments: 'Family, health',
      color: indigo400,
      icon: 'pets',
    },
    {
      name: 'Optional',
      comments: 'Extra stuff to improve',
      color: teal400,
      icon: 'looks',
    },
    {
      name: 'Side',
      comments: 'Your next big thing',
      color: amber400,
      icon: 'explore',
    },
  ],
};

export function setDay(currentDate, day) {
  const newDate = moment(day);
  const computedDate = moment(currentDate)
    .date(newDate.date())
    .month(newDate.month())
    .year(newDate.year())
    .toDate();
  return computedDate ? computedDate : currentDate;
}

export function setTime(currentDate, time) {
  const newTime = moment(time);
  const computedDate = moment(currentDate)
    .startOf('day')
    .hours(newTime.hours())
    .minutes(newTime.minutes())
    .toDate();
  return computedDate ? computedDate : currentDate;
}

export function getTaskMap(task) {
  const map = {};
  if (task.dueDate) {
    map.dueDate = task.dueDate.getTime();
  }
  if (task.title) {
    map.title = task.title;
  }
  if (task.done !== undefined) {
    map.done = task.done;
  }
  if (task.tag) {
    if (task.tag.key) {
      map.tagKey = task.tag.key;
    }
  }
  if (task.tagKey) {
    map.tagKey = task.tagKey;
  }
  return map;
}

