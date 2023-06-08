import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component with navigation and routes', () => {
  render(<App />);

  // Verify that the Navigation component is rendered
  const navigationElement = screen.getByRole('navigation');
  expect(navigationElement).toBeInTheDocument();

  // Verify that the BookList component is rendered
  const bookListElement = screen.getByRole('table');
  expect(bookListElement).toBeInTheDocument();

  // Verify that the BookDetails component is not initially rendered
  const bookDetailsElement = screen.queryByRole('article');
  expect(bookDetailsElement).not.toBeInTheDocument();

  // Verify that the AddBookForm component is not initially rendered
  const addBookFormElement = screen.queryByRole('form');
  expect(addBookFormElement).not.toBeInTheDocument();
});
