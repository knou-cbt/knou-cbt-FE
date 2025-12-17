import { Outlet } from "react-router-dom"

import { Header, Footer } from "@/components"

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
