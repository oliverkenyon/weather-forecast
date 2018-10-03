import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

beforeEach(() => {
  const fetchMock = require('fetch-mock');
  fetchMock.mock('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=2b132887161e4634a9319d61616b1de8', '{}');
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
