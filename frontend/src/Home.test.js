import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';

describe('Home Component', () => {
  test('renders the navbar with correct links', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Inventory')).toBeInTheDocument();
    expect(screen.getByText('Entries')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
    expect(screen.getByText('Userprofiles')).toBeInTheDocument();
    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });

  test('renders the hero section with correct content', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText('Bring Nature to Your Home!')).toBeInTheDocument();
    expect(screen.getByText(/hassle-free backyard transformations/i)).toBeInTheDocument();
  });

  test('renders the featured plants grid', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText('Featured Plant')).toBeInTheDocument();
    expect(screen.getByText('🌱')).toBeInTheDocument();
    expect(screen.getByText('🌿')).toBeInTheDocument();
    expect(screen.getByText('🌸')).toBeInTheDocument();
    expect(screen.getByText('🌵')).toBeInTheDocument();
    expect(screen.getByText('🍃')).toBeInTheDocument();
    expect(screen.getByText('🌷')).toBeInTheDocument();
  });

  test('renders the footer with correct contact information', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Use a regular expression to match the phone number
    expect(screen.getByText(/333-333-2222/i)).toBeInTheDocument();

    // Check for email address
    expect(screen.getByText(/222@garden.com/i)).toBeInTheDocument();

    // Check for copyright text
    expect(screen.getByText(/© 2024 Garden Inventory. All Rights Reserved./i)).toBeInTheDocument();
  });
});
