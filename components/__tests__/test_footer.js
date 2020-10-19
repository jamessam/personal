import React from 'react';
import { render, screen } from '@testing-library/react';

import Footer from '../Footer';

describe('Footer tests', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test('The footer has the full copyright notice in it.', () => {
    expect(screen.getByText('Copyright © Jim Sam')).toBeInTheDocument();
  });

  test('The footer has a line separating it from the body of the page.', () => {
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});

screen.find;
