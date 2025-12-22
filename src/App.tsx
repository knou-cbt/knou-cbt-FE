import { Outlet, useLocation } from "react-router-dom"

import { Header, Footer } from "@/components"
import { ExamProvider } from "@/contexts"

function App() {
  const location = useLocation()

  // 시험모드 경로 체크
  const isExamMode = location.pathname.includes("/test-mode")

  return (
    <ExamProvider>
      <div className="min-h-screen bg-white flex flex-col">
        <Header variant={isExamMode ? "exam" : "default"} />
        <Outlet />
        <Footer />
      </div>
    </ExamProvider>
  )
}

export default App
