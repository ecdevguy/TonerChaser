// import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';


import App from '../src/App.jsx';

describe('App Component', () => {
  it('should render Study component on Study button click', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Study'));
    expect(screen.getByText('study mode')).toBeInTheDocument();
  });

  it('should render Challenge component on Challenge button click', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Challenge'));
    expect(screen.getByText('challenge mode')).toBeInTheDocument();
  });

  it('should render Challenge component on Challenge button click', () => {
    render(<App />);
    fireEvent.click(screen.getByText('List'));
    expect(screen.getByText('list mode')).toBeInTheDocument();
  });

  it('should render Challenge component on Challenge button click', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Settings'));
    expect(screen.getByText('settings mode')).toBeInTheDocument();
  });
});
