import { render, screen } from '@testing-library/react';
import {FlightSearch, FlightList} from './app/pages';

test('background color of search screen is #063048', () => {
  render(<FlightSearch />);
  const mainScreen = screen.getByTestId("flightSearchScreen")
  expect(mainScreen).toHaveStyle("background-color: #063048")
});

test('background color of select flight button is #E81932', () => {
  render(<FlightList />);
  const pickFlightButton = screen.getByText("Uçuşu Seç")
  expect(pickFlightButton).toHaveStyle("background-color: #E81932")
});
