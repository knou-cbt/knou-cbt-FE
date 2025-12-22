// 암기모드 관련 인터페이스 정의

export interface IQuestion {
    id: number
    examId: number
    questionNumber: number
    questionText: string
    questionImageUrl?: string
    correctAnswer: number // 정답 (1~)
    explanation?: string // 해설
    createdAt?: string
    // UI용 답안 옵션 (API에서 별도 테이블로 관리 가능)
    answers: IAnswerOption[]
}

export interface IAnswerOption {
    value: number
    label: string
}

