import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getAllByText('Wood Capture')[0];
  expect(linkElement).toBeInTheDocument();
});
