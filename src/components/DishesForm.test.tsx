import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import DishesForm from './DishesForm';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

const setup = () => {
  const utils = render(
    <Provider store={store}>
      <DishesForm />
    </Provider>
  );

  return {
    ...utils,
  };
};
test('Pizza is the default value for dish type', () => {
  setup();

  const soupText = screen.queryByText(/Scale/i);
  const sandwichText = screen.queryByText(/Bread/i);

  expect(soupText).not.toBeInTheDocument();
  expect(sandwichText).not.toBeInTheDocument();
});

test('The basic fields are rendered', () => {
  setup();

  expect(screen.getByText(/Dish name/i)).toBeInTheDocument();
  expect(screen.getByText(/Preparation time/i)).toBeInTheDocument();
  expect(screen.getByText(/Dish type/i)).toBeInTheDocument();
  expect(screen.getByText(/Number of slices/i)).toBeInTheDocument();
  expect(screen.getByText(/Pizza diameter/i)).toBeInTheDocument();
});

test('An error if preparation time has a wrong format', () => {
  setup();

  const prepTimeInput = screen.getByLabelText(/Preparation time/i);

  fireEvent.change(prepTimeInput, { target: { value: '0' } });

  expect(screen.getByText(/Please use a hh:mm:ss format/i)).toBeInTheDocument();
});
