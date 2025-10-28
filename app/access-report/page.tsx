import { AccessReportForm } from "@/components/access-report-form"
import { Header } from "@/components/header"

export const metadata = {
  title: "Access Report - Tranzmit AI",
  description: "Access your personalized report with your unique report ID and password.",
}

export default function AccessReportPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#E6F3FF_0%,_#F0F8FF_50%,_white_100%)]">
      <Header />
      <main className="pt-20">
        <AccessReportForm />
      </main>
    </div>
  )
}

