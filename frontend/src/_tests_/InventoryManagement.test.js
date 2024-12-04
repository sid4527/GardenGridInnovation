import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import InventoryManagement from '../InventoryManagement';

jest.mock('axios'); // Mock axios to intercept API calls

describe('InventoryManagement Component', () => {
  test('renders header and navigation tabs', () => {
    render(
      <MemoryRouter>
        <InventoryManagement />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Garden Grid Inventory/i })).toBeInTheDocument();
    expect(screen.getByText('Inventory Management')).toBeInTheDocument();
    expect(screen.getByText('Care Scheduling')).toBeInTheDocument();
    expect(screen.getByText('Growth Tracking')).toBeInTheDocument();
  });

  test('toggles the new entry form when clicking "+ New Entry"', () => {
    render(
      <MemoryRouter>
        <InventoryManagement />
      </MemoryRouter>
    );

    expect(screen.queryByText('Add New Inventory Item')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('+ New Entry'));
    expect(screen.getByText('Add New Inventory Item')).toBeInTheDocument();

    fireEvent.click(screen.getByText('+ New Entry'));
    expect(screen.queryByText('Add New Inventory Item')).not.toBeInTheDocument();
  });

  test('submits the form with valid input', async () => {
    axios.post.mockResolvedValueOnce({ data: {} }); // Mock successful API call

    render(
      <MemoryRouter>
        <InventoryManagement />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('+ New Entry'));

    fireEvent.change(screen.getByLabelText('Date:'), { target: { value: '2024-11-20' } });
    fireEvent.change(screen.getByLabelText('Item:'), { target: { value: 'Lavender' } });
    fireEvent.change(screen.getByLabelText('Quantity:'), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText('Condition:'), { target: { value: 'Healthy' } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:9000/api/inventory',
        {
          date: '2024-11-20',
          item: 'Lavender',
          quantity: 10,
          condition: 'Healthy',
        }
      );
    });

    expect(screen.queryByText('Add New Inventory Item')).not.toBeInTheDocument();
  });

  test('renders "Back to Home" button and triggers navigation', () => {
    render(
      <MemoryRouter>
        <InventoryManagement />
      </MemoryRouter>
    );

    const backButton = screen.getByText('Back to Home');
    expect(backButton).toBeInTheDocument();
  });
});
