import React from 'react';
import { render, screen } from '@testing-library/react';

import PageWrapper from '../PageWrapper';

describe('PageWrapper tests', () => {
  beforeEach(() => {
    render(<PageWrapper />);
  });

  test('The PageWrapper contains a header', () => {
    expect(screen.getByRole('header')).toBeInTheDocument();
  });

  test('The PageWrapper contains a footer', () => {
    screen.getBy;
    expect(screen.getByRole('footer')).toBeInTheDocument();
  });
});
