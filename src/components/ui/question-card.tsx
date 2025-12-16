import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ============================================
// Tag Components
// ============================================

const tagVariants = cva(
  "inline-flex items-center justify-center px-3 h-7 rounded-full font-normal text-sm leading-5",
  {
    variants: {
      variant: {
        primary: "bg-[#EFF6FF] text-[#1447E6]",
        secondary: "bg-[#F3F4F6] text-[#364153]",
        success: "bg-[#ECFDF5] text-[#059669]",
        warning: "bg-[#FFFBEB] text-[#D97706]",
        danger: "bg-[#FEF2F2] text-[#DC2626]",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
)

export interface IQuestionTagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

const QuestionTag = React.forwardRef<HTMLSpanElement, IQuestionTagProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(tagVariants({ variant, className }))}
      {...props}
    />
  )
)
QuestionTag.displayName = "QuestionTag"

// ============================================
// Answer Choice Components
// ============================================

const answerChoiceVariants = cva(
  "box-border flex flex-row items-center px-4 gap-4 w-full h-[60px] bg-white border-2 rounded-[14px] cursor-pointer transition-all duration-200",
  {
    variants: {
      state: {
        default: "border-[#E5E7EB] hover:border-[#D1D5DC]",
        selected: "border-[#155DFC] bg-[#EFF6FF]",
        correct: "border-[#059669] bg-[#ECFDF5]",
        incorrect: "border-[#DC2626] bg-[#FEF2F2]",
        disabled: "border-[#E5E7EB] opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
)

const radioVariants = cva(
  "box-border flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-200",
  {
    variants: {
      state: {
        default: "bg-white border-[#D1D5DC]",
        selected: "bg-white border-[#155DFC]",
        correct: "bg-white border-[#059669]",
        incorrect: "bg-white border-[#DC2626]",
        disabled: "bg-white border-[#D1D5DC]",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
)

export interface IAnswerChoiceProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  state?: "default" | "selected" | "correct" | "incorrect" | "disabled"
  value: string | number
  onSelect?: (value: string | number) => void
}

const AnswerChoice = React.forwardRef<HTMLDivElement, IAnswerChoiceProps>(
  (
    { className, state = "default", value, onSelect, children, ...props },
    ref
  ) => {
    const handleClick = () => {
      if (state !== "disabled" && onSelect) {
        onSelect(value)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(answerChoiceVariants({ state, className }))}
        onClick={handleClick}
        role="radio"
        aria-checked={state === "selected"}
        tabIndex={state === "disabled" ? -1 : 0}
        {...props}
      >
        {/* Radio Circle */}
        <div className={cn(radioVariants({ state }))}>
          {(state === "selected" ||
            state === "correct" ||
            state === "incorrect") && (
            <div
              className={cn("w-2.5 h-2.5 rounded-full", {
                "bg-[#155DFC]": state === "selected",
                "bg-[#059669]": state === "correct",
                "bg-[#DC2626]": state === "incorrect",
              })}
            />
          )}
        </div>

        {/* Answer Text */}
        <span className="flex-1 font-normal text-base leading-6 text-[#101828]">
          {children}
        </span>
      </div>
    )
  }
)
AnswerChoice.displayName = "AnswerChoice"

// ============================================
// Action Button Component
// ============================================

const actionButtonVariants = cva(
  "w-full h-12 flex items-center justify-center rounded-[14px] font-normal text-base leading-6 transition-all duration-200 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-[#155DFC] text-white hover:bg-[#1447E6]",
        disabled: "bg-[#D1D5DC] text-[#6A7282] cursor-not-allowed",
        success: "bg-[#059669] text-white hover:bg-[#047857]",
        danger: "bg-[#DC2626] text-white hover:bg-[#B91C1C]",
        outline:
          "bg-white border-2 border-[#E5E7EB] text-[#364153] hover:bg-[#F9FAFB]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface IQuestionActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof actionButtonVariants> {}

const QuestionActionButton = React.forwardRef<
  HTMLButtonElement,
  IQuestionActionButtonProps
>(({ className, variant, disabled, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      actionButtonVariants({ variant: disabled ? "disabled" : variant, className })
    )}
    disabled={disabled}
    {...props}
  />
))
QuestionActionButton.displayName = "QuestionActionButton"

// ============================================
// Question Card Component
// ============================================

const questionCardVariants = cva(
  "flex flex-col items-start bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] rounded-[16px]",
  {
    variants: {
      size: {
        default: "w-[848px] p-8 pt-8 pb-0 gap-4",
        sm: "w-full max-w-[600px] p-6 pt-6 pb-0 gap-3",
        lg: "w-full max-w-[1024px] p-10 pt-10 pb-0 gap-5",
        full: "w-full p-8 pt-8 pb-0 gap-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface IQuestionTag {
  label: string
  variant?: "primary" | "secondary" | "success" | "warning" | "danger"
}

export interface IAnswerOption {
  value: string | number
  label: string
}

export interface IQuestionCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof questionCardVariants> {
  tags?: IQuestionTag[]
  question?: string
  answers?: IAnswerOption[]
  selectedAnswer?: string | number | null
  correctAnswer?: string | number | null
  showResult?: boolean
  onAnswerSelect?: (value: string | number) => void
  actionButtonText?: string
  actionButtonDisabled?: boolean
  onActionClick?: () => void
}

const QuestionCard = React.forwardRef<HTMLDivElement, IQuestionCardProps>(
  (
    {
      className,
      size,
      tags = [],
      question,
      answers = [],
      selectedAnswer,
      correctAnswer,
      showResult = false,
      onAnswerSelect,
      actionButtonText = "정답 확인",
      actionButtonDisabled = false,
      onActionClick,
      children,
      ...props
    },
    ref
  ) => {
    const getAnswerState = (
      value: string | number
    ): "default" | "selected" | "correct" | "incorrect" => {
      if (showResult) {
        if (value === correctAnswer) return "correct"
        if (value === selectedAnswer && value !== correctAnswer) return "incorrect"
      }
      if (value === selectedAnswer) return "selected"
      return "default"
    }

    return (
      <div className="flex flex-col items-start gap-6 w-full">
        {/* Question Card Section */}
        <div
          ref={ref}
          className={cn(questionCardVariants({ size, className }))}
          {...props}
        >
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-row items-start gap-2 w-full">
              {tags.map((tag, index) => (
                <QuestionTag key={index} variant={tag.variant}>
                  {tag.label}
                </QuestionTag>
              ))}
            </div>
          )}

          {/* Question Text */}
          {question && (
            <p className="font-normal text-[19px] leading-[31px] text-[#101828] w-full">
              {question}
            </p>
          )}

          {/* Custom Content */}
          {children}
        </div>

        {/* Answer Choices */}
        {answers.length > 0 && (
          <div className="flex flex-col items-start gap-3 w-full">
            {answers.map((answer) => (
              <AnswerChoice
                key={answer.value}
                value={answer.value}
                state={getAnswerState(answer.value)}
                onSelect={onAnswerSelect}
              >
                {answer.label}
              </AnswerChoice>
            ))}
          </div>
        )}

        {/* Action Button */}
        {actionButtonText && (
          <QuestionActionButton
            disabled={actionButtonDisabled}
            onClick={onActionClick}
          >
            {actionButtonText}
          </QuestionActionButton>
        )}
      </div>
    )
  }
)
QuestionCard.displayName = "QuestionCard"

// ============================================
// Question Container Component
// ============================================

export interface IQuestionContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const QuestionContainer = React.forwardRef<
  HTMLDivElement,
  IQuestionContainerProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col items-start px-6 pt-8 pb-0 gap-6 w-full max-w-[896px]",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
QuestionContainer.displayName = "QuestionContainer"

export {
  QuestionTag,
  AnswerChoice,
  QuestionActionButton,
  QuestionCard,
  QuestionContainer,
  tagVariants,
  answerChoiceVariants,
  radioVariants,
  actionButtonVariants,
  questionCardVariants,
}

