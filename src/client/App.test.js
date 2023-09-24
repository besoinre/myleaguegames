import { render, screen } from '@testing-library/react';
import App from './components/App';

test('renders main page', () => {
  render(<App />);
  const linkElement = screen.getByText(/main content/i);
  expect(linkElement).toBeInTheDocument();
});
