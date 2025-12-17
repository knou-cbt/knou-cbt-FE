import * as React from "react"
import { BookOpen } from "lucide-react"

import { cn } from "@/lib/utils"

export interface IHeaderProps extends React.HTMLAttributes<HTMLElement> {}

const Header = React.forwardRef<HTMLElement, IHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "box-border flex flex-col items-start px-[214px] py-4 pb-[1px] w-full h-[78px] bg-white border-b border-[#E5E7EB]",
          className
        )}
        {...props}
      >
        {/* Container */}
        <div className="flex flex-row justify-between items-center w-full max-w-[1232px] h-11 mx-auto">
          {/* Logo Container */}
          <div className="flex flex-row items-center gap-3">
            {/* Logo Icon */}
            <div className="flex justify-center items-center w-8 h-8 bg-[#155DFC] rounded-[10px]">
              <BookOpen className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            {/* Logo Text */}
            <span className="font-normal text-base leading-6 text-[#101828]">
              문제다모아
            </span>
          </div>

          {/* Navigation - 필요시 추가 */}
          <nav className="flex items-center gap-6">
            {/* 네비게이션 메뉴 항목들 */}
          </nav>
        </div>
      </header>
    )
  }
)
Header.displayName = "Header"

export { Header }

