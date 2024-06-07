import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Counter from './Counter';

describe('Counter Component', () => {
  test('initial value is 0', () => {
    render(<Counter />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('increments value by 5 when increment button is clicked', () => {
    render(<Counter />);
    const incrementButton = screen.getByText('Increment by 5');
    fireEvent.click(incrementButton);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('decrements value by 5 when decrement button is clicked', () => {
    render(<Counter />);
    const decrementButton = screen.getByText('Decrement by 5');
    fireEvent.click(decrementButton);
    expect(screen.getByText('-5')).toBeInTheDocument();
  });

  test('resets value to 0 when reset button is clicked', () => {
    render(<Counter />);
    const incrementButton = screen.getByText('Increment by 5');
    const resetButton = screen.getByText('Reset');
    fireEvent.click(incrementButton);
    fireEvent.click(resetButton);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
