import React, {Component} from 'react';
import './WeatherWidget.css';

class WeatherWidget extends Component {
  render() {
    return (
      <div className="WeatherWidget">
      </div>
    );
  }

  componentDidMount() {
    fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=2b132887161e4634a9319d61616b1de8')
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          console.log(JSON.stringify(myJson));
        });
  }
}

export default WeatherWidget;
