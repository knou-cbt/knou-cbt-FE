import * as React from "react"

import { cn } from "@/lib/utils"

export interface IFooterProps extends React.HTMLAttributes<HTMLElement> {}

const Footer = React.forwardRef<HTMLElement, IFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(
          "border-t border-[#E5E7EB] bg-white mt-auto",
          className
        )}
        {...props}
      >
        <div className="container mx-auto px-4 py-6 text-center text-[#6B7280] text-sm">
          © 2025 문제다모아. All rights reserved.
        </div>
      </footer>
    )
  }
)
Footer.displayName = "Footer"

export { Footer }

