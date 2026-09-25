import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { BookmarkProvider } from './context/BookmarkContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <BookmarkProvider>
          <App />
        </BookmarkProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
