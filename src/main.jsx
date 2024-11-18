import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './router/Router';
import "bulma/css/bulma.min.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
