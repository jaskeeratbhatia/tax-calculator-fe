import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { ChakraProvider } from "@chakra-ui/react";
import store from './store/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <Provider store={store}>
    <ChakraProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ChakraProvider>
    </Provider>
  </StrictMode>,
)
