import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.css' // <-- TASARIM İÇİN BU ŞART (Tailwind buradan geliyor)
import { HashRouter } from 'react-router-dom' // Router'ı buraya aldık

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)