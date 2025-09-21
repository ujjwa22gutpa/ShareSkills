// /src/__tests__/Button.test.jsx
import { render, screen } from '@testing-library/react';
import React from 'react';

function Button({ children, variant = 'primary' }) {
  const baseClasses =
    'px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary/50',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary/50',
    outline: 'border border-primary text-primary hover:bg-primary/10 focus:ring-primary/30',
  };

  return <button className={`${baseClasses} ${variantClasses[variant]}`}>{children}</button>;
}

describe('Button component', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies the correct variant class', () => {
    const { rerender } = render(<Button variant="primary">Primary Button</Button>);
    expect(screen.getByText('Primary Button').className).toContain('bg-primary');

    rerender(<Button variant="secondary">Secondary Button</Button>);
    expect(screen.getByText('Secondary Button').className).toContain('bg-secondary');

    rerender(<Button variant="outline">Outline Button</Button>);
    expect(screen.getByText('Outline Button').className).toContain('border-primary');
  });
});
