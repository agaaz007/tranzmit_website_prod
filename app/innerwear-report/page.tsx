"use client"

import { useState, useEffect, type ReactNode } from "react"
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
  
  // Respondent data from the innerwear survey
  const respondents = [
    { id: "1", age: "22", gender: "Male", primaryBrand: "Jockey", topWords: "Comfortable, Long-Lasting", reasonForRank: "", persistentIssue: "Fabric / Elastic Loosening", conceptReaction: "Skeptical" },
    { id: "2", age: "", gender: "Male", primaryBrand: "Marks & Spencer", topWords: "Comfort, Fabric, Price", reasonForRank: "", persistentIssue: "", conceptReaction: "Skeptical" },
    { id: "3", age: "", gender: "Female", primaryBrand: "Enamor", topWords: "Comfortable, Colors", reasonForRank: "Comfortable and stylish", persistentIssue: "Poor Durability / Tearing", conceptReaction: "Skeptical" },
    { id: "4", age: "", gender: "Male", primaryBrand: "Jockey", topWords: "Durable, Comfortable, Appealing", reasonForRank: "it's the way i've used it, feels more comfortable in general.", persistentIssue: "Fabric / Elastic Loosening", conceptReaction: "Interested/Would Try" },
    { id: "5", age: "", gender: "Female", primaryBrand: "Jockey", topWords: "Jockey, Comfort, Durable", reasonForRank: "", persistentIssue: "", conceptReaction: "Skeptical" },
    { id: "6", age: "", gender: "Male", primaryBrand: "Jockey", topWords: "Comfort, Fit, Relaxation", reasonForRank: "Brand popularity and comfort.", persistentIssue: "", conceptReaction: "Skeptical" },
    { id: "7", age: "", gender: "Male", primaryBrand: "Jockey", topWords: "Comfort, Cotton, Long Lasting", reasonForRank: "The quality and comfort.", persistentIssue: "", conceptReaction: "Skeptical" },
    { id: "8", age: "", gender: "Male", primaryBrand: "Calvin Klein", topWords: "Brand Identity, Comfort, Designs", reasonForRank: "The comfort and the durability.", persistentIssue: "Fabric / Elastic Loosening", conceptReaction: "Skeptical" },
    { id: "9", age: "", gender: "Female", primaryBrand: "Enamor", topWords: "Comfortable, Pretty, Stylish", reasonForRank: "Because it's comfortable.", persistentIssue: "", conceptReaction: "Skeptical" },
    { id: "10", age: "24", gender: "Male", primaryBrand: "Jockey", topWords: "Comfortable, Affordable, Durable", reasonForRank: "It's durable and comfortable.", persistentIssue: "Fabric / Elastic Loosening", conceptReaction: "Skeptical" },
    { id: "11", age: "", gender: "Male", primaryBrand: "Enamor", topWords: "Comfortable, Soft, Durable", reasonForRank: "Comfort and durability.", persistentIssue: "Fabric / Elastic Loosening", conceptReaction: "Skeptical" },
    { id: "12", age: "", gender: "Male", primaryBrand: "H&M", topWords: "Fit, Comfort, Look", reasonForRank: "It's the comfort.", persistentIssue: "Fabric / Elastic Loosening", conceptReaction: "Skeptical" },
    { id: "13", age: "", gender: "Male", primaryBrand: "Autograph By Marks And Spencer", topWords: "Comfort, Fabric, Price", reasonForRank: "", persistentIssue: "", conceptReaction: "Skeptical" },
    { id: "14", age: "", gender: "Male", primaryBrand: "Jockey", topWords: "Softness", reasonForRank: "", persistentIssue: "Causes Discomfort / Heat", conceptReaction: "Skeptical" },
  ]
  
  // Render charts when Plotly is loaded or tab changes
  useEffect(() => {
    if (!plotlyLoaded || typeof window.Plotly === 'undefined') return;
    
    // Small delay to ensure DOM elements are rendered
    const timeout = setTimeout(() => {
      const plotConfig = { displayModeBar: false, responsive: true };
      
      // Chart data
      const N = 14.0; // Total respondents (from table: 14 rows)
      const chartData = {
      qbq_brand_usage: {"data":[{"alignmentgroup":"True","hovertemplate":"Brand=%{y}<br>Percentage=%{x:.1f}%<extra></extra>","marker":{"color":"#225ea8"},"name":"","orientation":"h","showlegend":false,"textposition":"auto","type":"bar","x":[(7/N)*100, (3/N)*100, (1/N)*100, (1/N)*100, (1/N)*100, (1/N)*100],"y":["Jockey","Enamor","H&M","Calvin Klein","Marks & Spencer","Autograph By Marks And Spencer"],"texttemplate":"%{x:.1f}%"}],"layout":{"template":{"data":{"bar":[{"type":"bar","marker":{"line":{"width":0}}}]},"layout":{"font":{"color":"#343a40","family":"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#343a40"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"colorway":["#636EFA","#EF553B","#00CC96","#AB63FA","#FFA15A","#19D3F3","#FF6692","#B6E880","#FF97FF","#FECB52"]}},"legend":{"font":{"color":"#495057"}},"title":{"text":"Primary Innerwear Brand Usage"},"xaxis":{"domain":[0.0,1.0],"title":{"text":"Percentage of Respondents"},"ticksuffix":"%"},"yaxis":{"autorange":"reversed","domain":[0.0,1.0],"title":{"text":null}},"hovermode":"closest"}},
      qbq_gender: {"data":[{"hoverinfo":"label+percent+value","labels":["Male","Female"],"marker":{"colors":["#adddce","#43a2ca"]},"name":"","textinfo":"percent+label","textposition":"inside","type":"pie","values":[11,3]}],"layout":{"template":{"data":{"bar":[{"type":"bar","marker":{"line":{"width":0}}}]},"layout":{"font":{"color":"#343a40","family":"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#343a40"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"colorway":["#636EFA","#EF553B","#00CC96","#AB63FA","#FFA15A","#19D3F3","#FF6692","#B6E880","#FF97FF","#FECB52"]}},"legend":{"font":{"color":"#495057"}},"title":{"text":"Gender Split"},"annotations":[]}},
      qbq_ladder_male: {"data":[{"alignmentgroup":"True","hovertemplate":"Brand=%{y}<br>Score=%{x}<extra></extra>","marker":{"color":"#225ea8"},"name":"","orientation":"h","showlegend":false,"textposition":"auto","type":"bar","x":[19,11,8,6,3,2],"y":["Jockey","XYXX","Luxe Cozy","Damensch","Marks & Spencer","Calvin Klein"],"text":[19,11,8,6,3,2],"texttemplate":"%{x}"}],"layout":{"template":{"data":{"bar":[{"type":"bar","marker":{"line":{"width":0}}}]},"layout":{"font":{"color":"#343a40","family":"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#343a40"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"colorway":["#636EFA","#EF553B","#00CC96","#AB63FA","#FFA15A","#19D3F3","#FF6692","#B6E880","#FF97FF","#FECB52"]}},"legend":{"font":{"color":"#495057"}},"title":{"text":"Brand Ladder (Male Respondents)"},"xaxis":{"domain":[0.0,1.0],"title":{"text":"Weighted Rank Score"}},"yaxis":{"autorange":"reversed","domain":[0.0,1.0],"title":{"text":null}},"hovermode":"closest"}},
      qbq_ladder_female: {"data":[{"alignmentgroup":"True","hovertemplate":"Brand=%{y}<br>Score=%{x}<extra></extra>","marker":{"color":"#225ea8"},"name":"","orientation":"h","showlegend":false,"textposition":"auto","type":"bar","x":[4,3,2],"y":["Enamor","Jockey","Zivame"],"text":[4,3,2],"texttemplate":"%{x}"}],"layout":{"template":{"data":{"bar":[{"type":"bar","marker":{"line":{"width":0}}}]},"layout":{"font":{"color":"#343a40","family":"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#343a40"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"colorway":["#636EFA","#EF553B","#00CC96","#AB63FA","#FFA15A","#19D3F3","#FF6692","#B6E880","#FF97FF","#FECB52"]}},"legend":{"font":{"color":"#495057"}},"title":{"text":"Brand Ladder (Female Respondents)"},"xaxis":{"domain":[0.0,1.0],"title":{"text":"Weighted Rank Score"}},"yaxis":{"autorange":"reversed","domain":[0.0,1.0],"title":{"text":null}},"hovermode":"closest"}},
      qbq_durability: {"data":[{"alignmentgroup":"True","boxpoints":"all","hovertemplate":"durability_months=6.0<extra></extra>","marker":{"color":"#225ea8"},"name":"","orientation":"h","type":"box","x":[7.5,6.5,12.0,6.0,12.0,4.5,3.5,6.0,6.5,2.5,3.0,18.0],"xaxis":"x"}],"layout":{"template":{"data":{"bar":[{"type":"bar","marker":{"line":{"width":0}}}]},"layout":{"font":{"color":"#343a40","family":"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#343a40"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"colorway":["#636EFA","#EF553B","#00CC96","#AB63FA","#FFA15A","#19D3F3","#FF6692","#B6E880","#FF97FF","#FECB52"]}},"legend":{"font":{"color":"#495057"}},"title":{"text":"Durability Expectation (in Months)"},"xaxis":{"domain":[0.0,1.0],"dtick":2,"title":{"text":"Months"}},"yaxis":{"domain":[0.0,1.0],"showticklabels":false,"title":{"text":null}},"hovermode":"closest"}},
      qbq_issues: {"data":[{"alignmentgroup":"True","hovertemplate":"Issue=%{y}<br>Percentage=%{x:.1f}%<extra></extra>","marker":{"color":"#cb2a2a"},"name":"","orientation":"h","showlegend":false,"textposition":"auto","type":"bar","x":[(6/N)*100, (3/N)*100, (1/N)*100, (1/N)*100],"y":["Fabric / Elastic<br>Loosening","Causes Discomfort /<br>Heat","Poor Durability /<br>Tearing","Fit / Sizing Issues"],"texttemplate":"%{x:.1f}%"}],"layout":{"template":{"data":{"bar":[{"type":"bar","marker":{"line":{"width":0}}}]},"layout":{"font":{"color":"#343a40","family":"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#343a40"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"colorway":["#636EFA","#EF553B","#00CC96","#AB63FA","#FFA15A","#19D3F3","#FF6692","#B6E880","#FF97FF","#FECB52"]}},"legend":{"font":{"color":"#495057"}},"title":{"text":"Top Mentioned Issues"},"margin":{"l":200},"xaxis":{"domain":[0.0,1.0],"tickformat":",.0f","title":{"text":"Percentage of Respondents"},"ticksuffix":"%"},"yaxis":{"autorange":"reversed","domain":[0.0,1.0],"title":{"text":null}},"hovermode":"closest"}},
      qbq_concept: {"data":[{"hoverinfo":"label+percent+value","labels":["Skeptical","Interested/Would Try"],"marker":{"colors":["#cb2a2a","#43a2ca"]},"name":"","textinfo":"percent+label","textposition":"inside","type":"pie","values":[13,1]}],"layout":{"template":{"data":{"bar":[{"type":"bar","marker":{"line":{"width":0}}}]},"layout":{"font":{"color":"#343a40","family":"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#343a40"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"colorway":["#636EFA","#EF553B","#00CC96","#AB63FA","#FFA15A","#19D3F3","#FF6692","#B6E880","#FF97FF","#FECB52"]}},"legend":{"font":{"color":"#495057"}},"title":{"text":"Reaction to 'Fitter' Concept"},"annotations":[]}},
      qbq_buyer: {"data":[{"alignmentgroup":"True","hovertemplate":"Purchaser=%{y}<br>Percentage=%{x:.1f}%<extra></extra>","marker":{"color":"#225ea8"},"name":"","orientation":"h","showlegend":false,"textposition":"auto","type":"bar","x":[(11/N)*100, (2/N)*100],"y":["Self","Parent"],"texttemplate":"%{x:.1f}%"}],"layout":{"template":{"data":{"bar":[{"type":"bar","marker":{"line":{"width":0}}}]},"layout":{"font":{"color":"#343a40","family":"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#343a40"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"colorway":["#636EFA","#EF553B","#00CC96","#AB63FA","#FFA15A","#19D3F3","#FF6692","#B6E880","#FF97FF","#FECB52"]}},"legend":{"font":{"color":"#495057"}},"title":{"text":"Who Purchases Innerwear?"},"xaxis":{"domain":[0.0,1.0],"tickformat":",.0f","title":{"text":"Percentage of Respondents"},"ticksuffix":"%"},"yaxis":{"autorange":"reversed","domain":[0.0,1.0],"title":{"text":null}},"hovermode":"closest"}},
      qbq_fabric: {"data":[{"alignmentgroup":"True","hovertemplate":"Fabric=%{y}<br>Percentage=%{x:.1f}%<extra></extra>","marker":{"color":"#225ea8"},"name":"","orientation":"h","showlegend":false,"textposition":"auto","type":"bar","x":[(9/N)*100, (4/N)*100],"y":["Cotton","MicroModal"],"texttemplate":"%{x:.1f}%"}],"layout":{"template":{"data":{"bar":[{"type":"bar","marker":{"line":{"width":0}}}]},"layout":{"font":{"color":"#343a40","family":"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#343a40"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"colorway":["#636EFA","#EF553B","#00CC96","#AB63FA","#FFA15A","#19D3F3","#FF6692","#B6E880","#FF97FF","#FECB52"]}},"legend":{"font":{"color":"#495057"}},"title":{"text":"Preferred Fabric"},"xaxis":{"domain":[0.0,1.0],"tickformat":",.0f","title":{"text":"Percentage of Respondents"},"ticksuffix":"%"},"yaxis":{"autorange":"reversed","domain":[0.0,1.0],"title":{"text":null}},"hovermode":"closest"}},
      qbq_freecultr_purchased: {"data":[{"hoverinfo":"label+percent+value","labels":["No"],"marker":{"colors":["#adddce"]},"name":"","textinfo":"percent+label","textposition":"inside","type":"pie","values":[14]}],"layout":{"template":{"data":{"bar":[{"type":"bar","marker":{"line":{"width":0}}}]},"layout":{"font":{"color":"#343a40","family":"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#343a40"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"colorway":["#636EFA","#EF553B","#00CC96","#AB63FA","#FFA15A","#19D3F3","#FF6692","#B6E880","#FF97FF","#FECB52"]}},"legend":{"font":{"color":"#495057"}},"title":{"text":"Ever Purchased from Freecultr?"},"annotations":[]}},
      qbq_freecultr_heard: {"data":[{"hoverinfo":"label+percent+value","labels":["No","Yes"],"marker":{"colors":["#adddce","#43a2ca"]},"name":"","textinfo":"percent+label","textposition":"inside","type":"pie","values":[11,3]}],"layout":{"template":{"data":{"bar":[{"type":"bar","marker":{"line":{"width":0}}}]},"layout":{"font":{"color":"#343a40","family":"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#343a40"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"colorway":["#636EFA","#EF553B","#00CC96","#AB63FA","#FFA15A","#19D3F3","#FF6692","#B6E880","#FF97FF","#FECB52"]}},"legend":{"font":{"color":"#495057"}},"title":{"text":"Ever Heard of Freecultr?"},"annotations":[]}},
      // NEW: Word Frequency Chart
      qbq_word_frequency: {"data":[{"type":"bar","orientation":"h","y":["Comfort","Durable","Fit","Long-Lasting","Fabric","Price","Soft","Cotton","Designs","Identity","Appealing","Relaxation","Look","Affordable"],"x":[31.0,13.8,6.9,6.9,3.4,3.4,3.4,3.4,3.4,3.4,3.4,3.4,3.4,3.4],"text":["31.0%","13.8%","6.9%","6.9%","3.4%","3.4%","3.4%","3.4%","3.4%","3.4%","3.4%","3.4%","3.4%","3.4%"],"textposition":"inside","hovertemplate":"Word: %{y}<br>Percentage of Mentions: %{x:.1f}%<br>Count: %{customdata}<extra></extra>","customdata":[9,4,2,2,1,1,1,1,1,1,1,1,1,1],"marker":{"color":"#43a2ca"}}],"layout":{"template":{"data":{"bar":[{"type":"bar","marker":{"line":{"width":0}}}]},"layout":{"font":{"color":"#343a40","family":"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"},"paper_bgcolor":"white","plot_bgcolor":"white","title":{"font":{"color":"#343a40"}},"xaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"yaxis":{"gridcolor":"#e9ecef","linecolor":"#dee2e6","zerolinecolor":"#e9ecef","zerolinewidth":2},"colorway":["#636EFA","#EF553B","#00CC96","#AB63FA","#FFA15A","#19D3F3","#FF6692","#B6E880","#FF97FF","#FECB52"]}},"title":{"text":"Key Purchase Drivers (Word Frequency)"},"yaxis":{"autorange":"reversed","title":{"text":null},"automargin":true},"xaxis":{"title":{"text":"Percentage of Total Mentions"},"ticksuffix":"%"},"margin":{"l":100}}}
    };
    
    // Render all charts
    const chartIds = [
      'qbq_chart_brand_usage', 'qbq_chart_word_frequency', 'qbq_chart_gender', 'qbq_chart_ladder_male', 'qbq_chart_ladder_female',
      'qbq_chart_durability', 'qbq_chart_issues', 'qbq_chart_concept', 'qbq_chart_buyer',
      'qbq_chart_fabric', 'qbq_chart_freecultr_purchased', 'qbq_chart_freecultr_heard',
      'summary_chart_gender', 'summary_chart_brand_usage', 'summary_chart_word_frequency', 'summary_chart_ladder_male', 'summary_chart_ladder_female',
      'summary_chart_durability', 'summary_chart_issues', 'summary_chart_concept', 'summary_chart_buyer',
      'summary_chart_fabric', 'summary_chart_freecultr_purchased', 'summary_chart_freecultr_heard'
    ];
    
      chartIds.forEach(chartId => {
        const element = document.getElementById(chartId);
        if (element) {
          const chartKey = chartId.replace('summary_chart_', 'qbq_').replace('qbq_chart_', 'qbq_');
          const data = chartData[chartKey as keyof typeof chartData];
          if (data) {
            window.Plotly.newPlot(chartId, data.data, data.layout, plotConfig);
          }
        }
      });
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [plotlyLoaded, activeTab]);
  
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
              Innerwear Market Research
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto mt-8 shadow-lg"></div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-16">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="summary">Executive Summary</TabsTrigger>
              <TabsTrigger value="question-by-question">Question-by-Question</TabsTrigger>
              <TabsTrigger value="all-responses">All Responses</TabsTrigger>
            </TabsList>

            {/* Summary Tab */}
            <TabsContent value="summary" className="space-y-16">
              {/* Executive Summary - Professional Brand Health Study Style */}
              <div className="mb-16">
                <div className="bg-white rounded-lg shadow-lg border-2 border-blue-600 relative overflow-hidden">
                  {/* Decorative Corner Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent pointer-events-none"></div>
                  {/* Header Bar */}
                  <div className="border-b-2 border-blue-500 bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 relative">
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <h2 className="text-2xl font-bold text-white tracking-wide flex items-center gap-3">
                          <span className="w-1.5 h-8 bg-white rounded-full"></span>
                          EXECUTIVE SUMMARY
                        </h2>
                        <p className="mt-1.5 text-sm text-blue-100 font-medium">Innerwear Category Brand Health Study 2024</p>
                      </div>
                      <div className="flex items-center gap-6 text-sm bg-white/10 backdrop-blur-sm rounded-md px-4 py-2 border border-white/20">
                        <div className="flex items-center gap-2">
                          <div className="h-2.5 w-2.5 rounded-full bg-green-400 shadow-lg shadow-green-400/50"></div>
                          <span className="text-white font-semibold">n=14</span>
                        </div>
                        <div className="text-blue-200">|</div>
                        <span className="text-white font-medium">Q4 2024</span>
                      </div>
                    </div>
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-transparent via-white to-transparent pointer-events-none"></div>
                  </div>

                  <div className="p-8 space-y-8">
                    {/* KPI Dashboard */}
                    <div>
                      <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-5">Key Performance Indicators</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-md p-4 border-l-4 border-blue-600">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Market Leader</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">Jockey</p>
                          <p className="text-sm text-gray-600 mt-0.5">50% share</p>
                        </div>
                        <div className="bg-gray-50 rounded-md p-4 border-l-4 border-amber-600">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Durability Gap</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">6.25mo</p>
                          <p className="text-sm text-gray-600 mt-0.5">Expectation</p>
                        </div>
                        <div className="bg-gray-50 rounded-md p-4 border-l-4 border-red-600">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Pain Point</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">46%</p>
                          <p className="text-sm text-gray-600 mt-0.5">Loosening</p>
                        </div>
                        <div className="bg-gray-50 rounded-md p-4 border-l-4 border-purple-600">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Innovation</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">92%</p>
                          <p className="text-sm text-gray-600 mt-0.5">Skeptical</p>
                        </div>
                      </div>
                    </div>

                    {/* Category Dynamics */}
                    <div>
                      <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-5">Category Dynamics</h3>
                      <div className="bg-blue-50 rounded-md p-5 border border-blue-100">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          The innerwear category exhibits <strong className="font-semibold">strong incumbent advantage</strong> with Jockey maintaining 50% primary usage through habitual purchasing and distribution dominance. Critical <strong className="font-semibold">product dissatisfaction</strong> emerges from fabric/elastic degradation (46% incidence) occurring before the 6.25-month durability expectation. Innovation faces <strong className="font-semibold">extreme adoption barriers</strong> with 92% concept skepticism driven by perceived comfort trade-offs and price premiums.
                        </p>
                      </div>
                    </div>

                    {/* Strategic Imperatives */}
                    <div>
                      <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-5">Strategic Imperatives</h3>
                      <div className="space-y-3">
                        <div className="flex gap-4 items-start">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                            1
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">Disrupt Default Purchase Patterns</h4>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              Challenge Jockey's mindshare advantage through strategic shelf placement, digital point-of-purchase interventions, and subscription models that bypass traditional retail decision points. Focus on moments of dissatisfaction to drive trial.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex gap-4 items-start">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                            2
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">Engineering-First Product Development</h4>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              Prioritize R&D investment in elastic retention technology. Position durability as primary value proposition with quantifiable guarantees (e.g., "9-month shape warranty"). Leverage material innovation as competitive moat.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex gap-4 items-start">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                            3
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">Evidence-Based Innovation Adoption</h4>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              Address skepticism through extensive trial programs, transparent specifications, and comfort-first messaging. Deploy dual-line strategy: mainstream comfort positioning + niche performance sub-brand for style-conscious segment.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Market Composition */}
                    <div className="pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
                        <div>
                          <p className="font-semibold text-gray-700 uppercase tracking-wide mb-1">Top Driver</p>
                          <p className="text-gray-600">Comfort (31%)</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700 uppercase tracking-wide mb-1">Gender Mix</p>
                          <p className="text-gray-600">79% M / 21% F</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700 uppercase tracking-wide mb-1">Fabric Pref</p>
                          <p className="text-gray-600">Cotton 64%</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700 uppercase tracking-wide mb-1">Purchase</p>
                          <p className="text-gray-600">Self 79%</p>
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
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">RESPONDENT PROFILE</h2>
                  </div>
                  
                  <div className="p-8 space-y-8">
                    {/* Sample Overview */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-5">Sample Composition</h3>
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-md p-5 border-l-4 border-gray-600">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Sample</p>
                          <p className="text-3xl font-bold text-gray-900 mt-1">N=14</p>
                          <p className="text-sm text-gray-700 mt-2">Respondents</p>
                        </div>
                        <div className="bg-blue-50 rounded-md p-5 border-l-4 border-blue-600">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Male</p>
                          <p className="text-3xl font-bold text-gray-900 mt-1">79%</p>
                          <p className="text-sm text-gray-700 mt-2">11 respondents</p>
                        </div>
                        <div className="bg-pink-50 rounded-md p-5 border-l-4 border-pink-500">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Female</p>
                          <p className="text-3xl font-bold text-gray-900 mt-1">21%</p>
                          <p className="text-sm text-gray-700 mt-2">3 respondents</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-md p-5 border border-blue-100">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          <strong className="font-semibold">Sample Context:</strong> Cross-gender qualitative study providing directional insights into brand preferences, purchase drivers, and category dynamics within the innerwear market. Male-skewed composition reflects primary category penetration patterns.
                        </p>
                      </div>
                    </div>

                    {/* Gender Distribution Chart */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Gender Distribution</h3>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div id="summary_chart_gender" className="w-full max-h-[400px]"></div>
                      </div>
                    </div>

                    {/* Key Demographics Grid */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Sample Characteristics</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                          <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Purchase Decision-Maker</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-700">Self-purchase</span>
                              <span className="text-sm font-semibold text-gray-900">79%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-700">Parent/Family</span>
                              <span className="text-sm font-semibold text-gray-900">14%</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                          <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Primary Brand Usage</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-700">Jockey</span>
                              <span className="text-sm font-semibold text-gray-900">50%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-700">Enamor</span>
                              <span className="text-sm font-semibold text-gray-900">21%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-700">Others</span>
                              <span className="text-sm font-semibold text-gray-900">29%</span>
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
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">BRAND LANDSCAPE & PURCHASE DRIVERS</h2>
                  </div>
                
                  <div className="p-8 space-y-8">
                    {/* Market Share Analysis */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-5">Market Share Analysis</h3>
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-md p-4 border-l-4 border-blue-600">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Leader</p>
                          <p className="text-xl font-bold text-gray-900 mt-1">Jockey</p>
                          <p className="text-sm text-gray-600 mt-0.5">50% primary usage</p>
                        </div>
                        <div className="bg-gray-50 rounded-md p-4 border-l-4 border-gray-400">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Challenger</p>
                          <p className="text-xl font-bold text-gray-900 mt-1">Enamor</p>
                          <p className="text-sm text-gray-600 mt-0.5">21% primary usage</p>
                        </div>
                        <div className="bg-gray-50 rounded-md p-4 border-l-4 border-gray-300">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Others</p>
                          <p className="text-xl font-bold text-gray-900 mt-1">Various</p>
                          <p className="text-sm text-gray-600 mt-0.5">29% combined</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-md p-5 border border-blue-100">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          <strong className="font-semibold">Jockey maintains category dominance</strong> with 50% primary brand usage, leveraging distribution strength and habitual purchase patterns. Secondary brands including Enamor (21%), Marks & Spencer, and Calvin Klein operate as niche alternatives, primarily competing on specific attributes rather than overall market position.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8 p-4">
                      <div id="summary_chart_brand_usage" className="w-full min-h-[600px]"></div>
                    </div>
                    
                    {/* Purchase Drivers Analysis */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Key Purchase Drivers</h3>
                      <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <div id="summary_chart_word_frequency" className="w-full min-h-[500px]"></div>
                      </div>
                    </div>

                    {/* Brand-Specific Drivers */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-5">Brand-Specific Purchase Drivers</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {/* Jockey */}
                        <div className="bg-blue-50 rounded-md p-5 border border-blue-100">
                          <div className="mb-4 pb-3 border-b border-blue-200">
                            <h4 className="text-sm font-bold text-gray-900">Jockey</h4>
                            <p className="text-xs text-gray-600 mt-1">Market leader drivers</p>
                          </div>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">Comfort & Softness</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">Durability & Quality</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">Brand Popularity</span>
                            </li>
                          </ul>
                        </div>

                        {/* Enamor */}
                        <div className="bg-purple-50 rounded-md p-5 border border-purple-100">
                          <div className="mb-4 pb-3 border-b border-purple-200">
                            <h4 className="text-sm font-bold text-gray-900">Enamor</h4>
                            <p className="text-xs text-gray-600 mt-1">Challenger brand drivers</p>
                          </div>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">Comfort & Softness</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">Style & Design</span>
                            </li>
                          </ul>
                        </div>

                        {/* H&M */}
                        <div className="bg-teal-50 rounded-md p-5 border border-teal-100">
                          <div className="mb-4 pb-3 border-b border-teal-200">
                            <h4 className="text-sm font-bold text-gray-900">H&M</h4>
                            <p className="text-xs text-gray-600 mt-1">Alternative brand drivers</p>
                          </div>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">Good Fit</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">Comfort & Softness</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">Style & Design</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* Key Insight */}
                      <div className="mt-6 bg-blue-50 rounded-md p-5 border border-blue-100">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          <strong className="font-semibold">Universal Driver:</strong> "Comfort & Softness" emerges as non-negotiable baseline across all brands. Differentiation occurs through secondary attributes—Jockey leverages durability and brand trust, Enamor emphasizes style, while H&M focuses on fit optimization.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand Perception & Ranking */}
              <div className="mb-16">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-8 py-5">
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">BRAND PERCEPTION & RANKING</h2>
                  </div>
                  
                  <div className="p-8 space-y-8">
                    {/* Gender-Specific Brand Hierarchy */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-5">Gender-Specific Brand Hierarchy</h3>
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-blue-50 rounded-md p-5 border border-blue-100">
                          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Male Respondents</h4>
                          <p className="text-sm text-gray-700 leading-relaxed mb-3">
                            <strong className="font-semibold">Jockey</strong> maintains dominant #1 position with significant margin. Competitors including <strong className="font-semibold">XYXX and Damensch</strong> show awareness but lag substantially in preference scores.
                          </p>
                          <p className="text-xs text-gray-600">Primary driver: Brand familiarity + product reliability</p>
                        </div>
                        <div className="bg-purple-50 rounded-md p-5 border border-purple-100">
                          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Female Respondents</h4>
                          <p className="text-sm text-gray-700 leading-relaxed mb-3">
                            <strong className="font-semibold">Enamor</strong> leads preference rankings, with <strong className="font-semibold">Zivame</strong> as key alternative. Jockey present but does not demonstrate male-segment dominance levels.
                          </p>
                          <p className="text-xs text-gray-600">Primary driver: Style + comfort balance</p>
                        </div>
                      </div>
                    </div>

                    {/* Ranking Methodology */}
                    <div className="bg-gray-50 rounded-md p-5 border border-gray-200">
                      <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Methodology: Weighted Rank Score</h4>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-700">
                        <span><strong className="font-semibold">#1 Rank:</strong> 4 points</span>
                        <span className="text-gray-400">|</span>
                        <span><strong className="font-semibold">#2 Rank:</strong> 3 points</span>
                        <span className="text-gray-400">|</span>
                        <span><strong className="font-semibold">#3 Rank:</strong> 2 points</span>
                        <span className="text-gray-400">|</span>
                        <span><strong className="font-semibold">#4 Rank:</strong> 1 point</span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div id="summary_chart_ladder_male" className="w-full min-h-[500px]"></div>
                    </div>
                    <div className="p-4">
                      <div id="summary_chart_ladder_female" className="w-full min-h-[500px]"></div>
                    </div>

                    {/* Key Ranking Drivers */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Key Ranking Drivers</h3>
                      <div className="bg-blue-50 rounded-md p-5 border border-blue-100">
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                            <span><strong className="font-semibold">Comfort & Softness:</strong> Primary determinant across all segments</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                            <span><strong className="font-semibold">Durability & Quality:</strong> Core expectation for premium pricing</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                            <span><strong className="font-semibold">Style & Design:</strong> Differentiation factor among alternatives</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Lifecycle & Pain Points */}
              <div className="mb-16">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-8 py-5">
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">PRODUCT LIFECYCLE & PAIN POINTS</h2>
                  </div>
                  
                  <div className="p-8 space-y-8">
                    {/* Durability Expectations */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-5">Durability Expectations vs. Reality</h3>
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 rounded-md p-5 border-l-4 border-blue-600">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Median</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">6.25</p>
                          <p className="text-sm text-gray-600 mt-0.5">months expected</p>
                        </div>
                        <div className="bg-blue-50 rounded-md p-5 border-l-4 border-blue-500">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Mean</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">7.33</p>
                          <p className="text-sm text-gray-600 mt-0.5">months expected</p>
                        </div>
                        <div className="bg-red-50 rounded-md p-5 border-l-4 border-red-600">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Gap</p>
                          <p className="text-2xl font-bold text-red-600 mt-1">46%</p>
                          <p className="text-sm text-gray-600 mt-0.5">report elastic failure</p>
                        </div>
                      </div>
                      <div className="bg-amber-50 rounded-md p-5 border border-amber-100">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          <strong className="font-semibold">Expectation-Reality Gap:</strong> Clear benchmark set at 6-7 months, yet significant failure rates suggest brands underdeliver on durability promise. Primary failure mode (elastic/fabric loosening) directly compromises core benefit of comfort and fit.
                        </p>
                      </div>
                    </div>

                    <div className="p-4">
                      <div id="summary_chart_durability" className="w-full min-h-[500px]"></div>
                    </div>

                    {/* Issue Analysis */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Primary Pain Points</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 bg-red-50 rounded-md p-4 border-l-4 border-red-600">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">Fabric / Elastic Loosening</p>
                            <p className="text-xs text-gray-600 mt-0.5">Core structural failure affecting fit integrity</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-red-600">46%</p>
                            <p className="text-xs text-gray-600">of sample</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 bg-orange-50 rounded-md p-4 border-l-4 border-orange-500">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">Causes Discomfort / Heat</p>
                            <p className="text-xs text-gray-600 mt-0.5">Thermal regulation and material comfort issues</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-orange-600">23%</p>
                            <p className="text-xs text-gray-600">of sample</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 bg-gray-50 rounded-md p-4 border-l-4 border-gray-400">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">Other Issues</p>
                            <p className="text-xs text-gray-600 mt-0.5">Poor durability/tearing (8%), Fit/sizing issues (8%)</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-gray-600">16%</p>
                            <p className="text-xs text-gray-600">combined</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div id="summary_chart_issues" className="w-full min-h-[500px]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Concept Test & Market Opportunity */}
              <div className="mb-16">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-8 py-5">
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">CONCEPT TEST & MARKET OPPORTUNITY</h2>
                  </div>
                  
                  <div className="p-8 space-y-8">
                    {/* Concept Reception */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-5">Innovation Concept: "Look Noticeably Fitter"</h3>
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-red-50 rounded-md p-5 border-l-4 border-red-600">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Rejection Rate</p>
                          <p className="text-3xl font-bold text-red-600 mt-1">93%</p>
                          <p className="text-sm text-gray-700 mt-2">Skeptical or unwilling to try</p>
                        </div>
                        <div className="bg-green-50 rounded-md p-5 border-l-4 border-green-500">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Interest Rate</p>
                          <p className="text-3xl font-bold text-green-600 mt-1">7%</p>
                          <p className="text-sm text-gray-700 mt-2">Interested/Would try</p>
                        </div>
                      </div>
                      <div className="bg-amber-50 rounded-md p-5 border border-amber-100">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          <strong className="font-semibold">High Barrier to Entry:</strong> Shape-enhancement claims trigger skepticism rooted in comfort/material concerns. Respondents fear "shapewear-like" compression will compromise breathability and daily wearability. Trust deficit suggests product trial (not marketing) is critical adoption driver.
                        </p>
                      </div>
                    </div>

                    <div className="p-4">
                      <div id="summary_chart_concept" className="w-full min-h-[500px]"></div>
                    </div>

                    {/* Barriers & Opportunities */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Primary Barriers</h4>
                        <div className="space-y-2">
                          <div className="bg-red-50 rounded-md p-3 border border-red-100">
                            <p className="text-sm font-semibold text-gray-900">Comfort/Material Skepticism</p>
                            <p className="text-xs text-gray-600 mt-1">Fear of restrictive, uncomfortable fit</p>
                          </div>
                          <div className="bg-red-50 rounded-md p-3 border border-red-100">
                            <p className="text-sm font-semibold text-gray-900">Need for Tactile Verification</p>
                            <p className="text-xs text-gray-600 mt-1">Must physically test before purchase</p>
                          </div>
                          <div className="bg-red-50 rounded-md p-3 border border-red-100">
                            <p className="text-sm font-semibold text-gray-900">Price Sensitivity</p>
                            <p className="text-xs text-gray-600 mt-1">Concerns about premium pricing</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Niche Opportunity</h4>
                        <div className="bg-green-50 rounded-md p-3 border border-green-100 mb-3">
                          <p className="text-sm font-semibold text-gray-900">Style-Conscious Segment</p>
                          <p className="text-xs text-gray-600 mt-1">Innerwear as fashion statement</p>
                        </div>
                        <div className="bg-blue-50 rounded-md p-4 border border-blue-200">
                          <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2">Strategic Implication</p>
                          <p className="text-sm text-gray-700">Product sampling and in-store trials essential for overcoming trust barrier. Marketing claims alone insufficient to drive adoption.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchaser & Fabric Insights */}
              <div className="mb-16">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-8 py-5">
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">PURCHASER & FABRIC INSIGHTS</h2>
                  </div>
                  
                  <div className="p-8 space-y-8">
                    {/* Purchase Decision-Making */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-5">Purchase Decision-Making</h3>
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 rounded-md p-5 border-l-4 border-blue-600 md:col-span-2">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Primary Purchaser</p>
                          <p className="text-3xl font-bold text-gray-900 mt-1">79%</p>
                          <p className="text-sm text-gray-700 mt-2">Self-purchase (individual decision-makers)</p>
                        </div>
                        <div className="bg-gray-50 rounded-md p-5 border-l-4 border-gray-400">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Secondary</p>
                          <p className="text-3xl font-bold text-gray-900 mt-1">14%</p>
                          <p className="text-sm text-gray-700 mt-2">Parent purchase</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-md p-5 border border-blue-100">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          <strong className="font-semibold">Self-Driven Purchase Behavior:</strong> High individual agency in category indicates personal preference/comfort prioritized over household/family input. Marketing and retail strategies should target individual consumers directly.
                        </p>
                      </div>
                    </div>

                    <div className="p-4">
                      <div id="summary_chart_buyer" className="w-full min-h-[500px]"></div>
                    </div>

                    {/* Fabric Preferences */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-5">Fabric Preferences</h3>
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-green-50 rounded-md p-5 border-l-4 border-green-600">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Dominant Choice</p>
                          <p className="text-3xl font-bold text-gray-900 mt-1">64%</p>
                          <p className="text-sm text-gray-700 mt-2 font-semibold">Cotton</p>
                          <p className="text-xs text-gray-600 mt-1">Familiarity + breathability driver</p>
                        </div>
                        <div className="bg-teal-50 rounded-md p-5 border-l-4 border-teal-500">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Alternative</p>
                          <p className="text-3xl font-bold text-gray-900 mt-1">29%</p>
                          <p className="text-sm text-gray-700 mt-2 font-semibold">MicroModal</p>
                          <p className="text-xs text-gray-600 mt-1">Premium comfort positioning</p>
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-md p-5 border border-green-100">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          <strong className="font-semibold">Cotton Dominance:</strong> Natural fiber preference reflects comfort-first mindset and resistance to synthetic alternatives. MicroModal presence indicates premium segment willing to trial advanced materials if comfort claims validated.
                        </p>
                      </div>
                    </div>

                    <div className="p-4">
                      <div id="summary_chart_fabric" className="w-full min-h-[500px]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Freecultr Brand Familiarity */}
              <div className="mb-16">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-8 py-5">
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">FREECULTR BRAND FAMILIARITY</h2>
                  </div>
                  
                  <div className="p-8 space-y-8">
                    {/* Brand Awareness Baseline */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-5">Brand Awareness Baseline</h3>
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-red-50 rounded-md p-5 border-l-4 border-red-600">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Purchase History</p>
                          <p className="text-3xl font-bold text-red-600 mt-1">0%</p>
                          <p className="text-sm text-gray-700 mt-2">Have purchased Freecultr</p>
                        </div>
                        <div className="bg-red-50 rounded-md p-5 border-l-4 border-red-500">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Brand Awareness</p>
                          <p className="text-3xl font-bold text-red-600 mt-1">21%</p>
                          <p className="text-sm text-gray-700 mt-2">Have heard of Freecultr</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-md p-5 border border-gray-200">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          <strong className="font-semibold">Low Market Penetration:</strong> Minimal brand awareness (21% aided recall, 0% purchase) establishes baseline for market entry challenge. As non-customer survey, data confirms Freecultr operates below threshold of spontaneous brand consideration in category.
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="p-4">
                        <div id="summary_chart_freecultr_purchased" className="w-full min-h-[500px]"></div>
                      </div>
                      <div className="p-4">
                        <div id="summary_chart_freecultr_heard" className="w-full min-h-[500px]"></div>
                      </div>
                    </div>

                    {/* Strategic Implications */}
                    <div className="bg-blue-50 rounded-md p-5 border border-blue-200">
                      <h4 className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-3">Market Entry Implications</h4>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p><strong className="font-semibold">• Distribution Challenge:</strong> Low awareness suggests limited retail presence or online visibility</p>
                        <p><strong className="font-semibold">• Brand Building Required:</strong> Significant marketing investment needed to achieve category consideration</p>
                        <p><strong className="font-semibold">• Opportunity for Differentiation:</strong> Clean slate allows positioning distinct from incumbent brands</p>
                      </div>
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
                <p className="text-lg text-muted-foreground mt-6">
                  Detailed breakdown of each survey question with visualizations
                </p>
              </div>

              {/* Primary Brand Usage */}
              <DeepDiveCard>
                <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full mr-4"></div>
                  Primary Brand Usage
                </h3>
                <div className="p-4">
                  <div id="qbq_chart_brand_usage" className="w-full min-h-[600px]"></div>
                </div>
              </DeepDiveCard>

              {/* Word Frequency Chart */}
              <DeepDiveCard>
                <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full mr-4"></div>
                  Key Purchase Drivers (Word Frequency)
                </h3>
                <div className="p-4">
                  <div id="qbq_chart_word_frequency" className="w-full min-h-[600px]"></div>
                </div>
                
                <PremiumCard
                  className="mt-8"
                  glowClass="bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_65%)]"
                  innerClassName="p-6 space-y-6"
                >
                  <h4 className="text-2xl font-bold text-foreground mb-4">Key Purchase Drivers (Top Brands)</h4>
                  <div className="space-y-6">
                    <div className="bg-white/60 p-4 rounded-lg border border-blue-200">
                      <h5 className="text-lg font-bold text-white bg-blue-600 px-4 py-2 rounded-md inline-block mb-3">Jockey</h5>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>Comfort & Softness</li>
                        <li>Durability & Quality</li>
                        <li>Brand Popularity</li>
                      </ul>
                    </div>
                    <div className="bg-white/60 p-4 rounded-lg border border-blue-200">
                      <h5 className="text-lg font-bold text-white bg-blue-600 px-4 py-2 rounded-md inline-block mb-3">Enamor</h5>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>Comfort & Softness</li>
                        <li>Style & Design</li>
                      </ul>
                    </div>
                    <div className="bg-white/60 p-4 rounded-lg border border-blue-200">
                      <h5 className="text-lg font-bold text-white bg-blue-600 px-4 py-2 rounded-md inline-block mb-3">H&M</h5>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>Good Fit</li>
                        <li>Comfort & Softness</li>
                        <li>Style & Design</li>
                      </ul>
                    </div>
                  </div>
                </PremiumCard>
              </DeepDiveCard>

              {/* Gender Split */}
              <DeepDiveCard>
                <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full mr-4"></div>
                  Gender Split
                </h3>
                <div className="p-4">
                  <div id="qbq_chart_gender" className="w-full min-h-[500px]"></div>
                </div>
              </DeepDiveCard>

              {/* Brand Ladder */}
              <DeepDiveCard>
                <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full mr-4"></div>
                  Brand Ladder
                </h3>
                <div className="bg-white/60 p-4 rounded-lg border border-blue-200 mb-6">
                  <p className="text-sm text-muted-foreground">
                    Brand rank is calculated using a <strong className="text-foreground">Weighted Rank Score</strong>. Respondents were asked to rank brands:
                    <br />
                    <strong className="text-foreground">#1 Rank</strong> = 4 points | <strong className="text-foreground">#2 Rank</strong> = 3 points | <strong className="text-foreground">#3 Rank</strong> = 2 points | <strong className="text-foreground">#4 Rank</strong> = 1 point
                  </p>
                </div>
                <div className="space-y-8">
                  <div className="p-4">
                    <div id="qbq_chart_ladder_male" className="w-full min-h-[500px]"></div>
                  </div>
                  <div className="p-4">
                    <div id="qbq_chart_ladder_female" className="w-full min-h-[500px]"></div>
                  </div>
                </div>
                <div className="mt-6 bg-white/60 p-6 rounded-xl border border-blue-200">
                  <h5 className="text-xl font-bold text-foreground mb-3">Key Reasons for #1 Ranking</h5>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Comfort & Softness</li>
                    <li>Durability & Quality</li>
                  </ul>
                </div>
              </DeepDiveCard>

              {/* Durability Expectation */}
              <DeepDiveCard>
                <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full mr-4"></div>
                  Durability Expectation
                </h3>
                <div className="p-4">
                  <div id="qbq_chart_durability" className="w-full min-h-[500px]"></div>
                </div>
                <div className="mt-6 bg-white/60 p-6 rounded-xl border border-blue-200">
                  <ul className="space-y-2 text-lg text-muted-foreground">
                    <li><strong className="text-foreground">Median Expectation:</strong> 6.25 months</li>
                    <li><strong className="text-foreground">Average Expectation:</strong> 7.33 months</li>
                  </ul>
                </div>
              </DeepDiveCard>

              {/* Persistent Issues */}
              <DeepDiveCard>
                <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full mr-4"></div>
                  Persistent Issues & Frustrations
                </h3>
                <div className="p-4">
                  <div id="qbq_chart_issues" className="w-full min-h-[500px]"></div>
                </div>
                <div className="mt-6 bg-white/60 p-6 rounded-xl border border-blue-200">
                  <ul className="space-y-2 text-lg text-muted-foreground">
                    <li><strong className="text-red-600">Fabric / Elastic Loosening:</strong> 46%</li>
                    <li><strong className="text-orange-600">Causes Discomfort / Heat:</strong> 23%</li>
                    <li><strong className="text-orange-500">Poor Durability / Tearing:</strong> 8%</li>
                    <li><strong className="text-orange-500">Fit / Sizing Issues:</strong> 8%</li>
                  </ul>
                </div>
              </DeepDiveCard>

              {/* Concept Test */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl border border-slate-200 mb-12">
                <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full mr-4"></div>
                  Concept Test: 'Noticeably Fitter' Innerwear
                </h3>
                <div className="p-4">
                  <div id="qbq_chart_concept" className="w-full min-h-[500px]"></div>
                </div>
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div className="bg-white/60 p-6 rounded-xl border border-orange-200">
                    <h5 className="text-xl font-bold text-foreground mb-3">Reasons for Skepticism</h5>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>Skepticism about Comfort/Material</li>
                      <li>Desire to Verify Material/Comfort</li>
                    </ul>
                  </div>
                  <div className="bg-white/60 p-6 rounded-xl border border-green-200">
                    <h5 className="text-xl font-bold text-foreground mb-3">Reasons for Interest</h5>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>Style & Design</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Who Buys & Preferred Fabric */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl border border-slate-200 mb-12">
                <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full mr-4"></div>
                  Who Buys Innerwear?
                </h3>
                <div className="p-4 mb-12">
                  <div id="qbq_chart_buyer" className="w-full min-h-[500px]"></div>
                </div>
                
                <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full mr-4"></div>
                  Preferred Fabric
                </h3>
                <div className="p-4">
                  <div id="qbq_chart_fabric" className="w-full min-h-[500px]"></div>
                </div>
              </div>

              {/* Freecultr Familiarity */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl border border-slate-200 mb-12">
                <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full mr-4"></div>
                  Freecultr Familiarity
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-4">
                    <div id="qbq_chart_freecultr_purchased" className="w-full min-h-[500px]"></div>
                  </div>
                  <div className="p-4">
                    <div id="qbq_chart_freecultr_heard" className="w-full min-h-[500px]"></div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* All Responses Tab */}
            <TabsContent value="all-responses" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-foreground mb-4 drop-shadow-lg">All Responses</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto shadow-lg"></div>
                <p className="text-lg text-muted-foreground mt-6">
                  Complete list of survey respondents and their responses
                </p>
              </div>

              <div className="bg-white rounded-xl border border-border shadow-lg overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <TableHead className="font-bold text-xs sm:text-sm px-3 py-4 text-left align-top">No</TableHead>
                      <TableHead className="font-bold text-xs sm:text-sm px-3 py-4 text-left align-top">Age</TableHead>
                      <TableHead className="font-bold text-xs sm:text-sm px-3 py-4 text-left align-top">Gender</TableHead>
                      <TableHead className="font-bold text-xs sm:text-sm px-3 py-4 text-left align-top min-w-[120px]">Brand</TableHead>
                      <TableHead className="font-bold text-xs sm:text-sm px-3 py-4 text-left align-top min-w-[200px]">Top Words</TableHead>
                      <TableHead className="font-bold text-xs sm:text-sm px-3 py-4 text-left align-top min-w-[300px]">Reason for #1</TableHead>
                      <TableHead className="font-bold text-xs sm:text-sm px-3 py-4 text-left align-top min-w-[180px]">Issue</TableHead>
                      <TableHead className="font-bold text-xs sm:text-sm px-3 py-4 text-left align-top min-w-[120px]">Reaction</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {respondents.map((respondent) => (
                      <TableRow key={respondent.id} className="hover:bg-blue-50/50 transition-colors border-b">
                        <TableCell className="font-medium text-xs sm:text-sm px-3 py-4 align-top">{respondent.id}</TableCell>
                        <TableCell className="text-xs sm:text-sm px-3 py-4 align-top">{respondent.age || '-'}</TableCell>
                        <TableCell className="text-xs sm:text-sm px-3 py-4 align-top whitespace-nowrap">{respondent.gender}</TableCell>
                        <TableCell className="text-xs sm:text-sm px-3 py-4 align-top">
                          <div className="break-words leading-relaxed">{respondent.primaryBrand}</div>
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm px-3 py-4 align-top">
                          <div className="break-words leading-relaxed">{respondent.topWords}</div>
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm px-3 py-4 align-top">
                          <div className="break-words leading-relaxed">{respondent.reasonForRank || '-'}</div>
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm px-3 py-4 align-top">
                          <div className="break-words leading-relaxed">{respondent.persistentIssue || '-'}</div>
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm px-3 py-4 align-top">
                          <div className="break-words leading-relaxed">{respondent.conceptReaction}</div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-8 rounded-xl border border-blue-200 mt-8">
                <p className="text-sm text-muted-foreground text-center">
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
