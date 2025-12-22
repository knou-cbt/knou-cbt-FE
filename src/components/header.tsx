import * as React from "react"
import { useState, useEffect, useCallback } from "react"
import { BookOpen, Clock, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { cn } from "@/lib/utils"
import { useExamContext } from "@/contexts"
import { Button } from "@/components/ui"

export interface IHeaderProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "exam"
  /** 시험 시간 (초 단위, 기본값: 3000초 = 50분) */
  examDuration?: number
}

const Header = React.forwardRef<HTMLElement, IHeaderProps>(
  (
    {
      className,
      variant = "default",
      examDuration = 3000,
      ...props
    },
    ref
  ) => {
    const navigate = useNavigate()
    const { onExamEnd } = useExamContext()
    const [remainingTime, setRemainingTime] = useState(examDuration)

    // 타이머 로직
    useEffect(() => {
      if (variant !== "exam") return

      const timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            // 시간 종료 시 자동 제출
            onExamEnd?.()
            alert("시험 시간이 종료되었습니다.")
            navigate("/")
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }, [variant, onExamEnd, navigate])

    // 시간 포맷팅 (MM:SS)
    const formatTime = useCallback((seconds: number) => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }, [])

    const handleExamEnd = () => {
      onExamEnd?.()
      navigate("/")
    }

    return (
      <header
        ref={ref}
        className={cn(
          "box-border flex flex-col items-start px-6 py-4 pb-[1px] w-full h-[77px] bg-white border-b border-[#E5E7EB]",
          className
        )}
        {...props}
      >
        {/* Container */}
        <div className="flex flex-row justify-between items-center w-full max-w-[1392px] h-11 mx-auto">
          {/* Logo Container */}
          <div
            className="flex flex-row items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            {/* Logo Icon */}
            <div className="flex justify-center items-center w-8 h-8 bg-[#155DFC] rounded-[10px]">
              <BookOpen className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            {/* Logo Text */}
            <span className="font-normal text-base leading-6 text-[#101828]">
              문제다모아
            </span>
          </div>

          {/* 시험 모드 */}
          {variant === "exam" && (
            <div className="flex flex-row items-center gap-3">
              {/* Timer */}
              <div className="flex flex-row items-center px-4 gap-2 h-11 bg-[#EFF6FF] rounded-[10px]">
                <Clock className="w-5 h-5 text-[#155DFC]" strokeWidth={1.67} />
                <span className="font-normal text-sm leading-7 text-[#155DFC]">
                  {formatTime(remainingTime)}
                </span>
              </div>

              <Button
                variant="outline"
                onClick={handleExamEnd}
                className="bg-[#FEF2F2] border-[#FFC9C9] text-xs text-[#E7000B] hover:bg-[#FEE2E2] hover:text-[#E7000B]"
              >
                <LogOut className="w-4 h-4" strokeWidth={1.33} />
                시험 종료
              </Button>
            </div>
          )}

          {/* Navigation - 기본 모드일 때만 표시 */}
          {variant === "default" && (
            <nav className="flex items-center gap-6">
              {/* 네비게이션 메뉴 항목들 */}
            </nav>
          )}
        </div>
      </header>
    )
  }
)
Header.displayName = "Header"

export { Header }

