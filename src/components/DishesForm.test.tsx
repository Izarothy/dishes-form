import React from 'react';
import { render, screen } from '@testing-library/react';
import DishesForm from './DishesForm';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

test('Pizza is the default value for dish type', () => {
  render(
    <Provider store={store}>
      <DishesForm />
    </Provider>
  );
  const soupText = screen.queryByText(/Scale/i);
  const sandwichText = screen.queryByText(/Bread/i);

  expect(soupText).not.toBeInTheDocument();
  expect(sandwichText).not.toBeInTheDocument();
});

test('The basic fields are rendered', () => {
  render(
    <Provider store={store}>
      <DishesForm />
    </Provider>
  );

  expect(screen.getByText(/Dish name/i)).toBeInTheDocument();
  expect(screen.getByText(/Preparation time/i)).toBeInTheDocument();
  expect(screen.getByText(/Dish type/i)).toBeInTheDocument();
  expect(screen.getByText(/Number of slices/i)).toBeInTheDocument();
  expect(screen.getByText(/Pizza diameter/i)).toBeInTheDocument();
});
