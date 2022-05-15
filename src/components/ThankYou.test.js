import { render, screen } from '@testing-library/react';
import ThankYou from './ThankYou';

test('renders ThankYou component correctly', () => {
  render(<ThankYou />);
  const linkElement = screen.getByText('Muito Obrigado!');
  expect(linkElement).toBeInTheDocument();
});
