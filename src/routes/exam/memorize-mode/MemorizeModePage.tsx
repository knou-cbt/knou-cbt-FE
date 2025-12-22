import { useState, useCallback } from "react"
import { useParams } from "react-router-dom"

import {
    ExamNavButtons,
    QuestionCard,
} from "@/components/ui"

import type { IQuestion } from "./interface"

// 과목 ID → 과목명 매핑 (추후 API 연동 시 제거)
const subjectNameMap: Record<string, string> = {
    "1": "컴퓨터구조",
    "2": "운영체제",
    "3": "데이터베이스",
    "4": "네트워크",
    "5": "알고리즘",
    "6": "자료구조",
    "7": "소프트웨어공학",
    "8": "정보보안",
}

// 샘플 데이터 (추후 API 연동 시 제거)
const sampleQuestions: IQuestion[] = [
    {
        id: "1",
        questionNumber: 1,
        question: "다음 중 한국의 수도는 어디인가?",
        answers: [
            { value: "1", label: "부산" },
            { value: "2", label: "서울" },
            { value: "3", label: "인천" },
            { value: "4", label: "대전" },
        ],
        correctAnswer: "2",
    },
    {
        id: "2",
        questionNumber: 2,
        question: "다음 중 운영체제가 아닌 것은?",
        answers: [
            { value: "1", label: "Windows" },
            { value: "2", label: "Linux" },
            { value: "3", label: "Python" },
            { value: "4", label: "macOS" },
        ],
        correctAnswer: "3",
    },
    {
        id: "3",
        questionNumber: 3,
        question: "CPU의 구성요소가 아닌 것은?",
        answers: [
            { value: "1", label: "ALU" },
            { value: "2", label: "제어장치" },
            { value: "3", label: "레지스터" },
            { value: "4", label: "하드디스크" },
        ],
        correctAnswer: "4",
    },
]

export const MemorizeModePage = () => {
    const { subjectId, year } = useParams<{ subjectId: string; year: string }>()

    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null)
    const [showResult, setShowResult] = useState(false)

    const currentQuestion = sampleQuestions[currentIndex]
    const isFirstQuestion = currentIndex === 0
    const isLastQuestion = currentIndex === sampleQuestions.length - 1

    const handleAnswerSelect = useCallback((value: string | number) => {
        if (!showResult) {
            setSelectedAnswer(value)
        }
    }, [showResult])

    const handleShowAnswer = useCallback(() => {
        setShowResult(true)
    }, [])

    const handlePrev = useCallback(() => {
        if (!isFirstQuestion) {
            setCurrentIndex((prev) => prev - 1)
            setSelectedAnswer(null)
            setShowResult(false)
        }
    }, [isFirstQuestion])

    const handleNext = useCallback(() => {
        if (!isLastQuestion) {
            setCurrentIndex((prev) => prev + 1)
            setSelectedAnswer(null)
            setShowResult(false)
        }
    }, [isLastQuestion])

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center px-4 py-8">
                {/* Question Info */}
                <div className="w-full max-w-[1066px] mb-4">
                    <p className="text-sm text-[#6B7280]">
                        {subjectNameMap[subjectId ?? ""] ?? "알 수 없는 과목"} | {year}년 | 문제 {currentIndex + 1} / {sampleQuestions.length}
                    </p>
                </div>

                {/* Question Card */}
                <div className="w-full max-w-[1066px]">
                    <QuestionCard
                        size="full"
                        question={currentQuestion.question}
                        answers={currentQuestion.answers}
                        selectedAnswer={selectedAnswer}
                        correctAnswer={currentQuestion.correctAnswer}
                        showResult={showResult}
                        onAnswerSelect={handleAnswerSelect}
                        actionButtonText=""
                    />
                </div>

                {/* Navigation Buttons */}
                <div className="w-full max-w-[896px] mt-8">
                    <ExamNavButtons
                        onPrevClick={handlePrev}
                        onAnswerClick={handleShowAnswer}
                        onNextClick={handleNext}
                        prevDisabled={isFirstQuestion}
                        nextDisabled={isLastQuestion}
                        answerLabel={showResult ? "정답 확인됨" : "정답 보기"}
                    />
                </div>
            </main>
        </div>
    )
}

