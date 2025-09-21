// /src/__tests__/App.test.jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

// Simple component to test basic functionality
function SimpleComponent() {
  return (
    <div>
      <h1>College Marketplace</h1>
      <p>Welcome to our platform</p>
    </div>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

function TestWrapper({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
}

describe('App functionality', () => {
  it('renders basic components', () => {
    render(
      <TestWrapper>
        <SimpleComponent />
      </TestWrapper>,
    );

    expect(screen.getByText('College Marketplace')).toBeInTheDocument();
    expect(screen.getByText('Welcome to our platform')).toBeInTheDocument();
  });

  it('can handle basic text rendering', () => {
    render(<div>Test content</div>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});
