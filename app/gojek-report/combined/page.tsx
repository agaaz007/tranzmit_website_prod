import fs from 'fs'
import path from 'path'

export default async function GojekCombinedReportPage() {
  // Read the HTML file from the public directory
  const htmlPath = path.join(process.cwd(), 'public', 'gojek-combined-report.html')
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
  
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  )
}
