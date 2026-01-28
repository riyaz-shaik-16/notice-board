import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { AuthProvider } from "./context/AuthContext"
import { NoticeProvider } from "./context/NoticeContext"

import "./index.css"
import App from "./App.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <NoticeProvider>
        <App />
      </NoticeProvider>
    </AuthProvider>
  </StrictMode>
)
