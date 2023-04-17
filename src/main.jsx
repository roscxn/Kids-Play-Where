import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import App from './pages/App/App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router><App /></Router>
  </React.StrictMode>,
)