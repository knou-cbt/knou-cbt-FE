// 시험모드 관련 인터페이스 정의

export interface IQuestion {
    id: string
    questionNumber: number
    question: string
    answers: IAnswerOption[]
    correctAnswer: string | number
    commentary?: string
    keywords?: string[]
}

export interface IAnswerOption {
    value: string | number
    label: string
}

export interface IQuestionResult {
    questionId: string
    selectedAnswer: string | number | null
    isCorrect: boolean
}

