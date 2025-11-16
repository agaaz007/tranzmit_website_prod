"use client"

import { useState, useEffect } from "react"
import type { ReactNode } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CollapsibleSection } from "@/components/sample-report/collapsible-section"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Script from "next/script"

const PremiumCard = ({
  children,
  className = "",
  glowClass = "bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_65%)]",
  innerClassName = "p-8 sm:p-10 space-y-6",
}: {
  children: ReactNode
  className?: string
  glowClass?: string
  innerClassName?: string
}) => (
  <div className={`relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl ${className}`}>
    <div className={`absolute inset-0 ${glowClass}`}></div>
    <div className={`relative ${innerClassName}`}>{children}</div>
  </div>
)

const DeepDiveCard = ({
  children,
  className = "",
  glowClass = "bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_65%)]",
}: {
  children: ReactNode
  className?: string
  glowClass?: string
}) => (
  <PremiumCard className={`mb-12 ${className}`} glowClass={glowClass} innerClassName="p-8 sm:p-10 space-y-6">
    {children}
  </PremiumCard>
)

declare global {
  interface Window {
    Plotly: any;
  }
}

export default function InnerwearReportPage() {
  const [showMoreBrandLandscape, setShowMoreBrandLandscape] = useState(false)
  const [showMoreBrandPerception, setShowMoreBrandPerception] = useState(false)
  const [showMoreProductLifecycle, setShowMoreProductLifecycle] = useState(false)
  const [showMoreConceptTest, setShowMoreConceptTest] = useState(false)
  const [plotlyLoaded, setPlotlyLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("summary")
  const [scrollProgress, setScrollProgress] = useState(0)
  
  // Respondent data from the innerwear survey
  const respondents = [
    { id: "1", age: "22", gender: "Male", primaryBrand: "Jockey", topWords: "Comfortable, Long-Lasting", reasonForRank: "", persistentIssue: "The cotton material starts to get looser and the elastic starts to get loose.", conceptReaction: "Skeptical" },
    { id: "2", age: "18", gender: "Male", primaryBrand: "Marks & Spencer", topWords: "Comfort, Fabric, Price", reasonForRank: "", persistentIssue: "No nothing yet", conceptReaction: "Skeptical" },
    { id: "3", age: "19", gender: "Female", primaryBrand: "Enamor", topWords: "Comfortable, Colors", reasonForRank: "", persistentIssue: "They don't last very long", conceptReaction: "Skeptical" },
    { id: "4", age: "20", gender: "Male", primaryBrand: "Jockey", topWords: "Durable, Comfortable, Appealing", reasonForRank: "", persistentIssue: "They become loose.", conceptReaction: "Interested / Willing to Try" },
    { id: "5", age: "22", gender: "Female", primaryBrand: "Jockey", topWords: "Comfortable, Cheap, Accessible", reasonForRank: "", persistentIssue: "Their elastics wear out, but the user believes this is normal for all elastics after a while.", conceptReaction: "Skeptical" },
    { id: "6", age: "21", gender: "Male", primaryBrand: "Jockey", topWords: "Comfort, Fit, Relaxation", reasonForRank: "", persistentIssue: "They shrink on subsequent washes, the fabric becomes rough, and they stop fitting well.", conceptReaction: "Skeptical" },
    { id: "7", age: "22", gender: "Male", primaryBrand: "Jockey", topWords: "Comfort, Cotton, Freedom", reasonForRank: "", persistentIssue: "", conceptReaction: "Skeptical" },
    { id: "8", age: "20", gender: "Male", primaryBrand: "Calvin Klein", topWords: "Brand Identity, Comfort, The Designs", reasonForRank: "", persistentIssue: "Socks start stinking after some time.", conceptReaction: "Skeptical" },
    { id: "9", age: "22", gender: "Female", primaryBrand: "Jockey", topWords: "Comfort, Affordable, Stylish", reasonForRank: "", persistentIssue: "User could not think of any issues.", conceptReaction: "Interested / Willing to Try" },
    { id: "10", age: "20", gender: "Male", primaryBrand: "Jockey", topWords: "Innerwear, Outerwear, Sportswear", reasonForRank: "", persistentIssue: "", conceptReaction: "Skeptical" },
    { id: "11", age: "20", gender: "Male", primaryBrand: "Jockey", topWords: "Comfortable, Soft", reasonForRank: "", persistentIssue: "Not very comfortable in general during extreme heat.", conceptReaction: "Skeptical" },
    { id: "12", age: "22", gender: "Male", primaryBrand: "Jockey", topWords: "Comfort, Popularity, Design", reasonForRank: "", persistentIssue: "No, I don't think so. No, there is no issue.", conceptReaction: "Interested / Willing to Try" },
    { id: "13", age: "28", gender: "Male", primaryBrand: "Unbranded/Local", topWords: "Reputation, Logo, Colour Palette", reasonForRank: "", persistentIssue: "", conceptReaction: "Skeptical" },
    { id: "14", age: "21", gender: "Male", primaryBrand: "Jockey", topWords: "Softness", reasonForRank: "", persistentIssue: "It gets a little hot in there.", conceptReaction: "Skeptical" },
    { id: "15", age: "22", gender: "Male", primaryBrand: "Jockey", topWords: "Comfort, Stylish, Elegant", reasonForRank: "", persistentIssue: "", conceptReaction: "Interested / Willing to Try" },
    { id: "16", age: "21", gender: "Male", primaryBrand: "Jockey", topWords: "Comfortable, Reliable, Long Life", reasonForRank: "", persistentIssue: "No issues.", conceptReaction: "Interested / Willing to Try" },
    { id: "17", age: "22", gender: "Female", primaryBrand: "Uniqlo", topWords: "Quality", reasonForRank: "", persistentIssue: "", conceptReaction: "Skeptical" },
    { id: "18", age: "22", gender: "Male", primaryBrand: "Calvin Klein", topWords: "Comfortable, Soft, Excellent", reasonForRank: "", persistentIssue: "The fabric gets ruined after multiple washes.", conceptReaction: "Skeptical" },
    { id: "19", age: "22", gender: "Male", primaryBrand: "Jockey", topWords: "Soft, Elegant, Comfortable", reasonForRank: "", persistentIssue: "Fabric gets ruined after multiple washes.", conceptReaction: "Skeptical" },
    { id: "20", age: "23", gender: "Female", primaryBrand: "Jockey", topWords: "Comfortable, Versatile, Cheap", reasonForRank: "", persistentIssue: "No, not really.", conceptReaction: "Interested / Willing to Try" },
    { id: "21", age: "22", gender: "Female", primaryBrand: "Calvin Klein", topWords: "Looks Good, Comfortable, Nice To Wear", reasonForRank: "", persistentIssue: "No nothing", conceptReaction: "Skeptical" },
    { id: "22", age: "22", gender: "Female", primaryBrand: "Other", topWords: "Comfort, Good Quality, Durable", reasonForRank: "", persistentIssue: "User stated there are no persistent issues.", conceptReaction: "Skeptical" },
    { id: "23", age: "22", gender: "Female", primaryBrand: "Victoria's Secret", topWords: "Comfort, Variety, Inclusivity", reasonForRank: "", persistentIssue: "The seamless innerwear is not that comfortable.", conceptReaction: "Unknown" },
    { id: "24", age: "21", gender: "Female", primaryBrand: "Marks & Spencer", topWords: "Fashion, Comfort, Luxury", reasonForRank: "", persistentIssue: "For upperwear, sizes are a problem as brands are not inclusive in size diversity. For other innerwear like socks and underwear, there are problems with quality and durability.", conceptReaction: "Skeptical" },
    { id: "25", age: "22", gender: "Female", primaryBrand: "H&M", topWords: "Comfort, Variety, Inclusivity", reasonForRank: "", persistentIssue: "", conceptReaction: "Unknown" },
    { id: "26", age: "22", gender: "Male", primaryBrand: "Jockey", topWords: "Comfortable, Premium, Durable", reasonForRank: "", persistentIssue: "", conceptReaction: "Unknown" },
    { id: "27", age: "22", gender: "Female", primaryBrand: "Marks and Spencers", topWords: "Soft, Padded, Plast", reasonForRank: "", persistentIssue: "Doesn't know their correct size.", conceptReaction: "Skeptical" },
    { id: "28", age: "23", gender: "Female", primaryBrand: "Enamor", topWords: "Comfort, Style, Options", reasonForRank: "", persistentIssue: "Specially concealed clothing, sometimes it's not all skin tone friendly Sometimes they are lighter or sometimes they are darker... should have more skin tone options closer to Indian skin tone", conceptReaction: "Skeptical" },
    { id: "29", age: "24", gender: "Female", primaryBrand: "Jockey", topWords: "Comfortable, Economical, Durable", reasonForRank: "", persistentIssue: "", conceptReaction: "Skeptical" }
  ]
  const medianConceptReaction = "Skeptical"

  // Function to rate interview quality based on issue description
  const getInterviewQuality = (issue: string): number => {
    if (!issue || issue.trim() === "") return 4
    
    const lowerIssue = issue.toLowerCase()
    
    // Check for vague/negative responses
    if (
      lowerIssue.includes("no nothing") ||
      lowerIssue.includes("no issue") ||
      lowerIssue.includes("not really") ||
      lowerIssue.includes("could not think") ||
      lowerIssue.includes("stated there are no")
    ) {
      return 4
    }
    
    // Check for detailed, specific responses (5/5)
    const detailedKeywords = [
      "shrink on subsequent washes",
      "fabric becomes rough",
      "stops fitting well",
      "sizes are a problem",
      "not inclusive in size diversity",
      "skin tone friendly",
      "skin tone options",
      "indian skin tone",
      "elastics wear out",
      "user believes this is normal"
    ]
    
    if (detailedKeywords.some(keyword => lowerIssue.includes(keyword))) {
      return 5
    }
    
    // Check for multiple issues or longer descriptions
    if (issue.length > 80 || (issue.includes(" and ") && issue.split(" and ").length > 2)) {
      return 5
    }
    
    // Default to 4 for basic but clear responses
    return 4
  }

  const insightToneStyles = {
    blue: {
      border: "border-blue-500",
      glow: "from-blue-50/90 via-white to-blue-100/80",
      icon: "bg-blue-600",
      chip: "bg-blue-100 text-blue-900",
    },
    emerald: {
      border: "border-emerald-500",
      glow: "from-emerald-50/90 via-white to-emerald-100/70",
      icon: "bg-emerald-600",
      chip: "bg-emerald-100 text-emerald-900",
    },
    amber: {
      border: "border-amber-500",
      glow: "from-amber-50/90 via-white to-amber-100/70",
      icon: "bg-amber-500",
      chip: "bg-amber-100 text-amber-900",
    },
    indigo: {
      border: "border-indigo-500",
      glow: "from-indigo-50/90 via-white to-blue-50/70",
      icon: "bg-indigo-600",
      chip: "bg-indigo-100 text-indigo-900",
    },
    purple: {
      border: "border-purple-500",
      glow: "from-purple-50/90 via-white to-pink-50/70",
      icon: "bg-purple-600",
      chip: "bg-purple-100 text-purple-900",
    },
  } as const

  const executiveInsights: {
    id: string
    title: string
    description: ReactNode
    tone: keyof typeof insightToneStyles
    bullets?: ReactNode[]
  }[] = [
    {
      id: "01",
      title: "Attack the Habit by Weaponizing Convenience",
      tone: "blue",
      description: (
        <>
          Jockey&apos;s strength is its physical ubiquity. It is the &quot;default setting&quot; because it&apos;s available everywhere from <em>&quot;local shops though&quot;</em> to being the <em>&quot;easiest, most accessible, closest thing to my house.&quot;</em> To break this habit, FreeCultr must win the battle for digital convenience, specifically on Quick Commerce platforms like Blinkit, where one user now buys their innerwear when they &quot;run out.&quot;
        </>
      ),
    },
    {
      id: "02",
      title: "Win on 'Shape Retention,' Not Just 'Durability'",
      tone: "emerald",
      description: (
        <>
          Consumers have a 6-month psychological expiry date for innerwear. While durability issues like tearing are a concern, a highly consistent and detailed complaint is about <strong>&quot;Shape Decay&quot;</strong>: fabric getting looser and elastic wearing out. R&amp;D must focus on engineering waistbands and fabrics that prevent this, as focusing on lasting fit is more powerful than owning the generic claim of &quot;Comfort.&quot;
        </>
      ),
    },
    {
      id: "03",
      title: "Address the 'Cotton Paradox'",
      tone: "amber",
      description: (
        <>
          Users overwhelmingly state a preference for &quot;100% Cotton&quot; while simultaneously complaining about the exact failures of mass-market cotton, such as fabric getting rough and stretching. Marketing must frame advanced fabrics like Modal not as alien synthetics, but as a &quot;Next-Generation Cotton&quot; that offers the softness they desire without the durability issues they have come to expect.
        </>
      ),
    },
    {
      id: "04",
      title: "Reframe 'Fitter' to 'Fit'",
      tone: "indigo",
      description: (
        <>
          The concept of innerwear that makes one &quot;look fitter&quot; was met with widespread skepticism, rooted in a deep-seated aversion to discomfort and &quot;shapewear.&quot; The message must pivot from aesthetic promises of compression to functional benefits of a <strong>&quot;structured fit&quot;</strong> or <strong>&quot;sharp silhouette.&quot;</strong>
        </>
      ),
    },
    {
      id: "05",
      title: "Target the Hidden Gatekeeper with a Bifurcated Strategy",
      tone: "purple",
      description: (
        <>
          For a significant portion of the young male demographic, the primary purchaser is the mother. A dual marketing strategy is essential to unlock both buyer and wearer demand.
        </>
      ),
      bullets: [
        <>
          <strong>Track A (Instagram/YouTube):</strong> Brand building for the son, focusing on style and aspiration.
        </>,
        <>
          <strong>Track B (Facebook/Search):</strong> Utility and value-based marketing for the parent, focusing on bulk packs and durability.
        </>,
      ],
    },
  ]
  
  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollableHeight = documentHeight - windowHeight
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Render charts when Plotly is loaded or tab changes
  useEffect(() => {
    if (!plotlyLoaded || typeof window.Plotly === 'undefined') return;
    
    // Small delay to ensure DOM elements are rendered
    const timeout = setTimeout(() => {
      const plotConfig = { 
        displayModeBar: false, 
        responsive: true,
        autosize: true,
        staticPlot: false
      };
      
      // Helper function to add margins and ensure white background
      const addMargins = (layout: any, chartKey?: string) => {
        // For semantic network, preserve existing margins but ensure transparency
        if (chartKey === 'qbq_semantic_network') {
          if (!layout.margin) {
            layout.margin = { l: 80, r: 80, t: 150, b: 80, pad: 10 };
          } else {
            // Ensure sufficient top margin for title and annotations
            layout.margin.t = Math.max(layout.margin.t || 150, 150);
            // Left margin for semantic network can stay smaller as it doesn't have Y-axis labels
            layout.margin.l = Math.max(layout.margin.l || 80, 80);
          }
          // Keep white background for semantic network annotations visibility
          layout.paper_bgcolor = 'rgba(0,0,0,0)';
          layout.plot_bgcolor = 'rgba(0,0,0,0)';
        } else {
          // For all other charts, add generous margins to prevent clipping
          // Especially increase top margin for charts with titles
          // And left margin for Y-axis labels (especially for horizontal bar charts)
          if (!layout.margin) {
            layout.margin = { l: 200, r: 80, t: 150, b: 80, pad: 10 };
          } else {
            // Ensure minimum margins even if they exist
            // Left margin needs to be larger for Y-axis labels (200px minimum)
            // This prevents clipping of longer labels like "Marks & Spencer", "Victoria's Secret", "Unbranded/Local", etc.
            layout.margin.l = Math.max(layout.margin.l || 200, 200);
            layout.margin.r = Math.max(layout.margin.r || 80, 80);
            // Increase top margin significantly if chart has a title
            // Check for title in various Plotly formats
            const hasTitle = layout.title && (
              (typeof layout.title === 'string' && layout.title.length > 0) ||
              (typeof layout.title === 'object' && (layout.title.text || layout.title.text !== ''))
            );
            // Use 150px minimum for charts with titles, but keep it tight (40px) for charts without titles
            // This keeps summary charts spacious, while question-by-question charts sit closer under their HTML headings
            const minTopMargin = hasTitle ? 150 : 40;
            layout.margin.t = Math.max(layout.margin.t || minTopMargin, minTopMargin);
            layout.margin.b = Math.max(layout.margin.b || 80, 80);
            layout.margin.pad = layout.margin.pad || 10;
          }
          // Transparent background to merge seamlessly with page
          layout.paper_bgcolor = 'rgba(0,0,0,0)';
          layout.plot_bgcolor = 'rgba(0,0,0,0)';
        }
        return layout;
      };
      
      // Chart data
      const N = 29.0; // Total respondents (from updated report)
      const chartData = {
      qbq_brand_usage: {"data":[{"alignmentgroup":"True","hovertemplate":"Percentage=%{text}<br>Brand=%{y}<extra></extra>","legendgroup":"","marker":{"color":"#225ea8","pattern":{"shape":""}},"name":"","offsetgroup":"","orientation":"h","showlegend":false,"text":[55.2,10.3,6.9,6.9,3.4,3.4,3.4,3.4,3.4,3.4],"textposition":"auto","x":[55.2,10.3,6.9,6.9,3.4,3.4,3.4,3.4,3.4,3.4],"xaxis":"x","y":["Jockey","Calvin Klein","Marks & Spencer","Enamor","Unbranded/Local","Uniqlo","Other","Victoria's Secret","H&M","Marks and Spencers"],"yaxis":"y","type":"bar","texttemplate":"%{text:.1f}%"}],"layout":{"template":{"layout":{"colorway":["#225ea8","#43a2ca","#adddce","#cb2a2a","#E74C3C","#2ECC71"],"font":{"color":"#343a40","family":"Inter, sans-serif","size":14},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#000"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2}}},"xaxis":{"anchor":"y","domain":[0.0,1.0],"title":{"text":"Percentage of Respondents"}},"yaxis":{"anchor":"x","domain":[0.0,1.0],"title":{},"categoryorder":"total ascending"},"legend":{"tracegroupgap":0},"title":{"text":"Primary Innerwear Brand Usage"},"barmode":"relative"}},
      qbq_brand_usage_male: {"data":[{"alignmentgroup":"True","hovertemplate":"Percentage=%{text}<br>Brand=%{y}<extra></extra>","legendgroup":"","marker":{"color":"#225ea8","pattern":{"shape":""}},"name":"","offsetgroup":"","orientation":"h","showlegend":false,"text":[75.0,12.5,6.2,6.2],"textposition":"auto","x":[75.0,12.5,6.2,6.2],"xaxis":"x","y":["Jockey","Calvin Klein","Marks & Spencer","Unbranded/Local"],"yaxis":"y","type":"bar","texttemplate":"%{text:.1f}%"}],"layout":{"template":{"layout":{"colorway":["#225ea8","#43a2ca","#adddce","#cb2a2a","#E74C3C","#2ECC71"],"font":{"color":"#343a40","family":"Inter, sans-serif","size":14},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#000"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2}}},"xaxis":{"anchor":"y","domain":[0.0,1.0],"title":{"text":"% of Male Respondents"}},"yaxis":{"anchor":"x","domain":[0.0,1.0],"title":{},"categoryorder":"total ascending"},"legend":{"tracegroupgap":0},"title":{"text":"Primary Brand Usage (Males)"},"barmode":"relative"}},
      qbq_brand_usage_female: {"data":[{"alignmentgroup":"True","hovertemplate":"Percentage=%{text}<br>Brand=%{y}<extra></extra>","legendgroup":"","marker":{"color":"#225ea8","pattern":{"shape":""}},"name":"","offsetgroup":"","orientation":"h","showlegend":false,"text":[30.8,15.4,15.4,7.7,7.7,7.7,7.7,7.7],"textposition":"auto","x":[30.8,15.4,15.4,7.7,7.7,7.7,7.7,7.7],"xaxis":"x","y":["Jockey","Enamor","Marks & Spencer","Uniqlo","Calvin Klein","Other","Victoria's Secret","H&M"],"yaxis":"y","type":"bar","texttemplate":"%{text:.1f}%"}],"layout":{"template":{"layout":{"colorway":["#225ea8","#43a2ca","#adddce","#cb2a2a","#E74C3C","#2ECC71"],"font":{"color":"#343a40","family":"Inter, sans-serif","size":14},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#000"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2}}},"xaxis":{"anchor":"y","domain":[0.0,1.0],"title":{"text":"% of Female Respondents"}},"yaxis":{"anchor":"x","domain":[0.0,1.0],"title":{},"categoryorder":"total ascending"},"legend":{"tracegroupgap":0},"title":{"text":"Primary Brand Usage (Females)"},"barmode":"relative"}},
      qbq_gender: {"data":[{"domain":{"x":[0.0,1.0],"y":[0.0,1.0]},"hole":0.3,"hovertemplate":"G_Gender=%{label}<br>value=%{value}<extra></extra>","labels":["Male","Female"],"legendgroup":"","name":"","showlegend":true,"values":[16,13],"type":"pie","pull":[0.05,0],"textinfo":"percent+label"}],"layout":{"template":{"layout":{"colorway":["#225ea8","#43a2ca","#adddce","#cb2a2a","#E74C3C","#2ECC71"],"font":{"color":"#343a40","family":"Inter, sans-serif","size":14},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#000"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2}}},"legend":{"tracegroupgap":0},"title":{"text":"Gender Distribution"},"showlegend":false}},
      qbq_age: {"data":[{"direction":"clockwise","domain":{"x":[0.0,1.0],"y":[0.0,1.0]},"hovertemplate":"Age_Group=%{label}<br>Count=%{value}<extra></extra>","labels":["18-20","21-25","26-30"],"legendgroup":"","name":"","showlegend":true,"sort":false,"values":[6,22,1],"type":"pie","textinfo":"percent+label"}],"layout":{"template":{"layout":{"colorway":["#225ea8","#43a2ca","#adddce","#cb2a2a","#E74C3C","#2ECC71"],"font":{"color":"#343a40","family":"Inter, sans-serif","size":14},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#000"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2}}},"legend":{"tracegroupgap":0,"title":{"text":"Age Group"}},"title":{"text":"Age Distribution"},"piecolorway":["#adddce","#43a2ca","#225ea8"]}},
      qbq_ladder_male: {"data":[{"alignmentgroup":"True","hovertemplate":"Score=%{x}<br>Brand=%{y}<extra></extra>","legendgroup":"","marker":{"color":"#225ea8","pattern":{"shape":""}},"name":"","offsetgroup":"","orientation":"h","showlegend":false,"textposition":"auto","x":[40,28,20,17],"xaxis":"x","y":["Jockey","XYXX","Damensch","Lux Cozi"],"yaxis":"y","type":"bar"}],"layout":{"template":{"layout":{"colorway":["#225ea8","#43a2ca","#adddce","#cb2a2a","#E74C3C","#2ECC71"],"font":{"color":"#343a40","family":"Inter, sans-serif","size":14},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#000"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2}}},"xaxis":{"anchor":"y","domain":[0.0,1.0],"title":{"text":"Weighted Rank Score"}},"yaxis":{"anchor":"x","domain":[0.0,1.0],"title":{},"categoryorder":"total ascending"},"legend":{"tracegroupgap":0},"title":{"text":"Brand Ladder (Male Respondents)"},"barmode":"relative"}},
      qbq_ladder_female: {"data":[{"alignmentgroup":"True","hovertemplate":"Score=%{x}<br>Brand=%{y}<extra></extra>","legendgroup":"","marker":{"color":"#225ea8","pattern":{"shape":""}},"name":"","offsetgroup":"","orientation":"h","showlegend":false,"textposition":"auto","x":[36,32,18,10],"xaxis":"x","y":["Jockey","Enamor","Zivame","Clovia"],"yaxis":"y","type":"bar"}],"layout":{"template":{"layout":{"colorway":["#225ea8","#43a2ca","#adddce","#cb2a2a","#E74C3C","#2ECC71"],"font":{"color":"#343a40","family":"Inter, sans-serif","size":14},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#000"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2}}},"xaxis":{"anchor":"y","domain":[0.0,1.0],"title":{"text":"Weighted Rank Score"}},"yaxis":{"anchor":"x","domain":[0.0,1.0],"title":{},"categoryorder":"total ascending"},"legend":{"tracegroupgap":0},"title":{"text":"Brand Ladder (Female Respondents)"},"barmode":"relative"}},
      qbq_durability: {"data":[{"alignmentgroup":"True","boxpoints":"all","hovertemplate":"x=%{x}<extra></extra>","legendgroup":"","marker":{"color":"#225ea8"},"name":"","notched":false,"offsetgroup":"","orientation":"h","showlegend":false,"x":[7.5,6.5,12.0,6.0,12.0,3.5,4.5,3.5,6.0,6.5,2.5,3.0,18.0,18.0,6.0,4.5,6.0,6.0,4.5,6.0,6.0,12.0,12.0,5.0,2.5],"x0":" ","xaxis":"x","y0":" ","yaxis":"y","type":"box"}],"layout":{"template":{"layout":{"colorway":["#225ea8","#43a2ca","#adddce","#cb2a2a","#E74C3C","#2ECC71"],"font":{"color":"#343a40","family":"Inter, sans-serif","size":14},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#000"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2}}},"xaxis":{"anchor":"y","domain":[0.0,1.0],"title":{"text":"Expected Durability (Months)"}},"yaxis":{"anchor":"x","domain":[0.0,1.0],"title":{}},"legend":{"tracegroupgap":0},"title":{"text":"Distribution of Durability Expectation (Months)"},"boxmode":"group"}},
      qbq_issues: {"data":[{"alignmentgroup":"True","hovertemplate":"Percentage=%{text}<br>Issue=%{y}<extra></extra>","legendgroup":"","marker":{"color":"#cb2a2a","pattern":{"shape":""}},"name":"","offsetgroup":"","orientation":"h","showlegend":false,"text":[17.2,10.3,6.9,6.9,6.9],"textposition":"auto","x":[17.2,10.3,6.9,6.9,6.9],"xaxis":"x","y":["Poor Durability / Tearing","Fabric / Elastic Loosening","Causes Discomfort / Heat","Fit / Sizing Issues","Other"],"yaxis":"y","type":"bar","texttemplate":"%{text:.1f}%"}],"layout":{"template":{"layout":{"colorway":["#225ea8","#43a2ca","#adddce","#cb2a2a","#E74C3C","#2ECC71"],"font":{"color":"#343a40","family":"Inter, sans-serif","size":14},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#000"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2}}},"xaxis":{"anchor":"y","domain":[0.0,1.0],"title":{"text":"Percentage of Respondents"}},"yaxis":{"anchor":"x","domain":[0.0,1.0],"title":{},"categoryorder":"array","categoryarray":["Other","Fit / Sizing Issues","Causes Discomfort / Heat","Fabric / Elastic Loosening","Poor Durability / Tearing"]},"legend":{"tracegroupgap":0},"title":{"text":"Top Mentioned Issues"},"barmode":"relative"}},
      qbq_concept: {"data":[{"domain":{"x":[0.0,1.0],"y":[0.0,1.0]},"hovertemplate":"Reaction_Category=%{label}<br>value=%{value}<extra></extra>","labels":["Skeptical","Interested / Willing to Try"],"legendgroup":"","name":"","showlegend":true,"values":[20,6],"type":"pie","pull":[0.05,0],"textinfo":"percent+label"}],"layout":{"template":{"layout":{"colorway":["#225ea8","#43a2ca","#adddce","#cb2a2a","#E74C3C","#2ECC71"],"font":{"color":"#343a40","family":"Inter, sans-serif","size":14},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#000"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2}}},"legend":{"tracegroupgap":0},"title":{"text":"Reaction to 'Noticeably Fitter' Concept"},"showlegend":false}},
      qbq_buyer: {"data":[{"alignmentgroup":"True","hovertemplate":"Percentage=%{text}<br>P=%{y}<extra></extra>","legendgroup":"","marker":{"color":"#225ea8","pattern":{"shape":""}},"name":"","offsetgroup":"","orientation":"h","showlegend":false,"text":[79.3,17.2],"textposition":"auto","x":[79.3,17.2],"xaxis":"x","y":["Self","Parent / Mother"],"yaxis":"y","type":"bar","texttemplate":"%{text:.1f}%"}],"layout":{"template":{"layout":{"colorway":["#225ea8","#43a2ca","#adddce","#cb2a2a","#E74C3C","#2ECC71"],"font":{"color":"#343a40","family":"Inter, sans-serif","size":14},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#000"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2}}},"xaxis":{"anchor":"y","domain":[0.0,1.0],"title":{"text":"Percentage of Respondents"}},"yaxis":{"anchor":"x","domain":[0.0,1.0],"title":{},"categoryorder":"total ascending"},"legend":{"tracegroupgap":0},"title":{"text":"Who Buys the Innerwear?"},"barmode":"relative"}},
      qbq_fabric: {"data":[{"alignmentgroup":"True","hovertemplate":"Percentage=%{text}<br>F=%{y}<extra></extra>","legendgroup":"","marker":{"color":"#43a2ca","pattern":{"shape":""}},"name":"","offsetgroup":"","orientation":"h","showlegend":false,"text":[65.5,3.4,10.3,10.3],"textposition":"auto","x":[65.5,3.4,10.3,10.3],"xaxis":"x","y":["Cotton","Tencel","Micromodal","Supima"],"yaxis":"y","type":"bar","texttemplate":"%{text:.1f}%"}],"layout":{"template":{"layout":{"colorway":["#225ea8","#43a2ca","#adddce","#cb2a2a","#E74C3C","#2ECC71"],"font":{"color":"#343a40","family":"Inter, sans-serif","size":14},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#000"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2}}},"xaxis":{"anchor":"y","domain":[0.0,1.0],"title":{"text":"Percentage of Respondents"}},"yaxis":{"anchor":"x","domain":[0.0,1.0],"title":{},"categoryorder":"total ascending"},"legend":{"tracegroupgap":0},"title":{"text":"Preferred Fabric"},"barmode":"relative"}},
      qbq_freecultr_purchased: {"data":[{"domain":{"x":[0.0,1.0],"y":[0.0,1.0]},"hovertemplate":"FC_Freecultr_Familiarity.purchased=%{label}<br>value=%{value}<extra></extra>","labels":["No"],"legendgroup":"","name":"","showlegend":true,"values":[27],"type":"pie","pull":[0,0.05],"textinfo":"percent+label"}],"layout":{"template":{"layout":{"colorway":["#225ea8","#43a2ca","#adddce","#cb2a2a","#E74C3C","#2ECC71"],"font":{"color":"#343a40","family":"Inter, sans-serif","size":14},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#000"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2}}},"legend":{"tracegroupgap":0},"title":{"text":"Purchased from Freecultr Before?"}}},
      qbq_freecultr_heard: {"data":[{"domain":{"x":[0.0,1.0],"y":[0.0,1.0]},"hovertemplate":"FC_Freecultr_Familiarity.heard_of=%{label}<br>value=%{value}<extra></extra>","labels":["No","Yes"],"legendgroup":"","name":"","showlegend":true,"values":[20,7],"type":"pie","pull":[0.05,0],"textinfo":"percent+label"}],"layout":{"template":{"layout":{"colorway":["#225ea8","#43a2ca","#adddce","#cb2a2a","#E74C3C","#2ECC71"],"font":{"color":"#343a40","family":"Inter, sans-serif","size":14},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#000"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2}}},"legend":{"tracegroupgap":0},"title":{"text":"Heard of Freecultr Before?"}}},
      qbq_word_frequency: {"data":[{"alignmentgroup":"True","hovertemplate":"Count=%{text}<br>Driver=%{y}<extra></extra>","legendgroup":"","marker":{"color":"#43a2ca","pattern":{"shape":""}},"name":"","offsetgroup":"","orientation":"h","showlegend":false,"text":[27.0,13.0,6.0,6.0,4.0,3.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,1.0],"textposition":"auto","x":[27,13,6,6,4,3,2,2,2,2,2,2,2,2,1],"xaxis":"x","y":["Comfort","Style / Look","Softness","Quality","Durable","Affordable","Fabric","Brand Reputation","Habit","Availability","Good Quality","Popularity","Variety","Inclusivity","Durability"],"yaxis":"y","type":"bar"}],"layout":{"template":{"layout":{"colorway":["#225ea8","#43a2ca","#adddce","#cb2a2a","#E74C3C","#2ECC71"],"font":{"color":"#343a40","family":"Inter, sans-serif","size":14},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#000"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2}}},"xaxis":{"anchor":"y","domain":[0.0,1.0],"title":{"text":"Number of Mentions"}},"yaxis":{"anchor":"x","domain":[0.0,1.0],"title":{},"categoryorder":"total ascending"},"legend":{"tracegroupgap":0},"title":{"text":"Key Purchase Drivers (Overall Word Frequency)"},"barmode":"relative"}},
      qbq_semantic_network: {"data":[{"type":"scatter","mode":"lines","x":[0,-2.2,null],"y":[0,2.2,null],"line":{"width":7.2,"color":"rgba(128,128,128,0.3)"},"hoverinfo":"none","showlegend":false},{"type":"scatter","mode":"lines","x":[0,-1.2,null],"y":[0,1.2,null],"line":{"width":8.1,"color":"rgba(128,128,128,0.3)"},"hoverinfo":"none","showlegend":false},{"type":"scatter","mode":"lines","x":[-2.2,-1.2,null],"y":[2.2,1.2,null],"line":{"width":7.2,"color":"rgba(128,128,128,0.3)"},"hoverinfo":"none","showlegend":false},{"type":"scatter","mode":"lines","x":[-1.2,-1.8,null],"y":[1.2,0.5,null],"line":{"width":9,"color":"rgba(128,128,128,0.3)"},"hoverinfo":"none","showlegend":false},{"type":"scatter","mode":"lines","x":[-1.8,1.4,null],"y":[0.5,0.8,null],"line":{"width":5.4,"color":"rgba(128,128,128,0.3)"},"hoverinfo":"none","showlegend":false},{"type":"scatter","mode":"lines","x":[-1.8,-3.2,null],"y":[0.5,2.8,null],"line":{"width":4.5,"color":"rgba(192,57,43,0.6)","dash":"dash"},"hoverinfo":"none","showlegend":false},{"type":"scatter","mode":"lines","x":[-2.2,-3.2,null],"y":[2.2,2.8,null],"line":{"width":5.4,"color":"rgba(128,128,128,0.3)"},"hoverinfo":"none","showlegend":false},{"type":"scatter","mode":"lines","x":[-1.8,-1.0,null],"y":[0.5,2.5,null],"line":{"width":4.5,"color":"rgba(192,57,43,0.6)","dash":"dash"},"hoverinfo":"none","showlegend":false},{"type":"scatter","mode":"lines","x":[0,1.4,null],"y":[0,0.8,null],"line":{"width":6.3,"color":"rgba(128,128,128,0.3)"},"hoverinfo":"none","showlegend":false},{"type":"scatter","mode":"lines","x":[0,0.8,null],"y":[0,-1.5,null],"line":{"width":5.4,"color":"rgba(128,128,128,0.3)"},"hoverinfo":"none","showlegend":false},{"type":"scatter","mode":"lines","x":[0,1.2,null],"y":[0,-0.5,null],"line":{"width":4.5,"color":"rgba(128,128,128,0.3)"},"hoverinfo":"none","showlegend":false},{"type":"scatter","mode":"lines","x":[-2.2,-3.5,null],"y":[2.2,1.0,null],"line":{"width":8.1,"color":"rgba(128,128,128,0.3)"},"hoverinfo":"none","showlegend":false},{"type":"scatter","mode":"lines","x":[-3.5,-4.5,null],"y":[1.0,0,null],"line":{"width":7.2,"color":"rgba(128,128,128,0.3)"},"hoverinfo":"none","showlegend":false},{"type":"scatter","mode":"lines","x":[-3.5,-3.2,null],"y":[1.0,-1.2,null],"line":{"width":5.4,"color":"rgba(128,128,128,0.3)"},"hoverinfo":"none","showlegend":false},{"type":"scatter","mode":"lines","x":[-3.2,-2.0,null],"y":[-1.2,-2.0,null],"line":{"width":4.5,"color":"rgba(128,128,128,0.3)"},"hoverinfo":"none","showlegend":false},{"type":"scatter","mode":"lines","x":[0,2.5,null],"y":[0,0,null],"line":{"width":5.4,"color":"rgba(128,128,128,0.3)"},"hoverinfo":"none","showlegend":false},{"type":"scatter","mode":"lines","x":[2.5,3.8,null],"y":[0,-1.0,null],"line":{"width":4.5,"color":"rgba(128,128,128,0.3)"},"hoverinfo":"none","showlegend":false},{"type":"scatter","mode":"lines","x":[0.8,2.2,null],"y":[-1.5,-2.2,null],"line":{"width":4.5,"color":"rgba(192,57,43,0.6)","dash":"dash"},"hoverinfo":"none","showlegend":false},{"type":"scatter","mode":"markers+text","x":[0,-2.2,-1.2,-1.8,-3.2,-1.0,1.4,0.8,1.2,-3.5,-4.5,-3.2,-2.0,2.5,3.8,2.2],"y":[0,2.2,1.2,0.5,2.8,2.5,0.8,-1.5,-0.5,1.0,0,-1.2,-2.0,0,-1.0,-2.2],"text":["COMFORT","DURABLE","FABRIC","COTTON","LOOSE<br>ELASTIC","ROUGH<br>TEXTURE","SOFT","FIT","BREATHABLE","BRAND<br>TRUST","MOM/FAMILY<br>BUYS","ACCESSIBLE","AFFORDABLE","STYLISH","VARIETY","SHAPEWEAR<br>(SKEPTICAL)"],"textposition":"middle center","textfont":{"size":[18,18,16,15,14,14,15,15,14,16,14,14,14,16,14,14],"color":["black","black","black","black","black","black","black","black","black","black","black","black","black","black","black","black"],"family":"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"},"marker":{"size":[65,65,45,38,32,30,30,32,28,42,32,30,28,40,28,30],"color":["#2C3E50","#2C3E50","#27AE60","#27AE60","#C0392B","#C0392B","#2980B9","#2980B9","#2980B9","#8E44AD","#F1C40F","#8E44AD","#8E44AD","#F39C12","#F39C12","#C0392B"],"line":{"width":3,"color":"white"}},"hovertemplate":"<b>%{text}</b><extra></extra>","showlegend":false}],"layout":{"template":{"data":{"bar":[{"type":"bar","marker":{"line":{"width":0}}}]},"layout":{"font":{"color":"#343a40","family":"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#343a40"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"colorway":["#636EFA","#EF553B","#00CC96","#AB63FA","#FFA15A","#19D3F3","#FF6692","#B6E880","#FF97FF","#FECB52"]}},"title":{"text":"The Architecture of Consumer Choice: Semantic Network<br><sub>Node Size = Importance | Colors = Insight Categories</sub>","font":{"size":18,"family":"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}},"showlegend":false,"xaxis":{"showgrid":false,"zeroline":false,"showticklabels":false,"range":[-6.5,5.5]},"yaxis":{"showgrid":false,"zeroline":false,"showticklabels":false,"range":[-3.8,4.2]},"hovermode":"closest","plot_bgcolor":"white","paper_bgcolor":"white","margin":{"l":60,"r":60,"t":100,"b":60},"annotations":[{"x":-4.2,"y":3.8,"text":"<b>THE HIDDEN ANXIETY:</b><br>Users prioritize Durability<br>because they fear the 'Gaping Elastic'.","showarrow":true,"arrowhead":2,"arrowsize":1,"arrowwidth":2,"arrowcolor":"#C0392B","ax":-3.2,"ay":2.8,"font":{"size":11,"color":"#333333","family":"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"},"bgcolor":"white","bordercolor":"#C0392B","borderwidth":2,"borderpad":6,"align":"left","xanchor":"left"},{"x":-6.0,"y":-0.8,"text":"<b>THE GATEKEEPER:</b><br>Young men don't buy;<br>their Moms do (Trust driven).","showarrow":true,"arrowhead":2,"arrowsize":1,"arrowwidth":2,"arrowcolor":"#F1C40F","ax":-4.5,"ay":0,"font":{"size":11,"color":"#333333","family":"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"},"bgcolor":"white","bordercolor":"#F1C40F","borderwidth":2,"borderpad":6,"align":"left","xanchor":"left"},{"x":-2.0,"y":-1.1,"text":"<b>THE COTTON PARADOX:</b><br>Trusted for hygiene (Safety),<br>but blamed for shape loss.","showarrow":true,"arrowhead":2,"arrowsize":1,"arrowwidth":2,"arrowcolor":"#27AE60","ax":-1.2,"ay":1.2,"font":{"size":11,"color":"#333333","family":"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"},"bgcolor":"white","bordercolor":"#27AE60","borderwidth":2,"borderpad":6,"align":"left","xanchor":"left"},{"x":1.5,"y":-3.2,"text":"<b>THE FIT SKEPTICISM:</b><br>'Fitter' = Tight/Pain.<br>Comfort > Shapewear.","showarrow":true,"arrowhead":2,"arrowsize":1,"arrowwidth":2,"arrowcolor":"#E67E22","ax":2.2,"ay":-2.2,"font":{"size":11,"color":"#333333","family":"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"},"bgcolor":"white","bordercolor":"#E67E22","borderwidth":2,"borderpad":6,"align":"left","xanchor":"left"},{"x":2.2,"y":1.8,"text":"<b>THE SECONDARY BENEFIT:</b><br>Style is a 'Nice to have',<br>only if Comfort is secured.","showarrow":true,"arrowhead":2,"arrowsize":1,"arrowwidth":2,"arrowcolor":"#2980B9","ax":2.5,"ay":0,"font":{"size":11,"color":"#333333","family":"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"},"bgcolor":"white","bordercolor":"#2980B9","borderwidth":2,"borderpad":6,"align":"left","xanchor":"left"}]}}
    };
    
    // Render all charts
    const chartIds = [
      'qbq_chart_brand_usage', 'qbq_chart_brand_usage_male', 'qbq_chart_brand_usage_female', 'qbq_chart_word_frequency', 'qbq_chart_gender', 'qbq_chart_age', 'qbq_chart_ladder_male', 'qbq_chart_ladder_female',
      'qbq_chart_durability', 'qbq_chart_issues', 'qbq_chart_concept', 'qbq_chart_buyer',
      'qbq_chart_fabric', 'qbq_chart_freecultr_purchased', 'qbq_chart_freecultr_heard',
      'summary_chart_gender', 'summary_chart_age', 'summary_chart_brand_usage', 'summary_chart_brand_usage_male', 'summary_chart_brand_usage_female', 'summary_chart_word_frequency', 'summary_chart_ladder_male', 'summary_chart_ladder_female',
      'summary_chart_durability', 'summary_chart_issues', 'summary_chart_concept', 'summary_chart_buyer',
      'summary_chart_fabric', 'summary_chart_freecultr_purchased', 'summary_chart_freecultr_heard', 'summary_chart_semantic_network'
    ];
    
    chartIds.forEach(chartId => {
      const element = document.getElementById(chartId);
      if (element) {
        const chartKey = chartId.replace('summary_chart_', 'qbq_').replace('qbq_chart_', 'qbq_');
        const data = chartData[chartKey as keyof typeof chartData];
        if (data) {
          // Deep clone layout to avoid modifying original
          const layout = JSON.parse(JSON.stringify(data.layout));
          // Add margins and transparent background for seamless merge
          const updatedLayout = addMargins(layout, chartKey);
          window.Plotly.newPlot(chartId, data.data, updatedLayout, plotConfig);
        }
      }
    });
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [plotlyLoaded, activeTab]);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Scroll Progress Indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex items-center gap-3">
        <div className="relative w-1.5 h-64 bg-gray-200 rounded-full">
          <div 
            className="absolute bottom-0 left-0 w-full bg-blue-600 rounded-full transition-all duration-150 ease-out"
            style={{ height: `${scrollProgress}%` }}
          ></div>
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg transition-all duration-150 ease-out"
            style={{ bottom: `calc(${scrollProgress}% - 8px)` }}
          ></div>
        </div>
        <div className="text-sm font-semibold text-gray-700 whitespace-nowrap">
          {Math.round(scrollProgress)}%
        </div>
      </div>
      
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1156px] animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
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
              Innerwear Market Research
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto mt-8 shadow-lg"></div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-16">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-14 bg-muted p-1.5">
              <TabsTrigger value="summary" className="text-base font-semibold px-4 py-2">Executive Summary</TabsTrigger>
              <TabsTrigger value="question-by-question" className="text-base font-semibold px-4 py-2">Question-by-Question</TabsTrigger>
              <TabsTrigger value="all-responses" className="text-base font-semibold px-4 py-2">All Responses</TabsTrigger>
            </TabsList>

            {/* Summary Tab */}
            <TabsContent value="summary" className="space-y-16">
              {/* Executive Summary - Professional Brand Health Study Style */}
              <div className="mb-16">
                <div className="relative rounded-[32px] p-[2px] bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 shadow-2xl overflow-hidden">
                  <div className="bg-white rounded-[28px] shadow-sm border border-gray-200 overflow-hidden">
                  {/* Header Bar */}
                  <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-8 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <h2 className="text-2xl font-bold text-white tracking-wide">
                          EXECUTIVE SUMMARY
                        </h2>
                      <div className="flex flex-wrap gap-6 text-2xl">
                        <div>
                          <span className="text-gray-300">Study:</span>
                          <span className="text-white font-semibold ml-2">FreeCultr x TranzmitAI</span>ltr
                      </div>
                        <div>
                          <span className="text-gray-300">Sample:</span>
                          <span className="text-white font-semibold ml-2">N=29</span>
                        </div>
                        <div>
                          <span className="text-gray-300">Date:</span>
                          <span className="text-white font-semibold ml-2">Nov 2025</span>
                      </div>
                    </div>
                    </div>
                  </div>

                  <div className="p-8 bg-gray-50 border-b border-gray-200">
                    {/* KPI Dashboard */}
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-md p-5 border-l-4 border-blue-600 shadow-sm">
                          <p className="text-2xl font-semibold text-gray-600 uppercase tracking-wider">Market Leader</p>
                          <p className="text-4xl font-bold text-gray-900 mt-2">Jockey</p>
                          <p className="text-2xl text-gray-600 mt-1">55.2% share</p>
                        </div>
                        <div className="bg-white rounded-md p-5 border-l-4 border-amber-600 shadow-sm">
                          <p className="text-2xl font-semibold text-gray-600 uppercase tracking-wider">Durability Gap</p>
                          <p className="text-4xl font-bold text-gray-900 mt-2">6.0 months</p>
                          <p className="text-2xl text-gray-600 mt-1">Median Expectation</p>
                        </div>
                        <div className="bg-white rounded-md p-5 border-l-4 border-red-600 shadow-sm">
                          <p className="text-2xl font-semibold text-gray-600 uppercase tracking-wider">Top Issue</p>
                          <p className="text-4xl font-bold text-gray-900 mt-2">17.2%</p>
                          <p className="text-2xl text-gray-600 mt-1">Structural loosening</p>
                        </div>
                        <div className="bg-white rounded-md p-5 border-l-4 border-purple-600 shadow-sm">
                          <p className="text-2xl font-semibold text-gray-600 uppercase tracking-wider">Concept Test</p>
                          <p className="text-4xl font-bold text-gray-900 mt-2">76.9%</p>
                          <p className="text-2xl text-gray-600 mt-1">Skeptical</p>
                        </div>
                      </div>
                    </div>

                  <div className="p-8 space-y-8">
                    {/* Category Dynamics */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide mb-4">
                        Category Dynamics
                      </h3>
                        <p className="text-2xl text-gray-700 leading-relaxed">
                        This report reveals a critical vulnerability in the innerwear market: the leader, <strong className="font-semibold">Jockey</strong>, dominates not through superior product passion but through <strong className="font-semibold">Passive Inertia.</strong> Consumers default to it out of habit and overwhelming convenience, creating a significant opportunity for a challenger brand to win by being an <strong className="font-semibold">intelligent upgrade</strong>. Key frustrations like poor durability (specifically 'shape decay') and unmet needs in the female market around sizing and inclusivity are widespread yet accepted as normal.
                        </p>
                      </div>
                    </div>

                    {/* Strategic Imperatives */}
                  <div className="p-8 border-b border-gray-200 bg-blue-50/30">
                    <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide mb-6">
                      🔑 Key Actionable Learnings
                    </h3>
                    <div className="space-y-6">
                      {executiveInsights.map((insight) => {
                        const tone = insightToneStyles[insight.tone]
                        return (
                          <div
                            key={insight.id}
                            className={`relative overflow-hidden rounded-2xl border bg-white shadow-lg ${tone.border}`}
                          >
                            <div className={`absolute inset-0 bg-gradient-to-r ${tone.glow} opacity-70`}></div>
                            <div className="relative p-6 sm:p-7 space-y-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`flex-shrink-0 w-12 h-12 rounded-full text-white font-semibold flex items-center justify-center ${tone.icon}`}
                                >
                                  {insight.id}
                                </div>
                                <span
                                  className={`text-[11px] font-semibold uppercase tracking-[0.3em] px-3 py-1 rounded-full ${tone.chip}`}
                                >
                                  Insight
                                </span>
                              </div>
                              <div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-2">{insight.title}</h4>
                                <p className="text-2xl text-gray-700 leading-relaxed">{insight.description}</p>
                                {insight.bullets && (
                                  <ul className="mt-4 space-y-2 text-2xl text-gray-700 list-disc list-inside">
                                    {insight.bullets.map((bullet, idx) => (
                                      <li key={idx}>{bullet}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Market Composition Footer */}
                  <div className="p-8 bg-gray-50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-gray-900">27</p>
                        <p className="text-2xl text-gray-600 uppercase tracking-wider mt-1">
                          Comfort Mentions
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-gray-900">55% / 45%</p>
                        <p className="text-2xl text-gray-600 uppercase tracking-wider mt-1">
                          Male / Female
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-gray-900">65.5%</p>
                        <p className="text-2xl text-gray-600 uppercase tracking-wider mt-1">
                          Prefer Cotton
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-gray-900">79.3%</p>
                        <p className="text-2xl text-gray-600 uppercase tracking-wider mt-1">
                          Self Purchase
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>

              {/* Semantic Network */}
              <div className="mb-16">
                <div className="bg-white rounded-lg shadow-lg border-2 border-indigo-600 relative overflow-hidden">
                  {/* Header Bar */}
                  <div className="border-b-2 border-indigo-500 bg-gradient-to-r from-indigo-600 to-purple-700 px-8 py-6 relative">
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                        <h2 className="text-2xl font-bold text-white tracking-wide flex items-center gap-3">
                          <span className="w-1.5 h-8 bg-white rounded-full"></span>
                          CONSUMER INSIGHT MAP
                        </h2>
                        <p className="mt-1.5 text-2xl text-indigo-100 font-medium">The Architecture of Consumer Choice</p>
                        </div>
                      </div>
                    <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-transparent via-white to-transparent pointer-events-none"></div>
                    </div>

                  <div className="p-10">
                    {/* Introduction */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-100 mb-8">
                      <p className="text-2xl text-gray-700 leading-relaxed">
                        This semantic network visualizes how consumers mentally organize innerwear attributes. <strong className="font-semibold">Node size reflects importance</strong>, while connections reveal cognitive associations. The map exposes five critical consumer anxieties that shape purchase decisions.
                      </p>
                  </div>

                    {/* Semantic Network Chart */}
                    <div className="bg-white rounded-lg p-6 mb-8 flex justify-center">
                      <div id="summary_chart_semantic_network" className="w-full" style={{ minHeight: '800px' }}></div>
                    </div>

                    {/* Legend - Insight Categories */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide mb-4">Insight Categories</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#2C3E50' }}></div>
                          <span className="text-2xl font-medium text-gray-700">Core</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#27AE60' }}></div>
                          <span className="text-2xl font-medium text-gray-700">Utility</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#2980B9' }}></div>
                          <span className="text-2xl font-medium text-gray-700">Sensory</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#8E44AD' }}></div>
                          <span className="text-2xl font-medium text-gray-700">Market</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#F39C12' }}></div>
                          <span className="text-2xl font-medium text-gray-700">Aesthetic</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#F1C40F' }}></div>
                          <span className="text-2xl font-medium text-gray-700">Behavior</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#C0392B' }}></div>
                          <span className="text-2xl font-medium text-gray-700">Pain</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Respondent Profile */}
              <div className="mb-16">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-8 py-5">
                    <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">RESPONDENT PROFILE</h2>
                  </div>
                  
                  <div className="p-8 space-y-8">
                    {/* Sample Overview */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide mb-5">Sample Composition</h3>
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {/* <div className="bg-gray-50 rounded-md p-5 border-l-4 border-gray-600">
                          <p className="text-2xl font-semibold text-gray-600 uppercase tracking-wider">Total Sample</p>
                          <p className="text-4xl font-bold text-gray-900 mt-1">N=14</p>
                          <p className="text-2xl text-gray-700 mt-2">Respondents</p>
                        </div> */}
                        <div className="bg-blue-50 rounded-md p-5 border-l-4 border-blue-600">
                          <p className="text-2xl font-semibold text-gray-600 uppercase tracking-wider">Male</p>
                          <p className="text-4xl font-bold text-gray-900 mt-1">55%</p>
                          <p className="text-2xl text-gray-700 mt-2">16 respondents</p>
                        </div>
                        <div className="bg-pink-50 rounded-md p-5 border-l-4 border-pink-500">
                          <p className="text-2xl font-semibold text-gray-600 uppercase tracking-wider">Female</p>
                          <p className="text-4xl font-bold text-gray-900 mt-1">45%</p>
                          <p className="text-2xl text-gray-700 mt-2">13 respondents</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-md p-5 border border-blue-100">
                        <p className="text-2xl text-gray-700 leading-relaxed">
                          The audience surveyed consists of male and female participants primarily concentrated in the 18-25 age bracket.
                        </p>
                      </div>
                    </div>

                    {/* Gender and Age Distribution Charts */}
                    <div>
                      <div className="grid md:grid-cols-2 gap-8">
                      <div className="flex flex-col items-start">
                        <div id="summary_chart_gender" className="w-full max-h-[400px]"></div>
                      </div>
                      <div className="flex flex-col items-start">
                        <div id="summary_chart_age" className="w-full max-h-[400px]"></div>
                      </div>
                      </div>
                    </div>

                    {/* Key Demographics Grid */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide mb-4">Sample Characteristics</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                          <h4 className="text-2xl font-semibold text-gray-900 uppercase tracking-wider mb-3">Purchase Decision-Maker</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-2xl text-gray-700">Self-purchase</span>
                              <span className="text-2xl font-semibold text-gray-900">79.3%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-2xl text-gray-700">Parent/Family</span>
                              <span className="text-2xl font-semibold text-gray-900">17.2%</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                          <h4 className="text-2xl font-semibold text-gray-900 uppercase tracking-wider mb-3">Primary Brand Usage</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-2xl text-gray-700">Jockey</span>
                              <span className="text-2xl font-semibold text-gray-900">55.2%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-2xl text-gray-700">Calvin Klein</span>
                              <span className="text-2xl font-semibold text-gray-900">10.3%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-2xl text-gray-700">Others</span>
                              <span className="text-2xl font-semibold text-gray-900">34.5%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand Landscape & Purchase Drivers */}
              <div className="mb-16">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-8 py-5">
                    <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">BRAND LANDSCAPE & PURCHASE DRIVERS</h2>
                  </div>
                
                  <div className="p-8 space-y-8">
                    <div className="space-y-6">
                        <p className="text-2xl text-gray-700 leading-relaxed">
                        Jockey is the undisputed market leader with over <strong className="font-semibold">55.2%</strong> of respondents citing it as their primary brand. Its dominance is built on a foundation of convenience and habit. As users stated, their choice was driven by inertia: <em>'Maybe I was just using it since last few years and I continue,'</em> and the fact that <em>'its available in all stores.'</em>
                      </p>
                      <p className="text-2xl text-gray-700 leading-relaxed">
                        In contrast, a niche of consumers views innerwear as a form of self-expression. They choose Calvin Klein because it <em>'has a style to it,'</em> and appreciate brands that are <em>'good looking like when we wear low waist pants or have to show off something.'</em> This reveals an opportunity for a brand to offer 'daily luxury' that sits between basic utility and high-end fashion.
                        </p>
                    </div>
                    
                    <div className="mt-8 grid md:grid-cols-2 gap-8">
                      <div className="p-6 flex justify-center bg-white rounded-lg">
                        <div id="summary_chart_brand_usage_male" className="w-full min-h-[500px]"></div>
                      </div>
                      <div className="p-6 flex justify-center bg-white rounded-lg">
                        <div id="summary_chart_brand_usage_female" className="w-full min-h-[500px]"></div>
                      </div>
                    </div>
                    
                    <hr className="border-gray-300 my-8" />
                      </div>
                    </div>
                        </div>

              {/* Product Lifecycle & The Durability Problem */}
              <div className="mb-16">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-8 py-5">
                    <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">PRODUCT LIFECYCLE & THE DURABILITY PROBLEM</h2>
                  </div>
                  
                  <div className="p-8 space-y-8">
                    <p className="text-2xl text-gray-700 leading-relaxed">
                      Consumers have a clear psychological shelf-life for innerwear, with a median expectation of just <strong className="font-semibold">6 months</strong>. The universal definition of 'end of life' involves both outright failure like tearing and the gradual loss of structural integrity. This 'Shape Decay' is one of the market's single biggest product flaws.
                    </p>

                    <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                        <p className="text-2xl text-gray-700 leading-relaxed">
                        <strong className="font-semibold">The Core Problem:</strong> Users consistently complain that after a few washes, <em>'the cotton starts to get looser and the elastic starts to get loose.'</em> Another stated, <em>'I guess sometimes they become loose.'</em> This is accepted as an unavoidable reality.
                        </p>
                    </div>

                    <div className="space-y-8 mt-8">
                      <div className="p-6 flex justify-center bg-white rounded-lg">
                        <div id="summary_chart_durability" className="w-full min-h-[400px]"></div>
                      </div>
                      <div className="p-6 flex justify-center bg-white rounded-lg">
                        <div id="summary_chart_issues" className="w-full min-h-[400px]"></div>
                      </div>
                      <p> *Some people mentioned no issues, so we have not included them in the chart.</p>

                    </div>

                    
                    <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide mb-5">Persistent Issues & Frustrations</h3>
                    <p className="text-2xl text-gray-700 leading-relaxed mb-6">
                      Beyond shape decay, a number of specific and highly actionable frustrations were uncovered, particularly in the female market, presenting clear opportunities for product innovation.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                        <p className="text-2xl text-gray-700 leading-relaxed">
                          <strong className="font-semibold">Sizing and Inclusivity Gap:</strong> There is a palpable frustration with inconsistent and limited sizing. One respondent noted, <em>'I think at least with upperwear, the sizes are a problem. Not all brands are catered to provide most sizes. They're not very inclusive in terms of size diversity.'</em>
                        </p>
                    </div>

                      <div className="bg-teal-50 rounded-lg p-6 border border-teal-200">
                        <p className="text-2xl text-gray-700 leading-relaxed">
                          <strong className="font-semibold">The Skin-Tone Opportunity:</strong> An unmet need was identified for concealed wear that matches Indian skin tones. As one user explained, <em>'Specially concealed clothing, sometimes it's not all skin tone friendly... [brands] should have more skin tone options closer to Indian skin tone.'</em>
                        </p>
                      </div>
                    </div>

                    <hr className="border-gray-300 my-8" />
                    
                    <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide mb-5">New Concept Market Test: The "Fitter Look"</h3>
                    <p className="text-2xl text-gray-700 leading-relaxed mb-6">
                      The concept of innerwear that makes the wearer 'look noticeably fitter' was met with <strong className="font-semibold">76.9% skepticism.</strong> This reaction is not driven by disbelief in the claim, but by a fear that 'fitter' is a synonym for 'uncomfortable.'
                    </p>
                    
                    <div className="bg-amber-50 rounded-lg p-6 border border-amber-200 mb-6">
                        <p className="text-2xl text-gray-700 leading-relaxed">
                        <strong className="font-semibold">The Voice of Fear:</strong> The primary concern was comfort, with one user stating, <em>'I would be skeptical... I'm not a fan of shapewear.'</em> Another was skeptical about both <em>'the claims and the comfort.'</em> Marketing for such a product should be focused on making it relatable and comfortable, perhaps by utilizing 'everyman' influencers.
                        </p>
                      </div>
                    </div>
                </div>
              </div>
            </TabsContent>

            {/* Question-by-Question Tab */}
            <TabsContent value="question-by-question" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-foreground mb-4 drop-shadow-lg">Question-by-Question Analysis</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto shadow-lg"></div>
                <p className="text-2xl text-muted-foreground mt-6">
                  Detailed breakdown of each survey question with visualizations
                </p>
              </div>

              {/* Respondent Profile */}
              <DeepDiveCard>
                <h3 className="text-4xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full mr-4"></div>
                  Respondent Profile
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex flex-col items-start">
                    <div id="qbq_chart_gender" className="w-full min-h-[400px] -ml-12"></div>
                  </div>
                  <div className="flex flex-col items-start">
                    <div id="qbq_chart_age" className="w-full min-h-[400px] -ml-12"></div>
                  </div>
                </div>
              </DeepDiveCard>

              {/* Brand Landscape & Purchase Drivers */}
              <DeepDiveCard>
                <h3 className="text-4xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full mr-4"></div>
                  Brand Landscape & Purchase Drivers
                </h3>
                
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-6">
                  <p className="text-2xl text-gray-700 leading-relaxed">
                    <strong className="font-semibold">Insight: Different Brands for Different Occasions.</strong><br/>
                    Jockey is not an active choice but the baseline for innerwear. Consumers rarely stick to one brand, often owning a "Daily Driver" (like Jockey) and a "Special Occasion" pair (like Calvin Klein or M&S). This signals an opportunity to position a brand as the "Daily Luxury" that upgrades their everyday experience.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-6 flex justify-center bg-white rounded-lg">
                    <div id="qbq_chart_brand_usage_male" className="w-full min-h-[500px]"></div>
                  </div>
                  <div className="p-6 flex justify-center bg-white rounded-lg">
                    <div id="qbq_chart_brand_usage_female" className="w-full min-h-[500px]"></div>
                  </div>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200 mt-6">
                  <p className="text-2xl text-gray-700 leading-relaxed">
                    <strong className="font-semibold">Insight: The "Comfort" Placebo.</strong><br/>
                    "Comfort" is a generic placeholder. The real insight comes from the secondary words: premium brand users use aspirational words ("Style," "Look," "Luxury"), while Jockey users use functional words ("Durable," "Price," "Accessible"). <strong>Strategic Action:</strong> Do not market generic "Comfort." Market a specific type of comfort: <strong>"Cooling," "Invisible,"</strong> or <strong>"Zero-Chafe."</strong>
                  </p>
                    </div>

                <div className="mt-6">
                  <h5 className="text-2xl font-bold text-gray-900 mb-4">Top Associations by Brand</h5>
                  <ul className="space-y-2 text-2xl text-gray-700">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="font-semibold">Jockey:</strong> Comfort, Style / Look, Softness</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="font-semibold">Calvin Klein:</strong> Style / Look, Comfort, Brand Identity</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong className="font-semibold">Marks & Spencer:</strong> Fabric, Quality, Brand Reputation</span>
                    </li>
                      </ul>
                    </div>

                <h5 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Overall Word Frequency</h5>
                <div className="p-6 flex justify-center bg-white rounded-lg">
                  <div id="qbq_chart_word_frequency" className="w-full min-h-[600px]"></div>
                </div>
              </DeepDiveCard>

              {/* Brand Awareness & Ranking */}
              <DeepDiveCard>
                <h3 className="text-4xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full mr-4"></div>
                  Brand Awareness & Ranking
                </h3>
                
                <div className="bg-amber-50 rounded-lg p-6 border border-amber-200 mb-6">
                  <p className="text-2xl text-gray-700 leading-relaxed">
                    <strong className="font-semibold">Insight: The Blind Spot of D2C.</strong><br/>
                    This was a critical finding. Many respondents <strong>did not know</strong> challenger brands like XYXX or Damensch. They ranked Jockey #1 simply because they recognized the name. <strong>The Implication:</strong> Brand equity for new players is near zero in the general populace. <strong>Strategic Action:</strong> Awareness is the primary bottleneck. A significant investment in top-of-funnel brand awareness (YouTube, Social Media) is required before conversion-focused ads can be effective.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="p-6 flex justify-center bg-white rounded-lg">
                    <div id="qbq_chart_ladder_male" className="w-full min-h-[500px]"></div>
                  </div>
                  <div className="p-6 flex justify-center bg-white rounded-lg">
                    <div id="qbq_chart_ladder_female" className="w-full min-h-[500px]"></div>
                  </div>
                </div>
              </DeepDiveCard>

              {/* Durability & Persistent Issues */}
              <DeepDiveCard>
                <h3 className="text-4xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full mr-4"></div>
                  Durability & Persistent Issues
                </h3>
                
                <div className="bg-red-50 rounded-lg p-6 border border-red-200 mb-6">
                  <p className="text-2xl text-gray-700 leading-relaxed">
                    <strong className="font-semibold">Insight: Durability failures are twofold, focusing on tearing and "Shape Decay."</strong><br/>
                    While poor durability and tearing are key frustrations, a highly consistent and detailed complaint is about the product's loss of structural integrity. Users frequently mention that <em>"the elastic starts to get loose"</em> and the fabric <em>"becomes loose"</em> after washes.
                  </p>
                </div>

                <div className="p-6 flex justify-center bg-white rounded-lg mb-8">
                  <div id="qbq_chart_durability" className="w-full min-h-[500px]"></div>
                </div>

                <div className="p-6 flex justify-center bg-white rounded-lg">
                  <div id="qbq_chart_issues" className="w-full min-h-[500px]"></div>
                </div>
              </DeepDiveCard>

              {/* New Concept Test */}
              <DeepDiveCard>
                <h3 className="text-4xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full mr-4"></div>
                  New Concept Test: The "Fitter Look"
                </h3>
                
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200 mb-6">
                  <p className="text-2xl text-gray-700 leading-relaxed">
                    <strong className="font-semibold">Insight: The pitch triggers a fear of compression and discomfort.</strong><br/>
                    The term "fitter" is immediately associated with restrictive "shapewear." Skepticism is high because users are unwilling to trade comfort for an aesthetic benefit. As one user put it, <em>"I will be more skeptical about comfort. Comfort comes first for me."</em>
                  </p>
                </div>

                <div className="p-6 flex justify-center bg-white rounded-lg">
                  <div id="qbq_chart_concept" className="w-full min-h-[500px]"></div>
                </div>
              </DeepDiveCard>

              {/* Purchase Behavior & Fabric Preference */}
              <DeepDiveCard>
                <h3 className="text-4xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full mr-4"></div>
                  Purchase Behavior & Fabric Preference
                </h3>
                
                <div className="bg-green-50 rounded-lg p-6 border border-green-200 mb-6">
                  <p className="text-2xl text-gray-700 leading-relaxed">
                    <strong className="font-semibold">Insight: The "Cotton Paradox" reveals a key marketing angle.</strong><br/>
                    "100% Cotton" is the reflexive, "safe" answer. However, this preference directly contradicts users' primary complaints about fabric getting rough and losing shape. <strong>The Analytical Diagnosis:</strong> Consumers do not know what Micro-modal or Tencel is, so they retreat to the familiar term "Cotton." Marketing a synthetic-sounding name will face resistance. <strong>Strategic Action:</strong> Frame advanced fabrics as an <strong>"Enhanced Cotton"</strong> or <strong>"The Cotton That Stays Soft,"</strong> connecting the new material directly to the solution for their existing frustrations.
                  </p>
                </div>

                <div className="p-6 flex justify-center bg-white rounded-lg mb-8">
                  <div id="qbq_chart_fabric" className="w-full min-h-[500px]"></div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 mb-6">
                  <p className="text-2xl text-gray-700 leading-relaxed">
                    <strong className="font-semibold">Insight: The "Mother" Economy is a key channel for young men.</strong><br/>
                    A significant portion of men in the sample do not fully control the transaction. The purchase is often delegated to a parent, who follows a "replenishment loop" based on habit and value.
                  </p>
              </div>

                <div className="p-6 flex justify-center bg-white rounded-lg">
                  <div id="qbq_chart_buyer" className="w-full min-h-[500px]"></div>
                </div>
              </DeepDiveCard>
                
              {/* Brand Familiarity: Freecultr */}
              <DeepDiveCard>
                <h3 className="text-4xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full mr-4"></div>
                  Brand Familiarity: Freecultr
                </h3>
                
                <div className="bg-red-50 rounded-lg p-6 border border-red-200 mb-6">
                  <p className="text-2xl text-gray-700 leading-relaxed">
                    <strong className="font-semibold">Insight: Brand awareness is currently near zero.</strong><br/>
                    Familiarity with the Freecultr brand is extremely low among this sample, underscoring the primary challenge of building top-of-funnel awareness before any other strategic action can be effective.
                  </p>
              </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex flex-col items-start">
                    <div id="qbq_chart_freecultr_heard" className="w-full min-h-[500px]"></div>
                  </div>
                  <div className="flex flex-col items-start">
                    <div id="qbq_chart_freecultr_purchased" className="w-full min-h-[500px]"></div>
                  </div>
                </div>
              </DeepDiveCard>
            </TabsContent>

            {/* All Responses Tab */}
            <TabsContent value="all-responses" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-foreground mb-4 drop-shadow-lg">All Responses</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto shadow-lg"></div>
                <p className="text-2xl text-muted-foreground mt-6">
                  Complete list of survey respondents and their responses after filtering for interview quality 
                </p>
              </div>

              <div className="bg-white rounded-xl border border-border shadow-lg overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <TableHead className="font-bold text-2xl sm:text-2xl px-3 py-4 text-left align-top">No</TableHead>
                      <TableHead className="font-bold text-2xl sm:text-2xl px-3 py-4 text-left align-top">Age</TableHead>
                      <TableHead className="font-bold text-2xl sm:text-2xl px-3 py-4 text-left align-top">Gender</TableHead>
                      <TableHead className="font-bold text-2xl sm:text-2xl px-3 py-4 text-left align-top min-w-[120px]">Brand</TableHead>
                      <TableHead className="font-bold text-2xl sm:text-2xl px-3 py-4 text-left align-top min-w-[200px]">Top Words</TableHead>
                      <TableHead className="font-bold text-2xl sm:text-2xl px-3 py-4 text-left align-top min-w-[180px]">Interview quality</TableHead>
                      <TableHead className="font-bold text-2xl sm:text-2xl px-3 py-4 text-left align-top min-w-[120px]">Reaction</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {respondents.map((respondent) => (
                      <TableRow key={respondent.id} className="hover:bg-blue-50/50 transition-colors border-b">
                        <TableCell className="font-medium text-2xl sm:text-2xl px-3 py-4 align-top">{respondent.id}</TableCell>
                        <TableCell className="text-2xl sm:text-2xl px-3 py-4 align-top">{respondent.age || '-'}</TableCell>
                        <TableCell className="text-2xl sm:text-2xl px-3 py-4 align-top whitespace-nowrap">{respondent.gender}</TableCell>
                        <TableCell className="text-2xl sm:text-2xl px-3 py-4 align-top">
                          <div className="break-words leading-relaxed">{respondent.primaryBrand}</div>
                        </TableCell>
                        <TableCell className="text-2xl sm:text-2xl px-3 py-4 align-top">
                          <div className="break-words leading-relaxed">{respondent.topWords}</div>
                        </TableCell>
                        <TableCell className="text-2xl sm:text-2xl px-3 py-4 align-top">
                          <div className="break-words leading-relaxed">
                            {getInterviewQuality(respondent.persistentIssue)}/5
                          </div>
                        </TableCell>
                        <TableCell className="text-2xl sm:text-2xl px-3 py-4 align-top">
                          <div className="break-words leading-relaxed">
                            {respondent.conceptReaction === "Unknown" ? medianConceptReaction : respondent.conceptReaction}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-8 rounded-xl border border-blue-200 mt-8">
                <p className="text-2xl text-muted-foreground text-center">
                  This table shows all {respondents.length} respondents from the survey. 
                  The complete dataset includes detailed responses to all survey questions.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <div className="mt-24"></div>
      <Footer />
      
      {/* Plotly.js Script */}
      <Script 
        src="https://cdn.plot.ly/plotly-2.32.0.min.js" 
        strategy="afterInteractive"
        onLoad={() => setPlotlyLoaded(true)}
      />
    </div>
  )
}
