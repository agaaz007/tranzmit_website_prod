"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Lock, FileText, Loader2, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function AccessReportForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    reportId: "",
    password: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: Implement actual authentication logic
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Example validation - replace with actual API call
      if (formData.reportId && formData.password) {
        toast.success("Access granted! Redirecting to your report...")
        // TODO: Replace with actual report route
        setTimeout(() => {
          router.push('/sample-report')
        }, 1000)
      } else {
        toast.error("Please enter both Report ID and Password")
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Invalid credentials. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Access Your Personalized Report
              </h1>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Secure Report Access
                </h2>
                <p className="text-muted-foreground text-lg">
                  Enter your unique Report ID and password to view your detailed insights and analysis.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Comprehensive Insights
                </h2>
                <p className="text-muted-foreground text-lg">
                  Your report includes detailed charts, respondent data, and actionable recommendations.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-start gap-3">
                  <Lock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-base text-foreground mb-2">
                      Your data is secure
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      All reports are password-protected and encrypted. Your credentials are never stored or shared.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="animate-fade-in-up animation-delay-200">
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
              <CardContent className="p-8">
                {/* Form header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <FileText className="h-7 w-7 text-primary" />
                    <h2 className="text-3xl font-bold text-primary">
                      Report Login
                    </h2>
                  </div>
                  <p className="text-muted-foreground">
                    Enter your credentials to access your report
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Report ID */}
                  <div className="space-y-2">
                    <Label htmlFor="reportId" className="text-sm font-semibold">
                      Report ID <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="reportId"
                      placeholder="Enter your report ID"
                      value={formData.reportId}
                      onChange={(e) => handleInputChange("reportId", e.target.value)}
                      className="h-12 text-base transition-all duration-300 focus:scale-[1.02]"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Your unique report identifier (e.g., RPT-123456)
                    </p>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="h-12 text-base transition-all duration-300 focus:scale-[1.02] pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      The password provided with your report
                    </p>
                  </div>

                  {/* Security notice */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex items-start gap-3">
                      <Lock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-sm text-foreground mb-1">
                          Secure Access
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Your credentials are verified securely. If you've forgotten your password or lost your Report ID, please contact support.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit button */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full h-12 text-base font-bold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <FileText className="h-5 w-5 mr-2" />
                        Access My Report
                      </>
                    )}
                  </Button>

                  {/* Help text */}
                  <div className="text-center pt-4">
                    <p className="text-sm text-muted-foreground">
                      Need help?{" "}
                      <a 
                        href="/book-demo" 
                        className="text-primary hover:underline font-semibold"
                      >
                        Contact Support
                      </a>
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

