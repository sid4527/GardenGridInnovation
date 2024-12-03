import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import GrowthTracking from './GrowthTracking';

describe('GrowthTracking Component', () => {
  const router = createMemoryRouter(
    [
      { path: '/', element: <GrowthTracking /> },
    ],
    {
      initialEntries: ['/'], // Ensure it starts at the correct route
      future: {
        v7_startTransition: true, // Enable future flag for startTransition
        v7_relativeSplatPath: true, // Enable relative splat path resolution
      },
    }
  );

  test('renders header and navigation tabs', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByRole('heading', { name: /Garden Grid Growth Tracking/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Inventory Management/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Care Scheduling/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Growth Tracking/i })).toBeInTheDocument();
  });

  test('toggles the new entry form when clicking "+ New Entry"', () => {
    render(<RouterProvider router={router} />);

    expect(screen.queryByText('Add New Growth Record')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('+ New Entry'));
    expect(screen.getByText('Add New Growth Record')).toBeInTheDocument();
    fireEvent.click(screen.getByText('+ New Entry'));
    expect(screen.queryByText('Add New Growth Record')).not.toBeInTheDocument();
  });

  test('submits the form with valid input', async () => {
    render(<RouterProvider router={router} />);

    fireEvent.click(screen.getByText('+ New Entry'));
    fireEvent.change(screen.getByLabelText('Date:'), { target: { value: '2024-11-19' } });
    fireEvent.change(screen.getByLabelText('Plant:'), { target: { value: 'Lavender' } });
    fireEvent.change(screen.getByLabelText('Height (cm):'), { target: { value: '50' } });
    fireEvent.change(screen.getByLabelText('Notes:'), { target: { value: 'Fast growth' } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:9000/api/growth-records',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            RecordDate: '2024-11-19',
            PlantName: 'Lavender',
            HeightCM: '50',
            Notes: 'Fast growth',
          }),
        })
      );
    });

    await waitFor(() =>
      expect(screen.queryByText('Add New Growth Record')).not.toBeInTheDocument()
    );
  });
});
