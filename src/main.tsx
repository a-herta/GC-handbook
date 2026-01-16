import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import * as data from '@/backend/data'
import * as events from '@/backend/events'
import * as server from '@/backend/server'

import './css/index.css'
import App from './ui/App.tsx'

data.setup()
events.setup()
server.setup()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
