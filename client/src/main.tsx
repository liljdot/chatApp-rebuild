import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './state/store.ts'
import SocketContextProvider from './context/SocketContext.tsx'
import ConversationFieldContextProvider from './context/ConversationFieldContext.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <SocketContextProvider>
      <ConversationFieldContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConversationFieldContextProvider>
    </SocketContextProvider>
  </Provider>
)
