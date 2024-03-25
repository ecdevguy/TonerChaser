import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Homescreen from '../src/components/Homescreen';

describe('Homescreen', () => {
  const handleClick = vi.fn();

  it.each([
    ['Study', 'study'],
    ['Challenge', 'challenge'],
    ['List', 'list'],
    ['Settings', 'settings']
  ])('calls handleClick with "%s" when the %s button is clicked', (buttonText, argument) => {
    render(<Homescreen handleClick={handleClick} />);
    fireEvent.click(screen.getByText(buttonText));
    expect(handleClick).toHaveBeenCalledWith(argument);
    handleClick.mockClear();
  });
});