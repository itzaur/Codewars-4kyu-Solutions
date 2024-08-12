/*
Description:
Your task in order to complete this Kata is to write a function which formats a duration, given as a number of seconds, in a human-friendly way.

The function must accept a non-negative integer. If it is zero, it just returns "now". Otherwise, the duration is expressed as a combination of years, days, hours, minutes and seconds.

It is much easier to understand with an example:

* For seconds = 62, your function should return 
    "1 minute and 2 seconds"
* For seconds = 3662, your function should return
    "1 hour, 1 minute and 2 seconds"
For the purpose of this Kata, a year is 365 days and a day is 24 hours.

Note that spaces are important.

Detailed rules
The resulting expression is made of components like 4 seconds, 1 year, etc. In general, a positive integer and one of the valid units of time, separated by a space. The unit of time is used in plural if the integer is greater than 1.

The components are separated by a comma and a space (", "). Except the last component, which is separated by " and ", just like it would be written in English.

A more significant units of time will occur before than a least significant one. Therefore, 1 second and 1 year is not correct, but 1 year and 1 second is.

Different components have different unit of times. So there is not repeated units like in 5 seconds and 1 second.

A component will not appear at all if its value happens to be zero. Hence, 1 minute and 0 seconds is not valid, but it should be just 1 minute.

A unit of time must be used "as much as possible". It means that the function should not return 61 seconds, but 1 minute and 1 second instead. Formally, the duration specified by of a component must not be greater than any valid more significant unit of time.
*/
function formatDuration(seconds) {
  if (seconds === 0) return 'now';

  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const years = days / 365;

  const fullYears = years >= 1 ? Math.floor(years) : 0;
  const fullDays = days >= 1 ? Math.floor(days - fullYears * 365) : 0;
  const fullHours =
    hours >= 1 ? Math.floor(hours - (fullYears * 365 + fullDays) * 24) : 0;
  const fullMinutes =
    minutes >= 1
      ? Math.floor(
          minutes - ((fullYears * 365 + fullDays) * 24 * 60 + fullHours * 60)
        )
      : 0;
  const fullSeconds =
    seconds >= 1
      ? seconds -
        ((fullYears * 365 + fullDays) * 24 * 60 * 60 +
          fullHours * 60 * 60 +
          fullMinutes * 60)
      : 0;

  const resultString = `${fullYears > 0 ? fullYears : ''} ${
    fullYears === 0 ? '' : fullYears > 1 ? 'years' : 'year'
  }, ${fullDays > 0 ? fullDays : ''} ${
    fullDays === 0 ? '' : fullDays > 1 ? 'days' : 'day'
  }, ${fullHours > 0 ? fullHours : ''} ${
    fullHours === 0 ? '' : fullHours > 1 ? 'hours' : 'hour'
  }, ${fullMinutes > 0 ? fullMinutes : ''} ${
    fullMinutes === 0 ? '' : fullMinutes > 1 ? 'minutes' : 'minute'
  }, ${fullSeconds > 0 ? fullSeconds : ''} ${
    fullSeconds === 0 ? '' : fullSeconds > 1 ? 'seconds' : 'second'
  }`;

  const result = resultString
    .split(' ,')
    .join('')
    .trim()
    .replace(/, *$/, '')
    .replace(/,\s([^,]*)$/, ' and $1');

  return result
    .split(' ')
    .filter((el) => el)
    .join(' ');
  ////////////////////////////////////////////////////!SECTION
  //   var time = { year: 31536000, day: 86400, hour: 3600, minute: 60, second: 1 },
  //     res = [];

  //   if (seconds === 0) return 'now';

  //   for (var key in time) {
  //     if (seconds >= time[key]) {
  //       var val = Math.floor(seconds / time[key]);
  //       res.push((val += val > 1 ? ' ' + key + 's' : ' ' + key));
  //       seconds = seconds % time[key];
  //     }
  //   }

  //   return res.length > 1
  //     ? res.join(', ').replace(/,([^,]*)$/, ' and' + '$1')
  //     : res[0];
  ////////////////////////////////////////////////////!SECTION
  //   const TIME = {
  //     year: 365 * 24 * 60 * 60,
  //     day: 24 * 60 * 60,
  //     hour: 60 * 60,
  //     minute: 60,
  //     second: 1,
  //   };
  //   let units;

  //   return (
  //     Object.entries(TIME)
  //       .map(
  //         ([unit, value]) => (
  //           (seconds -= (units = ~~(seconds / value)) * value),
  //           units && `${units} ${unit}${units > 1 ? 's' : ''}`
  //         )
  //       )
  //       .filter((entry) => entry).join`, `.replace(/,(?!.*,)/, ' and') || 'now'
  //   );
  ////////////////////////////////////////////////////!SECTION
  //   const delegates = [
  //     { s: 'year', v: 60 * 60 * 24 * 365 },
  //     { s: 'day', v: 60 * 60 * 24 },
  //     { s: 'hour', v: 60 * 60 },
  //     { s: 'minute', v: 60 },
  //     { s: 'second', v: 1 },
  //   ];

  //   if (!seconds) return 'now';

  //   return delegates.reduce((ret, dg) => {
  //     const val = Math.floor(seconds / dg.v);

  //     if (!val) return ret;

  //     seconds -= dg.v * val;
  //     const str = val > 1 ? dg.s + 's' : dg.s;
  //     const add = !ret ? '' : seconds > 0 ? ', ' : ' and ';
  //     return ret + add + `${val} ${str}`;
  //   }, '');
}

console.log(formatDuration(62)); //"1 minute and 2 seconds"
console.log(formatDuration(3662)); //"1 hour, 1 minute and 2 seconds"
