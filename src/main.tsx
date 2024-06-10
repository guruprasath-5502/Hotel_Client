import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from './components/ui/sonner.tsx';
import { AppContextProvider } from './contexts/App.Context.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <AppRoutes />
          <Toaster
            visibleToasts={1}
            position='top-right'
            richColors
            theme='light'
          />
        </AppContextProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
