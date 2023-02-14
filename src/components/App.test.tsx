import { render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import App from './App';
import '@testing-library/jest-dom';
import AppApi from '../api/AppApi';

afterEach(() => {
  jest.clearAllMocks();
});

test('renders template with successfull call', async () => {
  const spy = jest.spyOn(AppApi, 'getCurrency').mockImplementation(() => Promise.resolve('2453'));
  render(<App/>);
  expect(spy).toHaveBeenCalledTimes(1);
  await waitFor(() => screen.findByText("Last 24 hours Currency Conversion Rate (for 1 USD to BRL)"));
  expect(screen.getByText("Last 24 hours Currency Conversion Rate (for 1 USD to BRL)")).toBeInTheDocument();
  expect(screen.getByText("Time")).toBeInTheDocument();
  expect(screen.getByText("Currency Conversion Rate")).toBeInTheDocument();
  expect(screen.getByText("2453")).toBeInTheDocument();
});

test('renders template with call that returns undefined', async () => {
  const spy = jest.spyOn(AppApi, 'getCurrency').mockImplementation(() => Promise.resolve(undefined));
  render(<App/>);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test('renders template with failed call that returns null', async () => {
  const spy = jest.spyOn(AppApi, 'getCurrency').mockImplementation(() => Promise.resolve(null));
  render(<App/>);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
