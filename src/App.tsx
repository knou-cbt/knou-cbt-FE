import { Outlet, useLocation } from "react-router-dom";

import { Header, Footer } from "@/components";
import { ExamProvider, useExamContext } from "@/contexts";

function AppContent() {
  const location = useLocation();
  const { isSubmitted } = useExamContext();

  // 시험모드 경로 체크 (제출 후에는 exam 모드 해제)
  const isExamMode =
    location.pathname.includes("/test-mode") && !isSubmitted;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        key={isExamMode ? "exam" : "default"}
        variant={isExamMode ? "exam" : "default"}
      />
      <Outlet />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ExamProvider>
      <AppContent />
    </ExamProvider>
  );
}

export default App;
