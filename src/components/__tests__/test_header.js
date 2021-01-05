import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from '../Header';

describe('Header tests', () => {
  beforeEach(() => {
    render(<Header />);
  });

  test('The Header is accessible', () => {
    expect(screen.getByRole('header')).toBeInTheDocument();
  });

  test('The header contains a navigation section', () => {
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('The header has at least four links', async () => {
    const links = await screen.findAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(4);
  });
});
