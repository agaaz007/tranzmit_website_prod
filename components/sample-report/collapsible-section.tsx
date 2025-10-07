"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface CollapsibleSectionProps {
  children: React.ReactNode
  className?: string
  forceShowButton?: boolean
}

export function CollapsibleSection({ children, className = "", forceShowButton = false }: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      // Check if content is taller than 400px (increased to show more initial content)
      const isContentTall = contentRef.current.scrollHeight > 400
      setShowButton(forceShowButton || isContentTall)
      
      // If content is short and not forced, expand it by default
      if (!isContentTall && !forceShowButton) {
        setIsExpanded(true)
      }
    }
  }, [forceShowButton])

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={className}>
      <div 
        ref={contentRef}
        className={`transition-all duration-500 ease-out overflow-hidden ${
          isExpanded ? 'max-h-none' : 'max-h-[400px]'
        }`}
      >
        {children}
      </div>
      {showButton && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            size="lg"
            onClick={toggleExpanded}
            className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-500 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </Button>
        </div>
      )}
    </div>
  )
}



