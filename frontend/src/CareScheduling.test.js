import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import CareScheduling from './CareScheduling';

// Mock axios for API calls
jest.mock('axios', () => ({
  post: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('CareScheduling Component', () => {
  test('renders header with correct title', () => {
    act(() => {
      render(
        <MemoryRouter>
          <CareScheduling />
        </MemoryRouter>
      );
    });
    expect(screen.getByText('Garden Grid Care Scheduling')).toBeInTheDocument();
  });

  test('renders navigation tabs', () => {
    render(
      <MemoryRouter>
        <CareScheduling />
      </MemoryRouter>
    );

    const navTabs = screen.getAllByRole('link');
    expect(navTabs).toHaveLength(3);
    expect(navTabs[1]).toHaveTextContent('Care Scheduling');
    expect(screen.getByRole('heading', { name: 'Care Scheduling' })).toBeInTheDocument();
  });

  test('toggles new entry form visibility', () => {
    render(
      <MemoryRouter>
        <CareScheduling />
      </MemoryRouter>
    );

    const newEntryButton = screen.getByText('+ New Entry');
    fireEvent.click(newEntryButton);
    expect(screen.getByText('Add New Care Task')).toBeInTheDocument();

    fireEvent.click(newEntryButton);
    expect(screen.queryByText('Add New Care Task')).not.toBeInTheDocument();
  });

  test('fills and submits the new entry form', async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    render(
      <MemoryRouter>
        <CareScheduling />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('+ New Entry'));

    fireEvent.change(screen.getByLabelText('Date:'), { target: { value: '2024-11-20' } });
    fireEvent.change(screen.getByLabelText('Plant:'), { target: { value: 'Lavender' } });
    fireEvent.change(screen.getByLabelText('Care Type:'), { target: { value: 'Pruning' } });
    fireEvent.change(screen.getByLabelText('Notes:'), { target: { value: 'Trim before frost' } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/care-scheduling', {
        date: '2024-11-20',
        plant: 'Lavender',
        careType: 'Pruning',
        notes: 'Trim before frost',
      });
    });
  });

  test('shows error message for invalid form submission', async () => {
    render(
      <MemoryRouter>
        <CareScheduling />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('+ New Entry'));
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText(/All fields are required/i)).toBeInTheDocument();
    });
  });

  test('navigates back to home', () => {
    const mockedNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockedNavigate,
    }));

    render(
      <MemoryRouter>
        <CareScheduling />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Back to Home'));
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CareScheduling />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
