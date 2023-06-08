import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddBookForm from './AddBookForm';

test('renders AddBookForm component with form fields', () => {
  render(<AddBookForm />);

  // Verify that the form fields are rendered
  const titleInput = screen.getByLabelText('Title:');
  expect(titleInput).toBeInTheDocument();

  const authorInput = screen.getByLabelText('Author:');
  expect(authorInput).toBeInTheDocument();

  const descriptionTextarea = screen.getByLabelText('Description:');
  expect(descriptionTextarea).toBeInTheDocument();

  const publishedDateInput = screen.getByLabelText('Published Date:');
  expect(publishedDateInput).toBeInTheDocument();

  // Verify that the submit button is rendered
  const submitButton = screen.getByRole('button', { name: 'Add' });
  expect(submitButton).toBeInTheDocument();
});

test('submits the form with correct book data', async () => {
  render(<AddBookForm />);

  // Fill in the form fields
  const titleInput = screen.getByLabelText('Title:');
  fireEvent.change(titleInput, { target: { value: 'Test Book' } });

  const authorInput = screen.getByLabelText('Author:');
  fireEvent.change(authorInput, { target: { value: 'John Doe' } });

  const descriptionTextarea = screen.getByLabelText('Description:');
  fireEvent.change(descriptionTextarea, { target: { value: 'Test description' } });

  const publishedDateInput = screen.getByLabelText('Published Date:');
  fireEvent.change(publishedDateInput, { target: { value: '2023-06-08' } });

  // Submit the form
  const submitButton = screen.getByRole('button', { name: 'Add' });
  fireEvent.click(submitButton);

  // Verify that the form submission is handled correctly
  await waitFor(() => {
    expect(titleInput.value).toBe('');
    expect(authorInput.value).toBe('');
    expect(descriptionTextarea.value).toBe('');
    expect(publishedDateInput.value).toBe('');
  }, { timeout: 2000 }); // Increase the timeout if necessary
});
