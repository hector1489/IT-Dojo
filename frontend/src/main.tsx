import React from 'react';
import ReactDOM from 'react-dom/client';
import { WrappedApp } from './App';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <WrappedApp />
  </React.StrictMode>
)

/*const enableMocking = async ():Promise<void>  => {
  if (process.env.NODE_ENV !== 'development') return

  const { worker } = await import('../mocks/browser.js')

  return worker.start()
}

enableMocking()
  .then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
          <WrappedApp />
      </React.StrictMode>,
    )
  })
  .catch(console.error)*/