"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CollapsibleSection } from "@/components/sample-report/collapsible-section"
import { ChartContainer } from "@/components/sample-report/chart-container"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function SampleReportPage() {
  const [isLiquidDeathExpanded, setIsLiquidDeathExpanded] = useState(false)
  const [isSpindriftExpanded, setIsSpindriftExpanded] = useState(false)
  
  // Complete respondent data from the Liquid Death survey (101 total respondents)
  const respondents = [
    { id: "114", tagline: "Curious Sparkling Water Drinker", qualityScore: 5, tags: "35-44 F", age: "35-44", gender: "Female", country: "United States" },
    { id: "113", tagline: "Heavy Metal Enthusiast Seeking Unique Drinks", qualityScore: 5, tags: "35-44 M", age: "35-44", gender: "Male", country: "United States" },
    { id: "112", tagline: "Health-Conscious Carbonation Enthusiast", qualityScore: 5, tags: "55-64 F", age: "55-64", gender: "Female", country: "United States" },
    { id: "111", tagline: "Sparkling Water Enthusiast Seeking Unique Options", qualityScore: 5, tags: "35-44 F", age: "35-44", gender: "Female", country: "United States" },
    { id: "109", tagline: "Adventurous Female Trying New Things", qualityScore: 4, tags: "35-44 F", age: "35-44", gender: "Female", country: "United States" },
    { id: "108", tagline: "Health-Conscious Sparkling Water Enthusiast", qualityScore: 5, tags: "25-34 F", age: "25-34", gender: "Female", country: "United States" },
    { id: "107", tagline: "Former Heavy Drinker, Health-Conscious", qualityScore: 5, tags: "55-64 M", age: "55-64", gender: "Male", country: "United States" },
    { id: "105", tagline: "Health-Conscious Citrus Lover", qualityScore: 4, tags: "65+ F", age: "65 or older", gender: "Female", country: "United States" },
    { id: "104", tagline: "Daily Sparkling Water Enthusiast", qualityScore: 4, tags: "45-54 F", age: "45-54", gender: "Female", country: "United States" },
    { id: "103", tagline: "Non-sparkling Water Drinker with Niche Insights", qualityScore: 4, tags: "45-54 M", age: "45-54", gender: "Male", country: "United States" },
    { id: "102", tagline: "Daily Sparkling Water Drinker", qualityScore: 3, tags: "18-24 F", age: "18-24", gender: "Female", country: "United States" },
    { id: "101", tagline: "Young Sparkling Water Enthusiast", qualityScore: 4, tags: "18-24 M", age: "18-24", gender: "Male", country: "United States" },
    { id: "99", tagline: "Health-Conscious Senior Prefers Natural Ingredients", qualityScore: 4, tags: "65+ M", age: "65 or older", gender: "Male", country: "United States" },
    { id: "98", tagline: "Health-Conscious Lime Lover", qualityScore: 5, tags: "35-44 F", age: "35-44", gender: "Female", country: "United States" },
    { id: "97", tagline: "Health-Conscious Non-Sparkling Water Drinker", qualityScore: 4, tags: "25-34 M", age: "25-34", gender: "Male", country: "United States" },
    { id: "96", tagline: "Health-Conscious Sparkling Water Enthusiast", qualityScore: 5, tags: "25-34 M", age: "25-34", gender: "Male", country: "United States" },
    { id: "95", tagline: "Senior Seeking Refreshing, Sugar-Free Drinks", qualityScore: 5, tags: "65+ F", age: "65 or older", gender: "Female", country: "United States" },
    { id: "93", tagline: "Millennial Sparkling Water Enthusiast", qualityScore: 5, tags: "25-34 F", age: "25-34", gender: "Female", country: "United States" },
    { id: "92", tagline: "Middle-aged Woman Prefers Calming Sparkling Water", qualityScore: 5, tags: "45-54 F", age: "45-54", gender: "Female", country: "United States" },
    { id: "91", tagline: "Daily Sparkling Water Drinker", qualityScore: 4, tags: "35-44 M", age: "35-44", gender: "Male", country: "United States" },
    { id: "90", tagline: "Health-Conscious Sparkling Water Enthusiast", qualityScore: 4, tags: "45-54 M", age: "45-54", gender: "Male", country: "United States" },
    { id: "89", tagline: "Daily Sparkling Water Drinker", qualityScore: 4, tags: "25-34 M", age: "25-34", gender: "Male", country: "United States" },
    { id: "88", tagline: "Daily Sparkling Water Enthusiast", qualityScore: 5, tags: "45-54 M", age: "45-54", gender: "Male", country: "United States" },
    { id: "87", tagline: "Caffeine-Seeking Flavor Enthusiast", qualityScore: 4, tags: "55-64 F", age: "55-64", gender: "Female", country: "United States" },
    { id: "86", tagline: "Health-Conscious Sparkling Water Enthusiast", qualityScore: 4, tags: "35-44 M", age: "35-44", gender: "Male", country: "United States" },
    { id: "85", tagline: "Health-Conscious Skeptic of Overpriced Products", qualityScore: 5, tags: "35-44 M", age: "35-44", gender: "Male", country: "United States" },
    { id: "84", tagline: "Adventurous Sparkling Water Enthusiast", qualityScore: 4, tags: "35-44 M", age: "35-44", gender: "Male", country: "United States" },
    { id: "83", tagline: "Frequent Sparkling Water Drinker", qualityScore: 4, tags: "45-54 M", age: "45-54", gender: "Male", country: "United States" },
    { id: "82", tagline: "Older Man Prefers Conventional Sparkling Water", qualityScore: 5, tags: "65+ M", age: "65 or older", gender: "Male", country: "United States" },
    { id: "81", tagline: "Health-Conscious Sparkling Water Enthusiast", qualityScore: 5, tags: "45-54 F", age: "45-54", gender: "Female", country: "United States" },
    { id: "80", tagline: "Daily Sparkling Water Drinker", qualityScore: 3, tags: "45-54 M", age: "45-54", gender: "Male", country: "United States" },
    { id: "79", tagline: "Daily Sparkling Water Drinker with Diverse Tastes", qualityScore: 5, tags: "35-44 F", age: "35-44", gender: "Female", country: "United States" },
    { id: "78", tagline: "Gothic Sparkling Water Critic", qualityScore: 5, tags: "25-34 F", age: "25-34", gender: "Female", country: "United States" },
    { id: "77", tagline: "Occasional Sparkling Water Explorer", qualityScore: 5, tags: "25-34 M", age: "25-34", gender: "Male", country: "United States" },
    { id: "76", tagline: "Curious Sparkling Water Drinker", qualityScore: 5, tags: "45-54 M", age: "45-54", gender: "Male", country: "United States" },
    { id: "75", tagline: "Health-Conscious Sparkling Water Enthusiast", qualityScore: 5, tags: "35-44 M", age: "35-44", gender: "Male", country: "United States" },
    { id: "74", tagline: "Occasional Sparkling Water Drinker", qualityScore: 5, tags: "25-34 M", age: "25-34", gender: "Male", country: "United States" },
    { id: "73", tagline: "Older Male Prefers Clean, Affordable Sparkling Water", qualityScore: 4, tags: "55-64 M", age: "55-64", gender: "Male", country: "United States" },
    { id: "72", tagline: "Busy Mom Prefers Unique, Healthy Drinks", qualityScore: 4, tags: "35-44 F", age: "35-44", gender: "Female", country: "United States" },
    { id: "71", tagline: "Health-Conscious Sparkling Water Enthusiast", qualityScore: 5, tags: "35-44 F", age: "35-44", gender: "Female", country: "United States" },
    { id: "70", tagline: "Sparkling Water Enthusiast", qualityScore: 4, tags: "25-34 M", age: "25-34", gender: "Male", country: "United States" },
    { id: "69", tagline: "Health-Conscious Sparkling Water Enthusiast", qualityScore: 5, tags: "25-34 M", age: "25-34", gender: "Male", country: "United States" },
    { id: "68", tagline: "Sparkling Water Enthusiast Seeking Refreshment", qualityScore: 4, tags: "35-44 F", age: "35-44", gender: "Female", country: "United States" },
    { id: "67", tagline: "Curious Sparkling Water Drinker", qualityScore: 4, tags: "25-34 F", age: "25-34", gender: "Female", country: "United States" },
    { id: "66", tagline: "Young Male Sparkling Water Enthusiast", qualityScore: 4, tags: "18-24 M", age: "18-24", gender: "Male", country: "United States" },
    { id: "65", tagline: "Occasional Sparkling Water Drinker", qualityScore: 3, tags: "18-24 F", age: "18-24", gender: "Female", country: "United States" },
    { id: "64", tagline: "Health-Conscious Diabetic Seeking Natural Drinks", qualityScore: 5, tags: "45-54 F", age: "45-54", gender: "Female", country: "United States" },
    { id: "63", tagline: "Health-Conscious Non-Alcoholic Drinker", qualityScore: 5, tags: "25-34 F", age: "25-34", gender: "Female", country: "United States" },
    { id: "62", tagline: "Middle-aged Woman Prefers Refreshing Designs", qualityScore: 4, tags: "45-54 F", age: "45-54", gender: "Female", country: "United States" },
    { id: "61", tagline: "Sweet Tooth, Former Restaurant Worker", qualityScore: 5, tags: "35-44 M", age: "35-44", gender: "Male", country: "United States" },
    { id: "60", tagline: "Sparkling Water Enthusiast", qualityScore: 5, tags: "45-54 M", age: "45-54", gender: "Male", country: "United States" },
    { id: "58", tagline: "Daily Sparkling Water Drinker", qualityScore: 3, tags: "35-44 F", age: "35-44", gender: "Female", country: "United States" },
    { id: "57", tagline: "Non-Sparkling Water Drinker", qualityScore: 4, tags: "25-34 F", age: "25-34", gender: "Female", country: "United States" },
    { id: "55", tagline: "Occasional Sparkling Water Drinker", qualityScore: 5, tags: "25-34 M", age: "25-34", gender: "Male", country: "United States" },
    { id: "54", tagline: "Occasional Sparkling Water Drinker", qualityScore: 4, tags: "25-34 F", age: "25-34", gender: "Female", country: "United States" },
    { id: "53", tagline: "Skeptical Sparkling Water Consumer", qualityScore: 4, tags: "55-64 M", age: "55-64", gender: "Male", country: "United States" },
    { id: "52", tagline: "Sweet Drink Enthusiast, Dislikes Cringe Marketing", qualityScore: 4, tags: "25-34 M", age: "25-34", gender: "Male", country: "United States" },
    { id: "51", tagline: "Daily Sparkling Water Drinker", qualityScore: 4, tags: "55-64 M", age: "55-64", gender: "Male", country: "United States" },
    { id: "50", tagline: "Older Woman Prefers Calming and Upbeat Designs", qualityScore: 4, tags: "65+ F", age: "65 or older", gender: "Female", country: "United States" },
    { id: "49", tagline: "Health-Conscious Middle-Aged Male", qualityScore: 5, tags: "45-54 M", age: "45-54", gender: "Male", country: "United States" },
    { id: "48", tagline: "Daily Sparkling Water Drinker", qualityScore: 5, tags: "25-34 F", age: "25-34", gender: "Female", country: "United States" },
    { id: "47", tagline: "Sparkling Water Enthusiast", qualityScore: 4, tags: "45-54 M", age: "45-54", gender: "Male", country: "United States" },
    { id: "46", tagline: "Minimalist Design Enthusiast", qualityScore: 4, tags: "25-34 F", age: "25-34", gender: "Female", country: "United States" },
    { id: "45", tagline: "Health-Conscious Daily Sparkling Water Drinker", qualityScore: 4, tags: "18-24 M", age: "18-24", gender: "Male", country: "United States" },
    { id: "42", tagline: "Seltzer Enthusiast Avoids Lime and Death Themes", qualityScore: 5, tags: "35-44 M", age: "35-44", gender: "Male", country: "United States" },
    { id: "41", tagline: "Sparkling Water Enthusiast with Design Concerns", qualityScore: 4, tags: "35-44 M", age: "35-44", gender: "Male", country: "United States" },
    { id: "40", tagline: "Sparkling Water Enthusiast with Design Opinions", qualityScore: 4, tags: "35-44 M", age: "35-44", gender: "Male", country: "United States" },
    { id: "39", tagline: "Frequent Sparkling Water Drinker", qualityScore: 5, tags: "55-64 F", age: "55-64", gender: "Female", country: "United States" },
    { id: "38", tagline: "Berry Flavor Enthusiast Seeking Sweetness", qualityScore: 5, tags: "35-44 M", age: "35-44", gender: "Male", country: "United States" },
    { id: "37", tagline: "Curious but Cautious Sparkling Water Drinker", qualityScore: 4, tags: "55-64 F", age: "55-64", gender: "Female", country: "United States" },
    { id: "36", tagline: "Sweet Sparkling Water Enthusiast", qualityScore: 4, tags: "35-44 F", age: "35-44", gender: "Female", country: "United States" },
    { id: "35", tagline: "Health-Conscious Sparkling Water Drinker", qualityScore: 4, tags: "45-54 F", age: "45-54", gender: "Female", country: "United States" },
    { id: "34", tagline: "Sparkling Water Enthusiast", qualityScore: 4, tags: "25-34 M", age: "25-34", gender: "Male", country: "United States" },
    { id: "33", tagline: "Trendy Male Sparkling Water Enthusiast", qualityScore: 5, tags: "25-34 M", age: "25-34", gender: "Male", country: "United States" },
    { id: "31", tagline: "Frequent Sparkling Water Drinker", qualityScore: 4, tags: "35-44 M", age: "35-44", gender: "Male", country: "United States" },
    { id: "30", tagline: "Traditional Sparkling Water Enthusiast", qualityScore: 4, tags: "65+ F", age: "65 or older", gender: "Female", country: "United States" },
    { id: "29", tagline: "Daily Sparkling Water Drinker", qualityScore: 4, tags: "45-54 M", age: "45-54", gender: "Male", country: "United States" },
    { id: "28", tagline: "Elegant Sparkling Water Enthusiast", qualityScore: 5, tags: "65+ F", age: "65 or older", gender: "Female", country: "United States" },
    { id: "27", tagline: "Health-Conscious Skeptic of Sparkling Water", qualityScore: 4, tags: "45-54 M", age: "45-54", gender: "Male", country: "United States" },
    { id: "26", tagline: "Middle-aged Sparkling Water Drinker", qualityScore: 5, tags: "45-54 F", age: "45-54", gender: "Female", country: "United States" },
    { id: "25", tagline: "Sparkling Water Enthusiast Seeking Quality", qualityScore: 5, tags: "25-34 M", age: "25-34", gender: "Male", country: "United States" },
    { id: "24", tagline: "Sparkling Water Enthusiast Seeking Flavor and Function", qualityScore: 5, tags: "35-44 M", age: "35-44", gender: "Male", country: "United States" },
    { id: "23", tagline: "Health-Conscious Sparkling Water Enthusiast", qualityScore: 5, tags: "45-54 F", age: "45-54", gender: "Female", country: "United States" },
    { id: "22", tagline: "Young Female Occasional Sparkling Water Drinker", qualityScore: 5, tags: "18-24 F", age: "18-24", gender: "Female", country: "United States" },
    { id: "21", tagline: "Health-Conscious Sparkling Water Enthusiast", qualityScore: 4, tags: "25-34 F", age: "25-34", gender: "Female", country: "United States" },
    { id: "19", tagline: "Health-Conscious Middle-Aged Man", qualityScore: 5, tags: "55-64 M", age: "55-64", gender: "Male", country: "United States" },
    { id: "18", tagline: "Dislikes Bland Sparkling Water, Prefers Deals", qualityScore: 5, tags: "45-54 F", age: "45-54", gender: "Female", country: "United States" },
    { id: "17", tagline: "Daily Sparkling Water Enthusiast", qualityScore: 5, tags: "45-54 M", age: "45-54", gender: "Male", country: "United States" },
    { id: "16", tagline: "Health-Conscious Sparkling Water Enthusiast", qualityScore: 5, tags: "25-34 F", age: "25-34", gender: "Female", country: "United States" },
    { id: "15", tagline: "Middle-aged Dad Prefers Flavored Water", qualityScore: 5, tags: "45-54 M", age: "45-54", gender: "Male", country: "United States" },
    { id: "14", tagline: "Sparkling Water Enthusiast", qualityScore: 4, tags: "45-54 F", age: "45-54", gender: "Female", country: "United States" },
    { id: "13", tagline: "Occasional Sparkling Water Drinker", qualityScore: 5, tags: "25-34 M", age: "25-34", gender: "Male", country: "United States" },
    { id: "12", tagline: "Health-Conscious Sparkling Water Enthusiast", qualityScore: 5, tags: "45-54 F", age: "45-54", gender: "Female", country: "United States" },
    { id: "11", tagline: "Health-Conscious Sparkling Water Enthusiast", qualityScore: 4, tags: "25-34 M", age: "25-34", gender: "Male", country: "United States" },
    { id: "8", tagline: "Sparkling Water Enthusiast Seeking Unique Flavors", qualityScore: 5, tags: "45-54 M", age: "45-54", gender: "Male", country: "United States" },
    { id: "7", tagline: "Health-Conscious Middle-Aged Man", qualityScore: 5, tags: "45-54 M", age: "45-54", gender: "Male", country: "United States" },
    { id: "6", tagline: "Active Metalhead Sparkling Water Enthusiast", qualityScore: 5, tags: "35-44 M", age: "35-44", gender: "Male", country: "United States" },
    { id: "4", tagline: "Daily Sparkling Water Drinker", qualityScore: 4, tags: "25-34 M", age: "25-34", gender: "Male", country: "United States" },
    { id: "3", tagline: "Health-Conscious Adventurer", qualityScore: 4, tags: "35-44 M", age: "35-44", gender: "Male", country: "United States" },
    { id: "2", tagline: "Sparkling Water Enthusiast", qualityScore: 5, tags: "45-54 F", age: "45-54", gender: "Female", country: "United States" },
    { id: "1", tagline: "Health-Conscious Middle-Aged Woman", qualityScore: 5, tags: "45-54 F", age: "45-54", gender: "Female", country: "United States" },
  ]
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Back Navigation */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Report Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
          {/* Logo */}
          <div className="text-center mb-12 animate-in fade-in-0 slide-in-from-top-4 duration-1000 delay-200">
            <div className="flex items-center justify-center space-x-4 mb-8">
              {/* Transmission/Signal icon */}
              <div className="w-12 h-12 bg-blue-600 rounded-xl items-center justify-center flex drop-shadow-lg hover:drop-shadow-xl transition-all duration-300">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
                  {/* Signal waves */}
                  <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" fill="currentColor"/>
                  <path d="M12 12m-4 0a4 4 0 0 1 8 0a4 4 0 0 1 -8 0" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M12 12m-7 0a7 7 0 0 1 14 0a7 7 0 0 1 -14 0" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M12 12m-10 0a10 10 0 0 1 20 0a10 10 0 0 1 -20 0" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6"/>
                </svg>
              </div>
              <span className="font-bold text-4xl text-gray-900 font-sans drop-shadow-lg">TRANZMIT</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-500">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight drop-shadow-lg">
            Sparkling Water Concept Test
          </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-medium drop-shadow-sm">
            Liquid Death vs. Spindrift
          </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto mt-8 shadow-lg"></div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="summary" className="w-full mb-16">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="summary">Summary Report</TabsTrigger>
              <TabsTrigger value="question-by-question">Question-by-Question</TabsTrigger>
              <TabsTrigger value="all-responses">All Responses</TabsTrigger>
            </TabsList>

            {/* Summary Tab */}
            <TabsContent value="summary" className="space-y-16">
          {/* Executive Summary */}
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-10 rounded-2xl border-l-6 border-primary mb-16 shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-700">
            <CollapsibleSection>
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-foreground mb-4 drop-shadow-md">Executive Summary</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-blue-600 mb-6 shadow-md"></div>
                <p className="text-xl text-muted-foreground leading-relaxed">
                This concept test aimed to understand consumer perceptions of two sparkling water brands, 
                Liquid Death and Spindrift, identifying key drivers of purchase interest and rejection, 
                and uncovering potential consumer segments and occasions. The study involved 101 consumers.
              </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-foreground mb-6 drop-shadow-sm">What We Learned</h3>
                <div className="bg-white/60 p-6 rounded-xl border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The most critical finding from this study is the <strong className="text-foreground font-semibold">complete lack of purchase conviction</strong> for both Liquid Death and Spindrift. 
                    Specifically, both brands registered <strong className="text-foreground font-semibold">0.0% Top 2 Box Purchase Intent</strong> (meaning no consumers indicated they would "definitely" or "probably" purchase) 
                    and, notably, <strong className="text-foreground font-semibold">0.0% Bottom 2 Box Rejection</strong> (meaning no consumers indicated they would "definitely not" or "probably not" purchase). 
                This suggests a widespread consumer ambivalence, with virtually all participants falling into the "might or might not purchase" category for both concepts.
              </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/60 p-6 rounded-xl border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h4 className="text-2xl font-bold text-foreground mb-4 flex items-center drop-shadow-sm">
                    <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full mr-3 shadow-md"></div>
                    Liquid Death
                  </h4>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">High Uniqueness, Extreme Polarization:</strong> Liquid Death stands out with a very high Uniqueness score (65.3% Top 2 Box). Its edgy, dark branding featuring skulls and phrases like "Murder Your Thirst" is highly polarizing.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Appeals to a Niche:</strong> Younger consumers found the branding unique, intriguing, "cool premium," and aesthetically pleasing, evoking excitement and a sense of rebellious style.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Major Brand Clarity Issues:</strong> A significant proportion of consumers were confused, mistaking Liquid Death for an alcoholic beverage or energy drink.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/60 p-6 rounded-xl border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h4 className="text-2xl font-bold text-foreground mb-4 flex items-center drop-shadow-sm">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-3 shadow-md"></div>
                    Spindrift
                  </h4>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Clear Health & Natural Appeal, Lower Uniqueness:</strong> Spindrift's primary appeal lies in its "real squeezed fruit" and "unsweetened" claims, which resonated strongly with health-conscious consumers.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Minor Identity Confusion:</strong> While less polarizing than Liquid Death, some consumers perceived Spindrift as a "kid's drink" due to its simplicity.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/60 p-6 rounded-xl border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center drop-shadow-sm">
                    <div className="w-4 h-4 bg-gradient-to-r from-primary to-blue-600 rounded mr-3 shadow-md"></div>
                    Objectives
                  </h3>
                  <ol className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                      <span>Understand perception differences between Liquid Death and Spindrift.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                      <span>Identify key drivers of purchase interest and rejection for each concept.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                      <span>Uncover potential consumer segments and occasions for each product.</span>
                    </li>
              </ol>
                </div>

                <div className="bg-white/60 p-6 rounded-xl border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center drop-shadow-sm">
                    <div className="w-4 h-4 bg-gradient-to-r from-primary to-blue-600 rounded mr-3 shadow-md"></div>
                    Approach
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                This study utilized a quantitative and qualitative concept testing approach with a total of 101 consumers. 
                Quantitative measures included Top 2 Box and Bottom 2 Box Purchase Intent, as well as Uniqueness scores for each brand. 
                These metrics were supplemented by qualitative feedback captured through open-ended questions and discussions.
              </p>
                </div>
              </div>
            </CollapsibleSection>
          </div>

          {/* Respondent Profile */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4 drop-shadow-lg">Respondent Profile & Consumption Habits</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto shadow-lg"></div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Sparkling Water Consumption Frequency</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
            The survey captured a diverse audience with varied sparkling water consumption habits...
          </p>
            </div>
          
          <ChartContainer
            src="/sample-report/charts/consumption_frequency.png"
            alt="Consumption Frequency Chart"
            legend={[
              { color: "#d65f79", label: "Never or Rarely" },
              { color: "#f2a7b8", label: "Occasionally" },
              { color: "#a9a9a9", label: "Regularly" },
              { color: "#7395c1", label: "Daily" }
            ]}
          />

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Demographic Snapshot</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
            The respondent base is entirely from the United States...
          </p>
            </div>
          
            <div className="grid gap-8">
          <ChartContainer src="/sample-report/charts/age_distribution.png" alt="Age Distribution" />
          <ChartContainer src="/sample-report/charts/gender_distribution.png" alt="Gender Distribution" />
          <ChartContainer src="/sample-report/charts/country_distribution.png" alt="Country Distribution" />
            </div>
          </div>

          {/* Head-to-Head Comparison */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4 drop-shadow-lg">Head-to-Head Concept Comparison</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto shadow-lg"></div>
            </div>
            <p className="text-lg text-muted-foreground mb-8 text-center max-w-4xl mx-auto leading-relaxed">
            When placed in direct comparison, Spindrift demonstrates significantly higher purchase intent...
          </p>
          
            <div className="grid gap-8">
          <ChartContainer
            src="/sample-report/charts/purchase_intent_comparison.png"
            alt="Purchase Intent Comparison"
            title="Purchase Intent"
          />
          
          <ChartContainer
            src="/sample-report/charts/uniqueness_comparison.png"
            alt="Uniqueness Comparison"
            title="Perceived Uniqueness"
          />
            </div>
          </div>

          {/* Liquid Death Analysis */}
          <div className="border-t-2 border-dashed border-border pt-16 mt-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4 drop-shadow-lg">Deep Dive Analysis: Liquid Death</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto shadow-lg"></div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-foreground mb-4">Initial Impressions & Brand Perception</h3>
              <div className="w-16 h-1 bg-red-500"></div>
            </div>
            <div className="bg-gradient-to-br from-red-50 via-red-100 to-red-50 p-8 rounded-xl border border-red-200 mb-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-3xl font-bold text-foreground mb-4 drop-shadow-sm">Analytical Summary of Initial Impressions: Liquid Death Sparkling Water</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
              This analysis synthesizes initial thoughts from ten open-ended responses regarding Liquid Death sparkling water. 
              The brand elicits strong, often polarizing, reactions, primarily driven by its highly distinctive branding and packaging strategy.
            </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Dominant Themes:</h3>
              <ol className="space-y-6 text-muted-foreground">
                <li className="flex items-start">
                  <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                  <span><strong className="text-foreground font-semibold">Striking, Edgy, and Attention-Grabbing Aesthetics:</strong> Nearly all respondents immediately recognized Liquid Death as unique and attention-grabbing. Terms like "eye-catching," "edgy," "unique design," "stands out," and "different" were common. The brand's visual identity is overwhelmingly successful in disrupting conventional sparkling water packaging.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                  <span><strong className="text-foreground font-semibold">Ambiguity in Product Category Perception:</strong> A significant theme is the brand's ability to blur lines between product categories. While it is sparkling water, many respondents initially mistook it for a "soft drink," "energy drink," or, most notably, an "alcoholic beverage" (beer or malt liquor) due to the can's size, design, fonts, and overall dark/sinister aesthetic.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                  <span><strong className="text-foreground font-semibold">Polarizing Appeal:</strong> The brand's "over-the-top" and "hostile" imagery is a double-edged sword. While some respondents are drawn to its unique and "sinister" aesthetic, others find it "too intense," "not friendly," and even off-putting, especially for certain demographics (e.g., children).</span>
                </li>
            </ol>
            </div>

            <div className="flex justify-center mb-6">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsLiquidDeathExpanded(!isLiquidDeathExpanded)}
                className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-500 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm"
              >
                {isLiquidDeathExpanded ? 'Show less' : 'Show more'}
              </Button>
            </div>

            <div className={`transition-all duration-500 ease-out overflow-hidden ${
              isLiquidDeathExpanded ? 'max-h-none' : 'max-h-0'
            }`}>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Key Aspects of Branding and Packaging that Stand Out:</h3>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong className="text-foreground font-semibold">Can Format & Size:</strong> The 19-ounce can is noted as "unique" and "distinctive" for sparkling water, often contributing to the perception of it being a soft drink or alcoholic beverage. The preference for cans over plastic bottles due to sustainability was also mentioned positively.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong className="text-foreground font-semibold">Logo and Imagery (The Skull):</strong> The melting skull imagery is a central, impactful element. It consistently registers as "intense," "sinister," and contributes significantly to the "edgy" vibe. For one respondent, it strongly triggered memories of past alcohol consumption.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong className="text-foreground font-semibold">Name ("Liquid Death") and Tagline ("Murder Your Thirst"):</strong> These elements are universally recognized as "unique," "powerful," "sinister," and "intriguing." They amplify the brand's aggressive and non-traditional persona, resonating with those who appreciate the aesthetic.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong className="text-foreground font-semibold">Color Palette and Tone:</strong> The "blacked out," "muted," and "darker side" appearance stands in stark contrast to the typically "fun and colorful" packaging of other sparkling water brands, making it "different" and easily identifiable on a shelf.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong className="text-foreground font-semibold">Target Audience Perception:</strong> Respondents believe the brand is designed to appeal to "younger individuals," "men," "alternative people," and those who "don't normally drink sparkling water," positioning it as an alternative to more "feminine" or benign sparkling water options.</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/60 p-6 rounded-xl border border-red-200">
                  <h4 className="text-xl font-bold text-foreground mb-4">Positive Reactions:</h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">High Attention Value:</strong> The brand is extremely effective at grabbing attention and being memorable.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Uniqueness and Differentiation:</strong> Many appreciate its departure from traditional sparkling water marketing, finding it "different from what I'm used to seeing."</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Aesthetic Appreciation:</strong> A segment of respondents genuinely "like the aesthetic," "the whole concept," and find the design "beautiful" or "cool."</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Perceived Taste/Experience:</strong> Those who have consumed Liquid Death describe the taste positively, noting "more flavor and energy," "very good," and effective hydration.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Sustainability:</strong> The use of cans is seen as a more sustainable option than plastic bottles.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Purchase Inclination:</strong> For some, the distinctive appearance and edgy appeal make them "more inclined to purchase."</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/60 p-6 rounded-xl border border-red-200">
                  <h4 className="text-xl font-bold text-foreground mb-4">Negative and Mixed Reactions:</h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Confusing / "Edgy for Edginess' Sake":</strong> Some respondents don't "get it" or feel the edginess is gratuitous, even if it's eye-catching.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Misleading or Off-Putting Association with Alcohol:</strong> The strong resemblance to beer/malt liquor can be problematic, particularly for individuals with a history of alcohol abuse, triggering uncomfortable memories.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Perceived as "Too Intense" or "Hostile":</strong> The imagery and naming convey a sense of aggression that some find unappealing, especially those looking for a "refreshing" or "friendly" beverage. Concerns were also raised about its suitability for children.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Lack of Traditional "Refreshing Vibe":</strong> The brand's intense aesthetic does not align with the "effervescent, refreshing vibe" typically associated with sparkling water.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Potential Misinformation:</strong> Some respondents wondered if it contained caffeine or other non-benign ingredients, indicating a lack of clarity about the actual product beneath the intense branding.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Lack of Personal Purchase Intent:</strong> Some acknowledged its attention-grabbing power but stated it wouldn't make them personally want to buy it.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/60 p-6 rounded-xl border border-blue-200">
                <h3 className="text-2xl font-bold text-foreground mb-4">Conclusion:</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Liquid Death sparkling water masterfully leverages provocative branding and packaging to create an undeniably memorable and distinctive product. Its "edgy" aesthetic, spearheaded by the skull imagery, unique name, and dark color palette, successfully differentiates it from the competitive landscape and resonates strongly with a specific alternative demographic.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  However, this bold approach also presents challenges: it can create ambiguity around the product category, trigger negative associations (especially with alcohol), and alienate consumers seeking a more traditional, "friendly," or "refreshing" sparkling water experience. Despite these potential pitfalls, the brand's high recognition and the positive feedback from those who have tried it suggest a successful strategy in carving out a unique and profitable niche in the beverage market.
                </p>
              </div>
            </div>

            <div className="mb-8 mt-16">
              <h3 className="text-3xl font-bold text-foreground mb-4">Consumption Occasions</h3>
              <div className="w-16 h-1 bg-red-500"></div>
            </div>
            <CollapsibleSection>
              <div className="bg-gradient-to-br from-red-50 via-red-100 to-red-50 p-6 rounded-xl border border-red-200 mb-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Consumers primarily envision Liquid Death for <strong className="text-foreground font-semibold">occasional or situational consumption</strong>, rather than as an everyday staple for daily hydration. 
                  Many are inclined to try it impulsively out of curiosity or if conveniently available, with <strong className="text-foreground font-semibold">social gatherings and parties</strong> representing a notable specific use case.
                </p>
              </div>
            </CollapsibleSection>
            
            <ChartContainer src="/sample-report/charts/ld_occasions.png" alt="Liquid Death Occasions" />

            <div className="mb-8">
              <h3 className="text-3xl font-bold text-foreground mb-4">The Liquid Death Drinker Persona</h3>
              <div className="w-16 h-1 bg-red-500"></div>
            </div>
            <CollapsibleSection>
              <div className="bg-red-50 p-8 rounded-xl border border-red-200 mb-6">
                <h2 className="text-3xl font-bold text-foreground mb-4">Liquid Death Drinker Persona: The "Edgy, Health-Conscious Challenger"</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                Based on the sample responses, the typical Liquid Death sparkling water consumer is perceived as an individual who balances a desire for personal wellness with a strong need for unique self-expression and anti-establishment branding.
              </p>
              </div>
              
              <div className="space-y-8">
                <div className="bg-white/60 p-6 rounded-xl border border-red-200">
                  <h4 className="text-2xl font-bold text-foreground mb-4">Perceived Demographics:</h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Age:</strong> Primarily young, ranging from <strong className="text-foreground font-semibold">late adolescents to early twenties</strong> (approx. 15-25 years old). Terms like "younger males," "late adolescents," and "early twenties" were frequently used. There's a clear sense that the brand "ages out" after about 25.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Gender:</strong> Leans heavily towards <strong className="text-foreground font-semibold">males</strong>, with specific mentions of "younger males" being attracted to the design.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Niche:</strong> While primarily young, some respondents also vaguely mentioned "older people" potentially drinking it for perceived energy, though this is a less dominant and likely misinformed perception.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/60 p-6 rounded-xl border border-red-200">
                  <h4 className="text-2xl font-bold text-foreground mb-4">Lifestyle:</h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Active & Social:</strong> This individual is often engaged in active pursuits such as <strong className="text-foreground font-semibold">working out or sports</strong>, implying a need for hydration and potentially an "energy boost" (even if misattributed). They may also be social and consume alcohol, seeking rehydration.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Subcultural Alignment:</strong> They are associated with distinct subcultures like <strong className="text-foreground font-semibold">skaters and bikers</strong>, indicating a preference for alternative scenes and a non-mainstream identity.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Trend-Aware:</strong> They are attuned to popular and edgy brands, using their purchases to reflect their personal style and group affiliation.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/60 p-6 rounded-xl border border-red-200">
                  <h4 className="text-2xl font-bold text-foreground mb-4">Values:</h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Health & Wellness:</strong> Despite the rebellious branding, a core value is <strong className="text-foreground font-semibold">health-consciousness</strong>. They care about "what they're putting in their bodies" and view sparkling water as a healthier alternative to sugary drinks. They appreciate the unflavored aspect of sparkling water as a pure hydration choice.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Individuality & Authenticity:</strong> They highly value standing out from the crowd and embrace brands that help them project a unique, non-conformist image. They seek out "edgy or popular" brands that are "something that would stand out."</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Rebellion:</strong> There's an underlying value for challenging norms and an attraction to provocative aesthetics, as evidenced by associations with "Satan" or "evil" as an extreme form of edginess.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/60 p-6 rounded-xl border border-red-200">
                  <h4 className="text-2xl font-bold text-foreground mb-4">Attitudes:</h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Image-Conscious & Brand-Driven:</strong> This consumer is significantly influenced by a brand's visual identity and message. They are drawn to Liquid Death's "design of the can" and provocative name, viewing it as a tool for self-expression. They want their beverage choice to make a statement.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Non-Conformist:</strong> They actively seek brands that they consider "edgy" or that "would stand out," implicitly rejecting mainstream or "boring" options. There's a perception that drinking Liquid Death after a certain age might appear "too eager."</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Seeking Invigoration (Misconception):</strong> A notable perception among some respondents is that Liquid Death provides an "energy boost" or contains "chemicals that keep them energized," suggesting a desire for high energy or performance enhancement, despite it being plain sparkling water.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Potentially Fickle:</strong> While drawn to the brand's initial shock value and popularity, there's a suggestion that for some, particularly those consuming it "ironically," their patronage might be a "phase" and not necessarily long-term, highlighting a need for sustained brand relevance beyond initial intrigue.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                  <p className="text-lg text-muted-foreground leading-relaxed font-semibold">
                    <strong className="text-foreground">In summary, the Liquid Death drinker is an individual who is authentically health-conscious but expresses this wellness through a rebellious, anti-establishment lens. They use their brand choices, particularly bold and unconventional ones like Liquid Death, to project an edgy and distinct personal identity within their active and trend-aware social circles.</strong>
                  </p>
                </div>
              </div>
            </CollapsibleSection>
          </div>

          {/* Spindrift Analysis */}
          <div className="border-t-4 border-solid border-black pt-16 mt-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4 drop-shadow-lg">Deep Dive Analysis: Spindrift Lime</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto shadow-lg"></div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-foreground mb-4">Initial Impressions & Brand Perception</h3>
              <div className="w-16 h-1 bg-green-500"></div>
            </div>
            <div className="bg-gradient-to-br from-green-50 via-green-100 to-green-50 p-8 rounded-xl border border-green-200 mb-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-3xl font-bold text-foreground mb-4 drop-shadow-sm">Analytical Summary of Initial Consumer Impressions on Spindrift Sparkling Water</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
              This analysis synthesizes initial thoughts from 10 open-ended consumer responses regarding Spindrift sparkling water, 
              focusing on dominant themes, positive and negative reactions, and key aspects of branding and packaging.
            </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Dominant Themes:</h3>
              <ol className="space-y-6 text-muted-foreground">
                <li className="flex items-start">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                  <span><strong className="text-foreground font-semibold">"Real Squeezed Fruit" as a Key Differentiator:</strong> This claim emerged as the most significant and frequently mentioned positive attribute. Consumers overwhelmingly associate "real squeezed fruit" with naturalness, health, and an expectation of superior, authentic flavor compared to artificial or even "natural" flavorings found in other sparkling waters. It generates strong appeal and a perception of a healthier, more wholesome product.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                  <span><strong className="text-foreground font-semibold">Unsweetened Appeal & Health Consciousness:</strong> The "unsweetened" aspect resonates strongly with a health-conscious audience actively seeking to reduce sugar intake and avoid artificial sweeteners. This aligns with a broader desire for healthy hydration, a substitute for soda, and an overall preference for natural products.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                  <span><strong className="text-foreground font-semibold">Naturalness and Authenticity:</strong> Both "real squeezed fruit" and "unsweetened" contribute to a powerful perception of naturalness and authenticity, which is a significant driver for trial and potential purchase.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">4</span>
                  <span><strong className="text-foreground font-semibold">Flavor (Specifically Lime):</strong> While lime is a common and often liked flavor, reactions are mixed. Some express a strong preference for lime, while others find it too common or express concern about potential bitterness due to the "unsweetened" nature of real lime.</span>
                </li>
              </ol>
            </div>

            <div className="flex justify-center mb-6">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsSpindriftExpanded(!isSpindriftExpanded)}
                className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-500 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm"
              >
                {isSpindriftExpanded ? 'Show less' : 'Show more'}
              </Button>
            </div>

            <div className={`transition-all duration-500 ease-out overflow-hidden ${
              isSpindriftExpanded ? 'max-h-none' : 'max-h-0'
            }`}>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/60 p-6 rounded-xl border border-green-200">
                  <h4 className="text-xl font-bold text-foreground mb-4">Positive Reactions:</h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Natural & Healthy Positioning:</strong> The combination of "real squeezed fruit" and "unsweetened" creates a compelling health-focused narrative. Consumers appreciate the absence of sugar and artificial ingredients, viewing Spindrift as a superior, healthier alternative to other beverages.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Taste Expectation:</strong> Many anticipate a good taste, believing "real squeezed fruit" will deliver a more authentic and refreshing flavor experience.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Branding & Aesthetics:</strong> The branding is generally perceived as "beautiful," "appealing to the eyes," and "nice and colorful." The green and white color scheme, lime imagery, and overall aesthetic contribute to a perception of higher quality compared to traditional sodas and fit well within the sparkling water category.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Likelihood to Try/Buy:</strong> A significant number of respondents expressed a clear interest in trying or buying the product, largely driven by the "real squeezed fruit" and "unsweetened" claims.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Hydration Aid:</strong> The concept of a flavorful sparkling water is seen as an effective way to increase daily water intake, particularly for those seeking enjoyable healthy beverages.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">"Alcoholic Beverage" Intrigue:</strong> One respondent initially perceived the packaging as resembling a canned alcoholic (margarita-type) drink, which, surprisingly, drew them to the product due to a preference for such tropical beverages.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/60 p-6 rounded-xl border border-green-200">
                  <h4 className="text-xl font-bold text-foreground mb-4">Negative Reactions & Concerns:</h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Skepticism about "Real Squeezed Fruit" Claims:</strong> A notable concern revolves around the authenticity of the "real squeezed fruit" claim in a mass-produced beverage. Some question how much real fruit could genuinely be in each can or if it's merely a "drop," perceiving the claim as "overblown" or unrealistic.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Potential Bitterness:</strong> The combination of "unsweetened" and "lime" raises concerns for some about the potential for a bitter taste, drawing comparisons to unsweetened lime juice. This highlights a tension between the health benefit of "unsweetened" and the desired taste profile.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Lack of Uniqueness (Flavor & Category):</strong> Several respondents feel that "flavored sparkling water" in general, and lime specifically, is not a unique product. They cite the prevalence of other brands and the commonality of lemon/lime as flavorings (e.g., in restaurant water). Suggestions for more unique flavors like mango, grapefruit, or blackberry were offered.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Packaging Format (Can vs. Bottle):</strong> While the can's aesthetics are appreciated, one respondent expressed a strong preference for glass bottles, citing a more "authentic," "smooth" drinking experience and the ritual of opening a bottle as superior to a can.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Key Aspects of Branding and Packaging:</h3>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong className="text-foreground font-semibold">Visual Appeal:</strong> The packaging is consistently described as "beautiful," "appealing," and "colorful." The green and white color palette is noted for blending well, and the imagery of the lime is effective in communicating flavor.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong className="text-foreground font-semibold">Category Fit:</strong> The design successfully communicates "sparkling water" without confusion with soda, giving it a "higher quality" perception than traditional soft drinks.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong className="text-foreground font-semibold">Informative Labeling:</strong> The clear indication of "lime flavor," "real squeezed fruit," and "unsweetened" are highly valued for immediately conveying key product benefits.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong className="text-foreground font-semibold">Brand Name:</strong> The name "Spindrift" was positively received by at least one respondent.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/60 p-6 rounded-xl border border-blue-200">
                <h3 className="text-2xl font-bold text-foreground mb-4">Conclusion:</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Spindrift's initial impressions are overwhelmingly positive, driven by its strong positioning around <strong className="text-foreground font-semibold">"real squeezed fruit" and "unsweetened" content</strong>, which resonate powerfully with health-conscious consumers seeking natural, authentic beverages. The brand's aesthetic and clear communication of these benefits are also significant strengths.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  However, opportunities for improvement or further messaging exist:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground font-semibold">Managing "Real Squeezed Fruit" Expectations:</strong> The brand could consider messaging that addresses consumer skepticism regarding the authenticity and quantity of real fruit in a mass-produced product, perhaps by highlighting the actual fruit content or process.</li>
                  <li><strong className="text-foreground font-semibold">Addressing Flavor Concerns:</strong> While lime is popular, exploring and promoting more unique flavors could address perceptions of commonality and expand appeal. Additionally, transparent communication about the taste profile of unsweetened real lime could manage expectations regarding bitterness.</li>
                  <li><strong className="text-foreground font-semibold">Packaging Preferences:</strong> While the can is generally well-received, recognizing the niche preference for glass bottles might inform future product lines or marketing.</li>
              </ol>
                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  Overall, Spindrift appears to have successfully tapped into a core consumer desire for healthier, natural, and transparent beverage options, with its "real squeezed fruit" and "unsweetened" claims serving as powerful drawcards.
                </p>
              </div>
            </div>

            <div className="mb-8 mt-16">
              <h3 className="text-3xl font-bold text-foreground mb-4">Consumption Occasions</h3>
              <div className="w-16 h-1 bg-green-500"></div>
            </div>
            <CollapsibleSection>
              <div className="bg-gradient-to-br from-green-50 via-green-100 to-green-50 p-6 rounded-xl border border-green-200 mb-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Spindrift sparkling water is primarily envisioned by consumers as a regular staple for <strong className="text-foreground font-semibold">everyday hydration and consistent, daily consumption</strong>. 
                  Beyond these routine uses, it serves as a popular choice for specific leisure and social occasions, prominently featuring as a refreshing accompaniment during <strong className="text-foreground font-semibold">meals</strong>, 
                  an ideal beverage for <strong className="text-foreground font-semibold">outdoor activities</strong>, and a crisp option for <strong className="text-foreground font-semibold">social gatherings</strong> or personal <strong className="text-foreground font-semibold">relaxation time</strong>.
                </p>
              </div>
            </CollapsibleSection>
            
            <ChartContainer src="/sample-report/charts/sd_occasions.png" alt="Spindrift Occasions" />

            <div className="mb-8">
              <h3 className="text-3xl font-bold text-foreground mb-4">The Spindrift Drinker Persona</h3>
              <div className="w-16 h-1 bg-green-500"></div>
            </div>
            <CollapsibleSection>
              <div className="bg-green-50 p-8 rounded-xl border border-green-200 mb-6">
                <h2 className="text-3xl font-bold text-foreground mb-4">Spindrift Drinker Persona: The Conscientious, Balanced Refresher</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                This persona represents an individual who is discerning about their beverage choices, seeking a harmonious blend of health, taste, and everyday refreshment.
              </p>
              </div>
              
              <div className="space-y-8">
                <div className="bg-white/60 p-6 rounded-xl border border-green-200">
                  <h4 className="text-2xl font-bold text-foreground mb-4">Demographics:</h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Age:</strong> Primarily spans <strong className="text-foreground font-semibold">late twenties to late fifties</strong>, with a strong emphasis on the <strong className="text-foreground font-semibold">30-50 age range</strong>. While some responses mention "teenagers" or "young people," the core demographic leans towards a more mature consumer.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Gender:</strong> Skews <strong className="text-foreground font-semibold">female</strong>, frequently described as a "mom" or someone in the "women, late twenties to late fifties" age bracket. However, the appeal is not exclusively limited to women, with mentions of "men and women" and "anybody."</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Socio-economic Status:</strong> Predominantly <strong className="text-foreground font-semibold">middle to upper-middle class</strong>. This consumer has "extra income to afford this type of product over drinking plain water," indicating a capacity and willingness to pay a premium for a preferred beverage.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/60 p-6 rounded-xl border border-green-200">
                  <h4 className="text-2xl font-bold text-foreground mb-4">Lifestyle:</h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Balanced & Everyday:</strong> This individual leads a generally "laid back and chill" yet often active lifestyle. Spindrift fits seamlessly into various daily routines, from "men and women in the office" to "players on the ball field," or simply as an "everyday kind of person" at home.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Health-Conscious but Indulgent:</strong> They are actively seeking healthier alternatives to traditional sugary sodas and plain water. They view Spindrift as a "clean and refreshing" option, a "little treat sometimes" that aligns with their wellness goals without feeling like a compromise.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Regular Sparkling Water Consumer:</strong> They are likely already buying sparkling water on a regular basis and are open to trying new brands that catch their eye.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/60 p-6 rounded-xl border border-green-200">
                  <h4 className="text-2xl font-bold text-foreground mb-4">Values:</h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Natural & Clean Ingredients:</strong> A paramount value. The persona prioritizes "more natural ingredients" and beverages that are "clean and refreshing without too much sugar." This directly addresses their desire to avoid artificiality found in many soft drinks.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Quality & Refinement:</strong> There's an appreciation for a "classy" product and an understanding that they are paying for a higher-quality option compared to plain water.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Taste Experience:</strong> While health-conscious, they deeply value taste, specifically enjoying the "carbonation taste" and "milder tastes" that are distinct from overly sweet sodas.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/60 p-6 rounded-xl border border-green-200">
                  <h4 className="text-2xl font-bold text-foreground mb-4">Attitudes:</h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Discerning & Deliberate:</strong> This consumer makes conscious choices about what they consume, actively avoiding soft drinks and seeking out beverages that support their well-being.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Open-Minded & Exploratory:</strong> They are not rigidly loyal to one brand but are open to trying new products like Spindrift and adding them to their "rotation" if they meet their expectations.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="text-foreground font-semibold">Relaxed & Appreciative:</strong> They embody a "relaxed attitude" and appreciate the simple pleasure of a well-crafted, refreshing drink that offers a subtle yet satisfying flavor profile.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <p className="text-lg text-muted-foreground leading-relaxed font-semibold">
                    <strong className="text-foreground">In summary, the typical Spindrift drinker is a health-aware, middle to upper-middle-class individual, often female and aged 30-50, who actively seeks natural, refreshing, and subtly flavorful carbonated beverages as a superior alternative to sugary sodas. They value quality and are willing to invest in products that align with their balanced, discerning lifestyle.</strong>
                  </p>
                </div>
              </div>
            </CollapsibleSection>
          </div>

          {/* Conclusion */}
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-12 rounded-2xl border-l-6 border-primary mt-16 shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-foreground mb-4 drop-shadow-lg">Concluding Synthesis & Strategic Recommendations</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto shadow-lg"></div>
            </div>
            <div className="bg-white/60 p-8 rounded-xl border border-blue-200 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-xl text-muted-foreground leading-relaxed">
                The market research clearly delineates Liquid Death and Spindrift as two brands operating at opposite ends of the sparkling water spectrum, 
                each having effectively cultivated a distinct identity and loyal following. Liquid Death has masterfully carved out a fiercely loyal niche by embracing a polarizing, 
                counter-culture identity, resonating deeply with a younger, male-leaning demographic seeking social signaling and an edgy alcohol alternative for high-energy social events.
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-foreground mb-6 text-center drop-shadow-md">Strategic Recommendations</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto shadow-md"></div>
            </div>
            
            <CollapsibleSection>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/60 p-6 rounded-xl border border-red-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h4 className="text-2xl font-bold text-foreground mb-4 flex items-center drop-shadow-sm">
                    <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full mr-3 shadow-md"></div>
                    For Liquid Death
                  </h4>
                  <ol className="space-y-4 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                      <span><strong className="text-foreground font-semibold">Deepen Niche Dominance & Cultivate Exclusivity:</strong> Instead of attempting to dilute its identity for broader appeal, Liquid Death should double down on its counter-culture roots.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                      <span><strong className="text-foreground font-semibold">Amplify "Alcohol Alternative" & Extend Occasion Messaging:</strong> Systematically partner with venues, bars, and event organizers to position Liquid Death as the premium, non-alcoholic choice for adult social settings.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                      <span><strong className="text-foreground font-semibold">Strategic Brand Extensions (Carefully Curated):</strong> Consider very carefully branded, limited-run line extensions that target adjacent functional needs without compromising the main identity.</span>
                    </li>
                  </ol>
                </div>
                
                <div className="bg-white/60 p-6 rounded-xl border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h4 className="text-2xl font-bold text-foreground mb-4 flex items-center drop-shadow-sm">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-3 shadow-md"></div>
                    For Spindrift
                  </h4>
                  <ol className="space-y-4 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                      <span><strong className="text-foreground font-semibold">Elevate the "Real Fruit" Narrative & Expand Flavor Innovation:</strong> Aggressively market the unique "real squeezed fruit" proposition as a superior taste and health benefit compared to competitors.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                      <span><strong className="text-foreground font-semibold">Define a Distinctive Lifestyle Integration & Usage Occasions:</strong> Move beyond generic "health-conscious" positioning and articulate a clearer, aspirational lifestyle around Spindrift.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                      <span><strong className="text-foreground font-semibold">Targeted Digital Storytelling & Community Building:</strong> Leverage social media platforms popular with millennials and women to tell compelling visual stories about the sourcing of real fruit.</span>
                    </li>
                  </ol>
                </div>
              </div>
            </CollapsibleSection>
          </div>
            </TabsContent>

            {/* Question-by-Question Tab */}
            <TabsContent value="question-by-question" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-foreground mb-4 drop-shadow-lg">Question-by-Question Analysis</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto shadow-lg"></div>
                <p className="text-lg text-muted-foreground mt-6">
                  Detailed breakdown of each survey question with visualizations
                </p>
              </div>

              {/* Demographics Section */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl border border-slate-200 mb-12">
                <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full mr-4"></div>
                  Demographics & Background
                </h3>
                
                {/* Consumption Frequency */}
                <div className="mb-12">
                  <h4 className="text-2xl font-semibold text-foreground mb-3">Q2: How often do you drink sparkling water?</h4>
                  <p className="text-lg font-semibold text-foreground mb-6">Understanding baseline consumption habits of our respondents</p>
                  <ChartContainer
                    src="/sample-report/charts/consumption_frequency.png"
                    alt="Consumption Frequency"
                    legend={[
                      { color: "#d65f79", label: "Never or Rarely" },
                      { color: "#f2a7b8", label: "Occasionally" },
                      { color: "#a9a9a9", label: "Regularly" },
                      { color: "#7395c1", label: "Daily" }
                    ]}
                  />
                </div>

                {/* Age Distribution */}
                <div className="mb-12">
                  <h4 className="text-2xl font-semibold text-foreground mb-3">Q3: What is your age?</h4>
                  <p className="text-lg font-semibold text-foreground mb-6">Age distribution across survey participants</p>
                  <ChartContainer src="/sample-report/charts/age_distribution.png" alt="Age Distribution" />
                </div>

                {/* Gender Distribution */}
                <div className="mb-12">
                  <h4 className="text-2xl font-semibold text-foreground mb-3">Q4: What is your gender?</h4>
                  <p className="text-lg font-semibold text-foreground mb-6">Gender breakdown of respondents</p>
                  <ChartContainer src="/sample-report/charts/gender_distribution.png" alt="Gender Distribution" />
                </div>

                {/* Country Distribution */}
                <div>
                  <h4 className="text-2xl font-semibold text-foreground mb-3">Q5: Country Distribution</h4>
                  <p className="text-lg font-semibold text-foreground mb-6">Geographic location of survey participants</p>
                  <ChartContainer src="/sample-report/charts/country_distribution.png" alt="Country Distribution" />
                </div>
              </div>

              {/* Liquid Death Analysis Section */}
              <div className="bg-gradient-to-br from-red-50 to-rose-100 p-8 rounded-xl border-l-4 border-red-500 mb-12 shadow-lg">
                <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full mr-4"></div>
                  Liquid Death Analysis
                </h3>

                {/* Purchase Intent */}
                <div className="mb-12">
                  <h4 className="text-2xl font-semibold text-foreground mb-3">Q6: Purchase Interest</h4>
                  <p className="text-lg font-semibold text-foreground mb-6">
                    Which of the following best describes your interest in buying Liquid Death sparkling water?
                  </p>
                  <div className="bg-white/60 p-6 rounded-lg">
                    <ChartContainer src="/sample-report/charts/purchase_intent_comparison.png" alt="Liquid Death Purchase Intent" />
                  </div>
                </div>

                {/* Uniqueness */}
                <div className="mb-12">
                  <h4 className="text-2xl font-semibold text-foreground mb-3">Q7: Perceived Uniqueness</h4>
                  <p className="text-lg font-semibold text-foreground mb-6">
                    How unique or different is Liquid Death compared to other sparkling waters?
                  </p>
                  <div className="bg-white/60 p-6 rounded-lg">
                    <ChartContainer src="/sample-report/charts/uniqueness_comparison.png" alt="Liquid Death Uniqueness" />
                  </div>
                </div>

                {/* Occasions */}
                <div>
                  <h4 className="text-2xl font-semibold text-foreground mb-3">Q8: Consumption Occasions</h4>
                  <p className="text-lg font-semibold text-foreground mb-6">
                    For which occasions would you buy or drink Liquid Death?
                  </p>
                  <div className="bg-white/60 p-6 rounded-lg">
                    <ChartContainer src="/sample-report/charts/ld_occasions.png" alt="Liquid Death Occasions" />
                  </div>
                </div>
              </div>

              {/* Spindrift Analysis Section */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-xl border-l-4 border-green-500 mb-12 shadow-lg">
                <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-4"></div>
                  Spindrift Analysis
                </h3>

                {/* Purchase Intent */}
                <div className="mb-12">
                  <h4 className="text-2xl font-semibold text-foreground mb-3">Q9: Purchase Interest</h4>
                  <p className="text-lg font-semibold text-foreground mb-6">
                    Which of the following best describes your interest in buying Spindrift sparkling water?
                  </p>
                  <div className="bg-white/60 p-6 rounded-lg">
                    <ChartContainer src="/sample-report/charts/purchase_intent_comparison.png" alt="Spindrift Purchase Intent" />
                  </div>
                </div>

                {/* Uniqueness */}
                <div className="mb-12">
                  <h4 className="text-2xl font-semibold text-foreground mb-3">Q10: Perceived Uniqueness</h4>
                  <p className="text-lg font-semibold text-foreground mb-6">
                    How unique or different is Spindrift compared to other sparkling waters?
                  </p>
                  <div className="bg-white/60 p-6 rounded-lg">
                    <ChartContainer src="/sample-report/charts/uniqueness_comparison.png" alt="Spindrift Uniqueness" />
                  </div>
                </div>

                {/* Occasions */}
                <div>
                  <h4 className="text-2xl font-semibold text-foreground mb-3">Q11: Consumption Occasions</h4>
                  <p className="text-lg font-semibold text-foreground mb-6">
                    For which occasions would you buy or drink Spindrift?
                  </p>
                  <div className="bg-white/60 p-6 rounded-lg">
                    <ChartContainer src="/sample-report/charts/sd_occasions.png" alt="Spindrift Occasions" />
                  </div>
                </div>
              </div>

              {/* Summary Note */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <p className="text-center text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> All charts are based on responses from {respondents.length} qualified survey participants.
                  Additional qualitative data and open-ended responses are analyzed in the Summary Report tab.
                </p>
              </div>
            </TabsContent>

            {/* All Responses Tab */}
            <TabsContent value="all-responses" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-foreground mb-4 drop-shadow-lg">All Responses</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto shadow-lg"></div>
                <p className="text-lg text-muted-foreground mt-6">
                  Complete list of survey respondents and their demographic information
                </p>
              </div>

              <div className="bg-white rounded-xl border border-border shadow-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <TableHead className="font-bold">ID</TableHead>
                      <TableHead className="font-bold">Tagline</TableHead>
                      <TableHead className="font-bold">Quality Score</TableHead>
                      <TableHead className="font-bold">Tags</TableHead>
                      <TableHead className="font-bold">Age</TableHead>
                      <TableHead className="font-bold">Gender</TableHead>
                      <TableHead className="font-bold">Country</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {respondents.map((respondent) => (
                      <TableRow key={respondent.id}>
                        <TableCell className="font-medium">{respondent.id}</TableCell>
                        <TableCell>{respondent.tagline}</TableCell>
                        <TableCell>{respondent.qualityScore}</TableCell>
                        <TableCell>{respondent.tags}</TableCell>
                        <TableCell>{respondent.age}</TableCell>
                        <TableCell>{respondent.gender}</TableCell>
                        <TableCell>{respondent.country}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-8 rounded-xl border border-blue-200 mt-8">
                <p className="text-sm text-muted-foreground text-center">
                  This table shows a sample of {respondents.length} respondents from the survey. 
                  The complete dataset includes detailed responses to all survey questions.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <div className="mt-24"></div>
      <Footer />
    </div>
  )
}
