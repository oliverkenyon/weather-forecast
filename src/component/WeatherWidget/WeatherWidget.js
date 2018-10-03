import React, {Component} from 'react';
import './WeatherWidget.css';
import processWeather from './WeatherProcessor.js';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/minimal-example.css';

class WeatherWidget extends Component {
  constructor() {
    super();
    this.state = {
      hasData: false,
      data: {},
    };
  }

  render() {
    return (
      <div className="weather-widget">
        <Accordion>{ this.renderDays() }</Accordion>
      </div>
    );
  }

  componentDidMount() {
    // TODO: This URL should not be here, try using reverse proxy and adding API key there,
    // otherwise use Node or Java backend
    fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=2b132887161e4634a9319d61616b1de8&units=metric')
        .then(function(response) {
          return response.json();
        })
        .then((weatherJson) => {
          this.setState((prevState) => { return {data: weatherJson, hasData: true}; });
        });
  }

  renderDays() {
    if (!this.state.hasData) {
      return ''
    }

    const daysList = processWeather(this.state.data);
    const dayComponents = [];
    for (const day of daysList) {
      dayComponents.push(this.renderDay(day));
    }

    return dayComponents;
  }

  renderDay(day) {
    return (
      <AccordionItem className="accordion-item" key={"Item" + day.title}>
        <AccordionItemTitle className="accordion-item-title" key={"Title" + day.title}>
          {day.title}
        </AccordionItemTitle>
        <AccordionItemBody className="accordion-item-body" key={"Body" + day.title}>
          {this.renderHours(day.hours)}
        </AccordionItemBody>
      </AccordionItem>
    );
  }

  renderHours(hours) {
    const hoursList = [];

    for (const hour of hours) {
      hoursList.push(this.renderHour(hour));
    }

    return hoursList;
  }

  renderHour(hour) {
    return (<div key={hour.title}>{hour.title}</div>)
  }
}

export default WeatherWidget;
