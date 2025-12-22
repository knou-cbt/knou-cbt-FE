import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface IExamContextValue {
    isExamMode: boolean
    isSubmitted: boolean
    setIsExamMode: (value: boolean) => void
    setIsSubmitted: (value: boolean) => void
    onExamEnd: (() => void) | null
    setOnExamEnd: (handler: (() => void) | null) => void
}

const ExamContext = createContext<IExamContextValue | null>(null)

export const ExamProvider = ({ children }: { children: ReactNode }) => {
    const [isExamMode, setIsExamMode] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [onExamEnd, setOnExamEnd] = useState<(() => void) | null>(null)

    const handleSetOnExamEnd = useCallback((handler: (() => void) | null) => {
        setOnExamEnd(() => handler)
    }, [])

    return (
        <ExamContext.Provider
            value={{
                isExamMode,
                isSubmitted,
                setIsExamMode,
                setIsSubmitted,
                onExamEnd,
                setOnExamEnd: handleSetOnExamEnd,
            }}
        >
            {children}
        </ExamContext.Provider>
    )
}

export const useExamContext = () => {
    const context = useContext(ExamContext)
    if (!context) {
        throw new Error("useExamContext must be used within ExamProvider")
    }
    return context
}

