// /src/__tests__/__mocks__/main.jsx
// Mock for main.jsx for testing purposes
// This prevents issues with ReactDOM.createRoot when testing

jest.mock('react-dom/client', () => ({
  createRoot: () => ({
    render: jest.fn(),
  }),
}));

// Export the components from the original file
export * from '../../main.jsx';
