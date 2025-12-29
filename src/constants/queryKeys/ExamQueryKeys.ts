/**
 * Exam 관련 React Query Keys
 * 쿼리 키는 계층적으로 관리하여 캐시 무효화를 쉽게 할 수 있도록 합니다.
 */
export const ExamQueryKeys = {
  all: ["exam"] as const,

  // 시험 목록
  lists: () => [...ExamQueryKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...ExamQueryKeys.lists(), filters] as const,

  // 시험 상세
  details: () => [...ExamQueryKeys.all, "detail"] as const,
  detail: (id: string | number) => [...ExamQueryKeys.details(), id] as const,

  // 시험 년도별
  years: () => [...ExamQueryKeys.all, "year"] as const,
  year: (year: string | number) => [...ExamQueryKeys.years(), year] as const,

  // 문제 관련
  questions: () => [...ExamQueryKeys.all, "question"] as const,
  question: (id: string | number) =>
    [...ExamQueryKeys.questions(), id] as const,
  questionsByExam: (examId: string | number) =>
    [...ExamQueryKeys.questions(), "exam", examId] as const,
} as const;
