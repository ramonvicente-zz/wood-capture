import { render, screen } from '@testing-library/react';
import Welcome from './Welcome';

test('renders Welcome component correctly', () => {
  render(<Welcome />);
  const linkElement = screen.getByText('Olá, seja bem vindo(a) ao Wood Capture!');
  expect(linkElement).toBeInTheDocument();
});
