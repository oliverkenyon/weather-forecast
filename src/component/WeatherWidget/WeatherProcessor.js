function extractDayName(hour) {
    // For a five day forecast, we know each day of the week will be unique,
    // could need changing if future modifications included forecast for over 7 days
    const timestamp = hour['dt'];
    const date = new Date(timestamp * 1000);
    
    // Simple solution for now, not requiring Moment or similar, would need changing 
    // for localization or future requirements, but don't add complexity if not required.
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    const dayName =  days[date.getDay()];
    const today = days[new Date().getDay()];

    if (dayName === today) {
        return 'Today';
    }

    return dayName;
}

function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

function extractHour(hour) {
    // There only ever appears to be a single element in hour.weather, but it is an array in the
    // returned JSON
    return {
        'title': formatHourOfDay(hour.dt),
        'iconUrl': 'http://openweathermap.org/img/w/' + hour.weather[0].icon + ".png",
        'maxTempDegrees': Math.round(hour.main.temp_max) + 'C',
        'minTempDegrees': Math.round(hour.main.temp_min) + 'C'
    }
}

function formatHourOfDay(timestamp) {
    const date = new Date(timestamp * 1000);
    return padDigits(date.getHours(), 2) + ":" + padDigits(date.getMinutes(), 2);
}


function processWeather(forecastJson) {
  const processedDays = [];

  let currentDayName = '';
  let currentDay;

  for (const hour of forecastJson.list) {
    const dayName = extractDayName(hour);
    if (dayName !== currentDayName) {
        // start a new day, pushing old one onto output array
        if (currentDay) {
            processedDays.push(currentDay);
        }

        currentDayName = dayName;
        currentDay = {'title': dayName, 'iconUrl': 'todo', 'maxTempDegrees': 'todo', 'minTempDegrees': 'todo', 'hours': []};
    }

    currentDay.hours.push(extractHour(hour));
  }

  return processedDays;

}

export default processWeather;
