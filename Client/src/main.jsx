import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Appstate from './context/Appstate.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Appstate>
    <App />
  </Appstate>,
)
