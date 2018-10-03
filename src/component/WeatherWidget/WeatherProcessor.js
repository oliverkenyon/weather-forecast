function extractDayName(hour) {
    // For a five day forecast, we know each day of the week will be unique,
    // could need changing if future modifications included forecast for over 7 days
    const timestamp = hour['dt'];
    const date = new Date(timestamp*1000);
    
    // Easy solution for now, but would need changing if app was to be localized
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    return days[date.getDay()];
}

function extractHour(hour) {
    return {
        'title': hour.dt,
        'iconUrl': 'http://openweathermap.org/img/w/' + hour.weather.icon,
        'maxTempDegrees': hour.main.temp_max, 
        'minTempDegrees': hour.main.temp_min
    }
}


function processWeather(forecastJson) {
  //return [{'title': 'blah', 'iconUrl': 'http://www.google.com', 'maxTempDegrees': '12', 'minTempDegrees': 5, 'hours': [{'iconUrl': 'http://www.google.com', 'maxTempDegrees': '12', 'minTempDegrees': 5}]}];

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
