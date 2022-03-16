import React from 'react';
import App from '../client/App';
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

it('renders Hello World', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const helloWorld = screen.getByText(/Hello World/i);
  expect(helloWorld).toBeInTheDocument();
})