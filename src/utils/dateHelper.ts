export const addToDate = (
  date: Date,
  timeToAdd?: {
    month?: number;
    date?: number;
    hour?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
  }
) => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + (timeToAdd?.month ?? 0));
  newDate.setDate(newDate.getDate() + (timeToAdd?.date ?? 0));
  newDate.setHours(newDate.getHours() + (timeToAdd?.hour ?? 0));
  newDate.setMinutes(newDate.getMinutes() + (timeToAdd?.minutes ?? 0));
  newDate.setSeconds(newDate.getSeconds() + (timeToAdd?.seconds ?? 0));
  newDate.setMilliseconds(
    newDate.getMilliseconds() + (timeToAdd?.milliseconds ?? 0)
  );
  return newDate;
};

/**
 * Format date to string
 * @param {Date} date
 * @param {string} format yyyy:year, M:month, d:day, H:hour, m:minutes, s:seconds, S:milliseconds
 */
export const formatDate = (date: Date, format: string) => {
  date = new Date(date);
  format = format.replace(/yyyy/g, date.getFullYear().toString());
  format = format.replace(
    /M/g,
    (date.getMonth() + 1).toLocaleString().padStart(2, '0')
  );
  format = format.replace(
    /d/g,
    date.getDate().toLocaleString().padStart(2, '0')
  );
  format = format.replace(
    /H/g,
    date.getHours().toLocaleString().padStart(2, '0')
  );
  format = format.replace(
    /m/g,
    date.getMinutes().toLocaleString().padStart(2, '0')
  );
  format = format.replace(
    /s/g,
    date.getSeconds().toLocaleString().padStart(2, '0')
  );
  format = format.replace(
    /S/g,
    date.getMilliseconds().toLocaleString().padStart(2, '0')
  );
  return format;
};

export const formatDateStartAndEnd = (props: {
  dateStart: Date;
  dateEnd?: Date;
  durationMin?: number;
}) => {
  let str = formatDate(props.dateStart, 'yyyy年M月d日 H:m') + ' - ';
  if (props.dateEnd) {
    str += formatDate(props.dateEnd, 'yyyy年M月d日 H:m');
  }
  if (props.durationMin) {
    str += formatDate(
      addToDate(props.dateStart, { minutes: props.durationMin }),
      'H:m'
    );
  }
  return str;
};

export const convertDateStrToDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date;
};

export const isOverlap = (
  schedule1: { startDate: Date; endDate: Date },
  schedule2: { startDate: Date; endDate: Date }
) => {
  return (
    schedule1.startDate < schedule2.endDate &&
    schedule1.endDate > schedule2.startDate
  );
};

export const isTimeOverlap = (
  schedule1: { startDate: Date; endDate: Date },
  schedule2: { startDate: Date; endDate: Date }
) => {
  // Make all of uniform date
  const startDateTime1 = new Date(schedule1.startDate);
  const endDateTime1 = new Date(schedule1.endDate);
  const startDateTime2 = new Date(schedule2.startDate);
  const endDateTime2 = new Date(schedule2.endDate);
  startDateTime1.setFullYear(1990, 1, 1);
  startDateTime1.setSeconds(0, 0);
  endDateTime1.setFullYear(1990, 1, 1);
  endDateTime1.setSeconds(0, 0);
  startDateTime2.setFullYear(1990, 1, 1);
  startDateTime2.setSeconds(0, 0);
  endDateTime2.setFullYear(1990, 1, 1);
  endDateTime2.setSeconds(0, 0);

  return isOverlap(
    {
      startDate: startDateTime1,
      endDate: endDateTime1,
    },
    {
      startDate: startDateTime2,
      endDate: endDateTime2,
    }
  );
};

export const isWeekDayAndTimeOverlap = (
  schedule1: {
    startDate: Date;
    endDate: Date;
  },
  schedule2: {
    startDate: Date;
    endDate: Date;
  }
) => {
  // Get week day from duration of schedule1
  const days1: number[] = [];
  for (
    let d = new Date(schedule1.startDate);
    d <= schedule1.endDate;
    d.setDate(d.getDate() + 1)
  ) {
    days1.push(d.getDay());
  }

  // Get week day from duration of schedule1
  const days2: number[] = [];
  for (
    let d = new Date(schedule2.startDate);
    d <= schedule2.endDate;
    d.setDate(d.getDate() + 1)
  ) {
    days2.push(d.getDay());
  }

  for (const day1 of days1) {
    for (const day2 of days2) {
      if (
        day1 === day2 && // Is week day overlap
        isTimeOverlap(schedule1, schedule2)
      ) {
        return true;
      }
    }
  }

  return false;
};

export const getWeekDayFromDate = (date: Date) => {
  const weekday = new Date(date).getDay();
  switch (weekday) {
    case 0:
      return '日';
    case 1:
      return '月';
    case 2:
      return '火';
    case 3:
      return '水';
    case 4:
      return '木';
    case 5:
      return '金';
    case 6:
      return '土';
  }
};
