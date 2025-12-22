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
        id: 1,
        examId: 1,
        questionNumber: 1,
        questionText: "다음 중 한국의 수도는 어디인가?",
        correctAnswer: 2,
        explanation: "대한민국의 수도는 서울특별시입니다. 서울은 1394년 조선 건국 이후부터 현재까지 한국의 수도 역할을 하고 있습니다.",
        answers: [
            { value: 1, label: "부산" },
            { value: 2, label: "서울" },
            { value: 3, label: "인천" },
            { value: 4, label: "대전" },
        ],
    },
    {
        id: 2,
        examId: 1,
        questionNumber: 2,
        questionText: "다음 중 운영체제가 아닌 것은?",
        correctAnswer: 3,
        explanation: "Python은 프로그래밍 언어입니다. 운영체제(OS)는 컴퓨터 하드웨어와 소프트웨어를 관리하는 시스템 소프트웨어로, Windows, Linux, macOS가 대표적입니다.",
        answers: [
            { value: 1, label: "Windows" },
            { value: 2, label: "Linux" },
            { value: 3, label: "Python" },
            { value: 4, label: "macOS" },
        ],
    },
    {
        id: 3,
        examId: 1,
        questionNumber: 3,
        questionText: "CPU의 구성요소가 아닌 것은?",
        correctAnswer: 4,
        explanation: "CPU는 ALU(산술논리장치), 제어장치, 레지스터로 구성됩니다. 하드디스크는 보조기억장치로 CPU의 구성요소가 아닙니다.",
        answers: [
            { value: 1, label: "ALU" },
            { value: 2, label: "제어장치" },
            { value: 3, label: "레지스터" },
            { value: 4, label: "하드디스크" },
        ],
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
    const hasSelectedAnswer = selectedAnswer !== null

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
                        {subjectNameMap[subjectId ?? ""] ?? "-"} | {year}년 | 암기모드
                    </p>
                </div>

                {/* Question Card */}
                <div className="w-full max-w-[1066px]">
                    <QuestionCard
                        size="full"
                        question={currentQuestion.questionText}
                        answers={currentQuestion.answers}
                        selectedAnswer={selectedAnswer}
                        correctAnswer={currentQuestion.correctAnswer}
                        showResult={showResult}
                        onAnswerSelect={handleAnswerSelect}
                        actionButtonText=""
                    />
                </div>

                {/* 해설 영역 - 정답 확인 이후에만 노출 */}
                {showResult && currentQuestion.explanation && (
                    <div className="w-full max-w-[1066px] mt-6">
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[16px] p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <h3 className="font-semibold text-[#101828]">해설</h3>
                            </div>
                            <p className="text-[#364153] leading-7">
                                {currentQuestion.explanation}
                            </p>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="w-full max-w-[896px] mt-8">
                    <ExamNavButtons
                        onPrevClick={handlePrev}
                        onAnswerClick={handleShowAnswer}
                        onNextClick={handleNext}
                        prevDisabled={isFirstQuestion}
                        answerDisabled={!hasSelectedAnswer || showResult}
                        nextDisabled={isLastQuestion}
                        answerLabel={showResult ? "정답 확인됨" : "정답 확인"}
                    />
                </div>
            </main>
        </div>
    )
}
