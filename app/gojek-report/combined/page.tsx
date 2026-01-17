'use client'

import { useEffect, useState } from 'react'

export default function GojekCombinedReportPage() {
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch the HTML file from public directory
    fetch('/gojek-combined-report.html')
      .then(response => response.text())
      .then(html => {
        setHtmlContent(html)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading report:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  )
}
