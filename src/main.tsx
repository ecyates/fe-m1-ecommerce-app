import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import Auth0ProviderWithNavigate from './components/Auth0Provider.tsx';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient(); 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate> 
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <App />
          </Provider>    
        </QueryClientProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </StrictMode>,
)
