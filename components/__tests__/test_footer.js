import React from 'react';
import { render, screen } from '@testing-library/react';

import Footer from '../Footer';

describe('Footer tests', () => {
  test('The footer renders without crashing.', () => {
    render(<Footer />);
  });

  test('The footer has the full copyright notice in it.', () => {
    render(<Footer />);
    expect(screen.getByText('Copyright © Jim Sam')).toBeInTheDocument();
  });
});
