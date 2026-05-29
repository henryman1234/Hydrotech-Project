import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContextProvider } from './contexts/AuthContext.tsx'
import { ThemeContextProvider } from './contexts/ThemeContext.tsx'


const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider  client={client}>
        <ThemeContextProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </ThemeContextProvider>
    </QueryClientProvider>

  </StrictMode>,
)
