import { useState, useCallback } from "react"
import { useParams } from "react-router-dom"

import {
    QuestionCard,
} from "@/components/ui"
import { ExamNavButtons } from "./components"
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
        commentary: "대한민국의 수도는 서울특별시입니다. 서울은 1394년 조선 건국 이후부터 현재까지 한국의 수도 역할을 하고 있습니다.",
        keywords: ["서울", "수도", "조선"],
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
        commentary: "Python은 프로그래밍 언어입니다. 운영체제(OS)는 컴퓨터 하드웨어와 소프트웨어를 관리하는 시스템 소프트웨어로, Windows, Linux, macOS가 대표적입니다.",
        keywords: ["운영체제", "프로그래밍 언어", "시스템 소프트웨어"],
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
        commentary: "CPU는 ALU(산술논리장치), 제어장치, 레지스터로 구성됩니다. 하드디스크는 보조기억장치로 CPU의 구성요소가 아닙니다.",
        keywords: ["CPU", "ALU", "제어장치", "레지스터", "보조기억장치"],
    },
]

export const TestModePage = () => {
    const { subjectId, year } = useParams<{ subjectId: string; year: string }>()

    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string | number | null>>({})
    const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({})

    const currentQuestion = sampleQuestions[currentIndex]
    const isFirstQuestion = currentIndex === 0
    const isLastQuestion = currentIndex === sampleQuestions.length - 1
    const selectedAnswer = answers[currentIndex] ?? null
    const isCurrentChecked = checkedQuestions[currentIndex] ?? false
    const hasSelectedAnswer = selectedAnswer !== null

    const handleAnswerSelect = useCallback((value: string | number) => {
        // 정답 확인 후에는 선택 불가 (선택지 잠금)
        if (!isCurrentChecked) {
            setAnswers((prev) => ({
                ...prev,
                [currentIndex]: value,
            }))
        }
    }, [currentIndex, isCurrentChecked])

    const handleCheckAnswer = useCallback(() => {
        // 정답 확인: 현재 문제를 채점 완료로 표시
        setCheckedQuestions((prev) => ({
            ...prev,
            [currentIndex]: true,
        }))
    }, [currentIndex])

    const handlePrev = useCallback(() => {
        // 정답 확인 이후에만 이전 문제로 이동 가능
        if (!isFirstQuestion && isCurrentChecked) {
            setCurrentIndex((prev) => prev - 1)
        }
    }, [isFirstQuestion, isCurrentChecked])

    const handleNext = useCallback(() => {
        // 정답 확인 이후에만 다음 문제로 이동 가능
        if (!isLastQuestion && isCurrentChecked) {
            setCurrentIndex((prev) => prev + 1)
        }
    }, [isLastQuestion, isCurrentChecked])

    // 해설 텍스트에서 키워드 강조
    const renderCommentary = (commentary: string, keywords: string[] = []) => {
        if (keywords.length === 0) return commentary

        let result = commentary
        keywords.forEach((keyword) => {
            const regex = new RegExp(`(${keyword})`, "gi")
            result = result.replace(regex, `<strong class="text-[#155DFC] font-semibold">$1</strong>`)
        })

        return <span dangerouslySetInnerHTML={{ __html: result }} />
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center px-4 py-8">
                {/* Question Info */}
                <div className="w-full max-w-[1104px] mb-4">
                    <p className="text-sm text-[#6B7280]">
                        {subjectNameMap[subjectId ?? ""] ?? "-"} | {year}년 | 시험모드
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
                        showResult={isCurrentChecked}
                        onAnswerSelect={handleAnswerSelect}
                        actionButtonText=""
                    />
                </div>

                {/* 해설 / 암기 포인트 영역 - 정답 확인 이후에만 노출 */}
                {isCurrentChecked && currentQuestion.commentary && (
                    <div className="w-full max-w-[1066px] mt-6">
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[16px] p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <h3 className="font-semibold text-[#101828]">해설 / 암기 포인트</h3>
                            </div>
                            <p className="text-[#364153] leading-7">
                                {renderCommentary(currentQuestion.commentary, currentQuestion.keywords)}
                            </p>
                            {currentQuestion.keywords && currentQuestion.keywords.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {currentQuestion.keywords.map((keyword, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-[#EFF6FF] text-[#155DFC] text-sm rounded-full"
                                        >
                                            #{keyword}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="w-full max-w-[896px] mt-8">
                    <ExamNavButtons
                        onPrevClick={handlePrev}
                        onAnswerClick={handleCheckAnswer}
                        onNextClick={handleNext}
                        prevDisabled={isFirstQuestion || !isCurrentChecked}
                        answerDisabled={!hasSelectedAnswer || isCurrentChecked}
                        nextDisabled={isLastQuestion || !isCurrentChecked}
                        answerLabel={isCurrentChecked ? "정답 확인됨" : "정답 확인"}
                        showAnswer={true}
                    />
                </div>
            </main>
        </div>
    )
}

