import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';


import App from '../App.jsx';

describe('App Component', () => {
  it('should render Study component on study button click', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Study'));
    expect(screen.getByText('study mode')).toBeInTheDocument();
  });

  it('should render Challenge component on challenge button click', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Challenge'));
    expect(screen.getByText('challenge mode')).toBeInTheDocument();
  });

  it('should render List component on list button click', () => {
    render(<App />);
    fireEvent.click(screen.getByText('List'));
    expect(screen.getByText('list mode')).toBeInTheDocument();
  });

  it('should render Settings component on settings button click', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Settings'));
    expect(screen.getByText('settings mode')).toBeInTheDocument();
  });
});
