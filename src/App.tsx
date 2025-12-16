import { BookOpen, GraduationCap, FileQuestion, Users } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">ExamPool</h1>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              문제 은행
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              시험 생성
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              통계
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            효율적인 시험 문제 관리
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ExamPool로 시험 문제를 체계적으로 관리하고, 
            다양한 형태의 시험을 쉽게 생성하세요.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow">
            <FileQuestion className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              문제 은행
            </h3>
            <p className="text-muted-foreground">
              다양한 유형의 문제를 체계적으로 분류하고 관리하세요.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow">
            <BookOpen className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              시험 생성
            </h3>
            <p className="text-muted-foreground">
              원하는 조건에 맞게 자동으로 시험지를 생성하세요.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow">
            <Users className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              결과 분석
            </h3>
            <p className="text-muted-foreground">
              시험 결과를 분석하고 학습 성과를 추적하세요.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          © 2025 ExamPool. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
