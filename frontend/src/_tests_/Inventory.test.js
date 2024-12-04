import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Inventory from '../Inventory';

describe('Inventory Component', () => {
  test('renders the inventory title', () => {
    render(<Inventory />);
    expect(screen.getByText('Garden Inventory')).toBeInTheDocument();
  });

  test('renders filter and sort sections', () => {
    render(<Inventory />);
    
    // Check for Filter Section
    expect(screen.getByText('Filter By:')).toBeInTheDocument();
    const filterLabels = ['Category', 'Condition', 'Supplier', 'Price', 'Quantity', 'Plant Type', 'Stock', 'Status'];
    filterLabels.forEach((label) => {
      expect(screen.getAllByText(label)[0]).toBeInTheDocument();
    });

    // Check for Sort Section
    expect(screen.getByText('Sort By:')).toBeInTheDocument();
    filterLabels.forEach((label) => {
      expect(screen.getAllByText(label)[1]).toBeInTheDocument();
    });
  });

  test('renders inventory content placeholder', () => {
    render(<Inventory />);
    expect(screen.getByText(/Inventory images and items will be displayed here in a grid layout/i)).toBeInTheDocument();
  });

  test('renders export button and triggers click event', () => {
    render(<Inventory />);
    const exportButton = screen.getByRole('button', { name: /Export to CSV/i });
    expect(exportButton).toBeInTheDocument();

    fireEvent.click(exportButton);
    // Add specific functionality test for CSV export if needed
  });

  test('renders footer with contact information', () => {
    render(<Inventory />);
    expect(screen.getByText(/For technical support/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /222@garden.com/i })).toBeInTheDocument();
    expect(screen.getByText(/333-333-3333/i)).toBeInTheDocument();
  });
});
