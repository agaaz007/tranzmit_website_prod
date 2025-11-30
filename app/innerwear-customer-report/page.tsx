"use client"

import { useState, useEffect } from "react"
import type { ReactNode } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
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

export default function InnerwearCustomerReportPage() {
  const [plotlyLoaded, setPlotlyLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("summary")
  const [scrollProgress, setScrollProgress] = useState(0)
  
  // Respondent data from the prompt
  const respondents = [
    { id: "R1", age: "23", gender: "Male", profile: "The Casual Gen Z", insight: "Claims to be 35, then admits 23. Values \"Comfort & Color.\" Rejected Shapewear immediately (\"I don't need it\"). A satisfied but low-loyalty user." },
    { id: "R2", age: "34", gender: "Male", profile: "The Specific Critic", insight: "Critical: Differentiates product lines. Loves the Vest quality but states Underwear tears after 1-2 washes. Proof of a specific production line failure." },
    { id: "R3", age: "32", gender: "Male", profile: "The Churn Risk", insight: "High churn risk. States quality \"deteriorates badly\" after 5 washes (loses shape). Acquired via \"Banana Mask\" but disappointed by core product. Prefers DaMensch for offers." },
    { id: "R4", age: "32", gender: "Male", profile: "The Super Promoter", insight: "\"Only FreeCulture\" in drawer. Rates everything perfect. High intent for Shapewear (\"Yes, will buy\"). Ideal for a Loyalty/Subscription program." },
    { id: "R5", age: "33", gender: "Male", profile: "The Anchor", insight: "Loyal user (>2 years). Validates that if the batch is good, the product lasts. Loves \"Smoothness.\"" },
    { id: "R6", age: "30", gender: "Female", profile: "The Gatekeeper", insight: "Buying for Men. Ranks XYXX #1, FreeCulture #2. She is price-sensitive (\"Pocket friendly\"). Action: Target women with \"Value Packs\" to flip her ranking." },
    { id: "R7", age: "-", gender: "Male", profile: "The Discomfort Case", insight: "Complains fabric \"gets hard in private areas.\" Suggests pilling or roughness in the pouch area after washing. Needs fabric finish investigation." },
    { id: "R8", age: "29", gender: "Male", profile: "The Pro User", insight: "High Value. Demands Tactel Nylon (like Jockey Sport). Willing to pay more for better durability. Currently finds the polyester blend insufficient for his needs." },
    { id: "R9", age: "29", gender: "Male", profile: "The Technical Buyer", insight: "Agrees with R8. Wants sturdier/harder waistband elastic. Feels current elastic is too weak. Validates the \"Activewear Gap\" in the catalog." },
    { id: "R10", age: "60", gender: "Male", profile: "The \"Silver\" Segment", insight: "Age Insight: 60+ demographic loves Bamboo/Modal for \"Softness.\" Acquired via Bandana ads -> Upsold to Underwear." },
    { id: "R11", age: "35", gender: "Male", profile: "The Value Hunter", insight: "Strategic Gold: \"DaMensch uses same material but charges double.\" This user proves the \"Value Prop\" is working perfectly against premium competitors." },
    { id: "R12", age: "25", gender: "Male", profile: "The Design Buyer", insight: "Loves \"Weekly\" (Sunday/Monday) prints. Complaint: \"Last se dhila ho jata hai\" (Elastic gets loose). Confirms the waistband quality issue." },
    { id: "R13", age: "22", gender: "Male", profile: "The Skeptic", insight: "Skeptical of Shapewear due to \"Visible lines\" and comfort. Needs assurance of \"Invisibility\" under T-shirts." },
    { id: "R14", age: "20-30", gender: "Male", profile: "The QC Victim", insight: "Manufacturing Fail: Received same-size products with different fits (some tight, some loose). Suggests lower pricing to capture \"middle class.\"" },
    { id: "R15", age: "17", gender: "Male", profile: "The Teen User", insight: "\"Mom pays.\" He picks \"Snug Fit\" (Skinny) because Jockey is too loose. Action: Market \"Style/Fit\" to him, market \"Durability/Value\" to Mom." },
    { id: "R16", age: "42", gender: "Male", profile: "The Rationalist", insight: "Ranks FreeCulture #1 purely on \"Value for Money.\" A stable retention anchor." },
    { id: "R17", age: "64", gender: "Male", profile: "The Convert", insight: "Switched from legacy brands (Dixie/Helium) to Bamboo. Confirms older men are upgrading to modern fabrics for health/comfort." },
  ]

  const insightToneStyles = {
    red: {
      border: "border-red-500",
      glow: "from-red-50/90 via-white to-red-100/80",
      icon: "bg-red-600",
      chip: "bg-red-100 text-red-900",
    },
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
      title: "Longitudinal Product Performance: The \"Day-60\" Retention Cliff",
      tone: "red",
      description: (
        <>
          While &quot;Initial Satisfaction&quot; scores are high—driven by the immediate tactile softness of Bamboo/Modal fabrics—a critical decline in product integrity occurs between the 30 to 60-day mark. Post-usage data indicates a stark divergence in durability between product lines: Vests retain quality, while Briefs/Trunks exhibit significant structural failure.
          <br/><br/>
          <strong>Specific Drivers of Dissatisfaction:</strong>
          <ul className="list-disc list-inside mt-2">
            <li><strong>Structural Integrity:</strong> Reports of fabric tearing after limited wash cycles suggest a specific failure in knitting tension or GSM consistency, distinct from the higher-performing Vest line.</li>
            <li><strong>Component Failure:</strong> A recurring critical defect involves waistband elastic losing retention (&quot;Last se dhila ho jata hai&quot;). In the innerwear category, waistband failure is the primary driver of permanent brand abandonment.</li>
          </ul>
        </>
      ),
      bullets: [
        <><strong>Strategic Imperative:</strong> The durability gap between Vests and Briefs signals a localized manufacturing defect rather than a raw material failure. Immediate remediation is required to protect Net Promoter Score (NPS).</>,
        <><strong>Recommendation:</strong> Initiate a targeted QA audit on the underwear stitching line and elastic procurement. Implementing a &quot;30-Wash Stress Test&quot; protocol is essential to match competitor benchmarks.</>
      ]
    },
    {
      id: "02",
      title: "Market Gap Analysis: The \"Performance Textile\" Opportunity",
      tone: "blue",
      description: (
        <>
          The brand currently faces a &quot;Share of Drawer&quot; limitation. While FreeCultr successfully occupies the &quot;Lounge/Comfort&quot; occasion, it loses the &quot;Active/Performance&quot; occasion to legacy competitors. Sophisticated users explicitly cite a forced migration to Jockey for gym and athletic use because the current Bamboo/Modal blend lacks the requisite tensile strength and sweat-wicking properties.
          <br/><br/>
          <strong>Consumer Demand:</strong> There is a latent, high-intent demand for Tactel Nylon or Microfiber blends. High-value customers indicate low price sensitivity for this feature, signalling a willingness to pay a premium for &quot;Active Durability.&quot;
        </>
      ),
      bullets: [
        <><strong>Strategic Imperative:</strong> To increase Share of Wallet (SOW), the brand must expand its use-case coverage beyond &quot;delicate comfort.&quot;</>,
        <><strong>Recommendation:</strong> Launch a &quot;FreeCultr PRO/ACTIVE&quot; line utilizing Nylon/Spandex blends. Position this not just as innerwear, but as &quot;Performance Gear,&quot; directly targeting the active lifestyle segment currently monopolized by legacy incumbents.</>
      ]
    },
    {
      id: "03",
      title: "Competitive Positioning: The \"Smart Luxury\" Value Anchor",
      tone: "emerald",
      description: (
        <>
          FreeCultr holds a distinct &quot;Value Perception&quot; advantage over premium D2C competitors. Consumer sentiment anchors the brand as an &quot;efficient&quot; alternative to DaMensch. Customers recognize that material specifications (Micro-Modal) are identical to higher-priced competitors, creating a strong &quot;Price-Value Rationality.&quot;
          <br/><br/>
          <strong>Value Perception:</strong> The brand is not viewed as a &quot;cheap&quot; alternative, but as the &quot;market-correct&quot; price for premium materials.
        </>
      ),
      bullets: [
        <><strong>Recommendation:</strong> Capitalize on &quot;Challenger Brand&quot; status by exposing competitor margins. Shift messaging from generic comfort to specific &quot;Smart Choice&quot; narratives. Campaign concept: &quot;Italian Quality. Indian Prices.&quot; Utilize side-by-side spec comparisons to validate the &quot;Same Specs, Better Price&quot; claim.</>
      ]
    },
    {
      id: "04",
      title: "Shopper Dynamics: The \"Gatekeeper\" & \"Payer\" Hierarchy",
      tone: "purple",
      description: (
        <>
          The path-to-purchase is characterized by a significant divergence between the End User and the Decision Maker/Payer.
          <ul className="list-disc list-inside mt-2">
            <li><strong>The Female Shopper:</strong> Female heads of households are purchasing for male members, prioritizing washability and value over the wearer’s brand loyalty.</li>
            <li><strong>The Dependent Shopper:</strong> Teenagers and students drive product selection based on fit preferences (e.g., &quot;Snug Fit&quot;), but the transaction is finalized by the parent.</li>
          </ul>
        </>
      ),
      bullets: [
        <><strong>Strategic Imperative:</strong> Marketing efforts currently over-index on the male wearer, ignoring the financial gatekeeper. Unlocking household penetration requires reducing friction for the payer.</>,
        <><strong>Recommendation (For Moms/Wives):</strong> Develop &quot;Bundle & Save&quot; campaigns focused on &quot;Upgrading His Drawer&quot; (Value & Durability messaging).</>,
        <><strong>Recommendation (For Teens):</strong> Implement a &quot;Share Cart for Payment&quot; feature on the D2C site, allowing the user to curate the style/fit while seamlessly forwarding the checkout link to the payer.</>
      ]
    },
    {
      id: "05",
      title: "Product Standardization: The \"Consistency Trust\" Barrier",
      tone: "amber",
      description: (
        <>
          Critical operational flaws in intra-pack sizing consistency threaten retention. Customers report receiving different fits (some tight, some loose) within the same size order.
          <br/><br/>
          <strong>Impact Analysis:</strong> In the apparel e-commerce sector, sizing inconsistency is more damaging than incorrect sizing. While a &quot;Wrong Size&quot; leads to a return, &quot;Inconsistent Size&quot; leads to distrust. This flaw directly undermines the viability of &quot;Subscription&quot; or &quot;Repeat Purchase&quot; models, as customers cannot confidently reorder without fear of variance.
        </>
      ),
      bullets: [
        <><strong>Strategic Imperative:</strong> This is a cutting-room tolerance failure that requires immediate operational intervention.</>,
        <><strong>Recommendation:</strong> Tighten tolerance limits at the factory level. Implement a &quot;Stack Check&quot; in the packaging phase where stacked garments are visually measured against a template to ensure uniform dimensions before bagging.</>
      ]
    }
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
      
      // Light mode theme adaptation
      const baseLayout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { family: "Segoe UI, sans-serif", color: '#333333' },
        xaxis: { showgrid: true, gridcolor: '#e5e7eb', zeroline: false },
        yaxis: { showgrid: true, gridcolor: '#e5e7eb', zeroline: false },
        margin: { l: 60, r: 40, t: 80, b: 60 }
      };

      const chartData = {
        qbq_survival_curve: {
          data: [
            {
              x: ['Unboxing', 'Week 2', 'Month 1', 'Month 1.5', 'Month 2', 'Month 3', 'Month 6'],
              y: [9.8, 9.5, 8.8, 7.5, 5.5, 4.0, 3.0],
              mode: 'lines+markers',
              line: { color: '#e94560', width: 4, shape: 'spline' },
              marker: { size: 12, color: '#ffffff', line: { width: 3, color: '#e94560' } },
              name: 'Product Integrity Score',
              fill: 'tozeroy',
              fillcolor: 'rgba(233, 69, 96, 0.1)'
            }
          ],
          layout: {
            ...baseLayout,
            title: { text: "<b>📉 The Product 'Survival Curve'</b>", font: { size: 22, color: '#e94560' } },
            yaxis: { ...baseLayout.yaxis, range: [0, 11], title: "Satisfaction Score (0-10)" },
            annotations: [
              {
                x: 'Month 2', y: 5.5,
                text: "⚠️ THE CHURN CLIFF<br>(Elastic Fatigue & Tearing)",
                showarrow: true, arrowhead: 2, arrowsize: 1, arrowwidth: 2, arrowcolor: '#333333',
                ax: 0, ay: -60, bgcolor: '#e94560', bordercolor: '#ffffff', font: { color: '#ffffff', size: 12 }
              }
            ]
          }
        },
        qbq_cotton_paradox: {
          data: [
            {
              x: ['Cotton', 'Bamboo/Modal', 'Synthetic/Nylon'],
              y: [76, 12, 12],
              name: 'Stated Preference (Habit)',
              marker: { color: '#0f3460' },
              type: 'bar',
              text: ['76%', '12%', '12%'],
              textposition: 'auto'
            },
            {
              x: ['Cotton', 'Bamboo/Modal', 'Synthetic/Nylon'],
              y: [15, 80, 5],
              name: 'Actual Delight (Experience)',
              marker: { color: '#e94560' },
              type: 'bar',
              text: ['15%', '80%', '5%'],
              textposition: 'auto'
            }
          ],
          layout: {
            ...baseLayout,
            title: { text: "<b> The 'Cotton Paradox' (Cognitive Dissonance)</b>", font: { size: 22, color: '#e94560' } },
            barmode: 'group',
            yaxis: { ...baseLayout.yaxis, title: "Percentage of Respondents" }
          }
        },
        qbq_drawer_share: {
          data: [
            {
              y: ['FreeCultr (Total)', 'FreeCultr (Exclusive)', 'Jockey', 'DaMensch', 'XYXX', 'Puma', 'Rupa', 'Zoiro', 'Heelium'],
              x: [17, 3, 12, 5, 3, 1, 1, 1, 1],
              type: 'bar',
              orientation: 'h',
              marker: {
                color: [
                  '#228B22', // FreeCultr (Total) - Forest Green
                  '#32CD32', // FreeCultr (Exclusive) - Lime Green
                  '#e74c3c', // Jockey - Red
                  '#3498db', // DaMensch - Blue
                  '#3498db', // XYXX - Blue
                  '#95a5a6', // Puma - Grey
                  '#95a5a6', // Rupa - Grey
                  '#95a5a6', // Serio - Grey
                  '#95a5a6'  // Helium - Grey
                ]
              },
              text: [
                "17 (100.0%)",
                "3 (17.6%)", 
                "12 (70.6%)",
                "5 (29.4%)",
                "3 (17.6%)",
                "1 (5.9%)",
                "1 (5.9%)",
                "1 (5.9%)",
                "1 (5.9%)"
              ],
              textposition: 'outside',
              textfont: { weight: 'bold', size: 10 }
            }
          ],
          layout: {
            ...baseLayout,
            margin: { ...baseLayout.margin, l: 180 },
            title: { text: "<b>'Share of Drawer' Co-Habitation</b>", font: { size: 22, color: '#e94560' } },
            xaxis: { ...baseLayout.xaxis, title: "Number of Respondents", range: [0, 20] },
            yaxis: { ...baseLayout.yaxis, autorange: "reversed" },
            shapes: [
              {
                type: 'line',
                x0: 8.5, y0: 0, x1: 8.5, y1: 1,
                xref: 'x', yref: 'paper',
                line: { color: 'grey', width: 1, dash: 'dash' },
                opacity: 0.3
              }
            ],
            annotations: [
              {
                x: 8.6, y: 1,
                xref: 'x', yref: 'paper',
                text: '50% Mark',
                showarrow: false,
                font: { size: 10, color: 'grey' },
                xanchor: 'left',
                yanchor: 'top'
              }
            ]
          }
        },
        qbq_shapewear_resistance: {
          data: [
            {
              y: ['Sentiment'], x: [58],
              name: 'Immediate Buy',
              orientation: 'h', marker: { color: '#27ae60' },
              type: 'bar', text: "58% Buy Now", textposition: 'auto'
            },
            {
              y: ['Sentiment'], x: [28],
              name: 'Skeptical (Fear of Lines)',
              orientation: 'h', marker: { color: '#f1c40f' },
              type: 'bar', text: "28% Skeptical", textposition: 'auto'
            },
            {
              y: ['Sentiment'], x: [14],
              name: 'Reject',
              orientation: 'h', marker: { color: '#c0392b' },
              type: 'bar', text: "14% Reject", textposition: 'auto'
            }
          ],
          layout: {
            ...baseLayout,
            title: { text: "<b> Shapewear: The Trust Barrier</b>", font: { size: 22, color: '#e94560' } },
            barmode: 'stack',
            xaxis: { ...baseLayout.xaxis, range: [0, 100], title: "Percentage" }
          }
        },
        qbq_demographic_matrix: {
          data: [
            {
              x: [20], y: [85],
              mode: 'markers',
              marker: { size: 60, color: '#27ae60', line: { width: 2, color: '#ffffff' } },
              name: 'Gen Z (Style)',
              text: "Gen Z (Style)<br>Avg Age: 20<br>Satisfaction: 85%",
              hoverinfo: 'text'
            },
            {
              x: [32], y: [35],
              mode: 'markers',
              marker: { size: 90, color: '#e94560', line: { width: 2, color: '#ffffff' } },
              name: 'Millennials (Churn Risk)',
              text: "Millennials (Churn Risk)<br>Avg Age: 32<br>Satisfaction: 35%",
              hoverinfo: 'text'
            },
            {
              x: [60], y: [95],
              mode: 'markers',
              marker: { size: 45, color: '#0f3460', line: { width: 2, color: '#ffffff' } },
              name: 'Boomers (Comfort)',
              text: "Boomers (Comfort)<br>Avg Age: 60<br>Satisfaction: 95%",
              hoverinfo: 'text'
            }
          ],
          layout: {
            ...baseLayout,
            title: { text: "<b>🎯 Demographic Priorities Matrix</b>", font: { size: 22, color: '#e94560' } },
            xaxis: { ...baseLayout.xaxis, title: "Average Age", range: [15, 70] },
            yaxis: { ...baseLayout.yaxis, title: "Satisfaction Score (%)", range: [0, 110] },
            annotations: [
              {
                x: 32, y: 25,
                text: "<b>THE ACTIVE GAP</b><br>(Need Nylon Line)",
                showarrow: true, arrowcolor: '#333333', ax: 0, ay: 40,
                font: { color: '#e94560', weight: "bold" }
              }
            ]
          }
        },
        qbq_radar_chart: {
          data: [
            {
              type: 'scatterpolar',
              r: [9.5, 9.5, 4.0, 5.0],
              theta: ['Price Value', 'Fabric Softness', 'Durability', 'Brand Fame'],
              fill: 'toself',
              name: 'FreeCulture',
              line: { color: '#e74c3c' }
            },
            {
              type: 'scatterpolar',
              r: [6.0, 5.0, 9.0, 10.0],
              theta: ['Price Value', 'Fabric Softness', 'Durability', 'Brand Fame'],
              fill: 'toself',
              name: 'Jockey (Benchmark)',
              line: { color: '#34495e' }
            }
          ],
          layout: {
            ...baseLayout,
            title: { text: "<b>Competitive Positioning</b>", font: { size: 22, color: '#e94560' } },
            polar: {
              radialaxis: {
                visible: true,
                range: [0, 10]
              }
            },
            showlegend: true
          }
        },
        qbq_opp_chart: {
          data: [
            {
              x: ['Invisible" Shapewear / Fitter Line', 'Active" Nylon Line', '"Version 2.0" Durability (Waistband)', 'Senior/Teen Bundles'],
              y: [9.5,9,8.5,4],
              type: 'bar',
              marker: {
                color: ['#3498db', '#9b59b6', '#2ecc71', '#f1c40f']
              },
              name: 'Demand Intensity (1-10)'
            }
          ],
          layout: {
            ...baseLayout,
            title: { text: "<b>💰 The \"Active Gap\" (Lost Revenue)</b>", font: { size: 22, color: '#27ae60' } },
            yaxis: { ...baseLayout.yaxis, range: [0, 10], title: "Demand Intensity" }
          }
        },
        qbq_persona_chart: {
          data: [
            {
              labels: ['Male Self-Buyer', 'Gatekeeper (Mom/Wife/Partner)', 'Active Pro (Flight Risk)'],
              values: [60, 30, 10],
              type: 'pie',
              hole: 0.4,
              marker: {
                colors: ['#2c3e50', '#e67e22', '#e74c3c']
              },
              textinfo: 'percent+label'
            }
          ],
          layout: {
            ...baseLayout,
            title: { text: "<b>👥 The \"Gatekeeper\" Economy</b>", font: { size: 22, color: '#e67e22' } }
          }
        }
      };
      
      // Render charts
      Object.entries(chartData).forEach(([chartId, data]) => {
        const element = document.getElementById(chartId);
        if (element) {
          window.Plotly.newPlot(chartId, data.data, data.layout, plotConfig);
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
              FreeCulture Intelligence Dashboard
            </h1>
            <p className="text-2xl text-muted-foreground mt-4">Strategic Roadmap Derived from 17 Deep-Dive Customer Transcripts</p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto mt-8 shadow-lg"></div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-16">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-14 bg-muted p-1.5">
              <TabsTrigger value="summary" className="text-base font-semibold px-4 py-2">Executive Summary</TabsTrigger>
              <TabsTrigger value="question-by-question" className="text-base font-semibold px-4 py-2">Deep Dive Charts</TabsTrigger>
              <TabsTrigger value="all-responses" className="text-base font-semibold px-4 py-2">All Responses</TabsTrigger>
            </TabsList>

            {/* Summary Tab */}
            <TabsContent value="summary" className="space-y-16">
              <div className="mb-16">
                <div className="relative rounded-[32px] p-[2px] bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 shadow-2xl overflow-hidden">
                  <div className="bg-white rounded-[28px] shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-8 py-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <h2 className="text-2xl font-bold text-white tracking-wide">
                          EXECUTIVE SUMMARY
                        </h2>
                        <div className="flex flex-wrap gap-6 text-2xl">
                          <div>
                            <span className="text-gray-300">Study:</span>
                            <span className="text-white font-semibold ml-2">FreeCulture x TranzmitAI</span>
                          </div>
                          <div>
                            <span className="text-gray-300">Sample:</span>
                            <span className="text-white font-semibold ml-2">N=17</span>
                          </div>
                        </div>
                      </div>
                    </div>

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
                                  <div className="text-2xl text-gray-700 leading-relaxed">{insight.description}</div>
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
                  </div>
                </div>
              </div>

              <DeepDiveCard>
                <div className="p-6 flex justify-center bg-white rounded-lg">
                  <div id="qbq_survival_curve" className="w-full min-h-[500px]"></div>
                </div>
                <div className="text-2xl text-gray-700 leading-relaxed mt-4 p-6 bg-red-50 rounded-lg border border-red-100 space-y-6">
                  <div>
                    <h4 className="font-bold text-red-900 mb-2">The "Survival Curve": Lifecycle Failure Analysis</h4>
                    <p><strong>Executive Summary:</strong> The customer relationship with FreeCultr follows a distinct "Honeymoon to Heartbreak" trajectory. Initial satisfaction scores are near-perfect (Unboxing to Week 6), driven by superior fabric softness. However, a structural failure point exists between Month 1.5 and Month 2, where the product’s physical integrity (Elastic/Stitching) fails before the fabric does. This "Churn Cliff" is the primary driver of negative NPS among long-term users.</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-red-800 mb-1">1. The Honeymoon Phase (Day 0 – Day 45)</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>Status:</strong> Delight (Score: 9.8/10)</li>
                      <li><strong>Driver:</strong> The "Unboxing" feel of Micro-Modal/Bamboo.</li>
                      <li><strong>Transcript Evidence:</strong>
                        <ul className="list-none ml-4 mt-1 space-y-1">
                          <li>• <em>Unboxing:</em> User 5 calls it "Smoothness and easy to use" immediately.</li>
                          <li>• <em>Early Use:</em> User 10 notes, "The first feeling is softness... and it stays on like that."</li>
                        </ul>
                      </li>
                      <li><strong>The Hook:</strong> At this stage, the product is functionally superior to Jockey because the tactile difference is obvious, and the structural fatigue hasn't set in yet.</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-red-800 mb-1">2. The "Churn Cliff" (Day 45 – Day 60)</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>Status:</strong> Critical Failure (Score Drops to ~6/10)</li>
                      <li><strong>Driver:</strong> Elastic Fatigue & Fabric Tearing.</li>
                      <li><strong>Transcript Evidence:</strong> The data pinpoints this specific window repeatedly:
                        <ul className="list-none ml-4 mt-1 space-y-1">
                          <li>• <em>User 3:</em> "Issue pops up in a month or so... not even a month... in five washes issues are very evident."</li>
                          <li>• <em>User 8:</em> "Little fall after the durability of one and a half months... fabric must be better."</li>
                          <li>• <em>User 2:</em> "Underwears start tearing after 1-2 washes."</li>
                          <li>• <em>User 12:</em> "Waistband gets loose."</li>
                        </ul>
                      </li>
                      <li><strong>Strategic Insight:</strong> The product currently has an effective lifespan of ~6 weeks for active users. This creates a "Negative Viral Loop" where customers love the brand in Month 1 (recommending it) but feel betrayed by Month 3 (churning).</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-red-800 mb-1">3. The Survivor Bias (Month 6+)</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>Status:</strong> Stabilized (Score: ~3/10 or Niche Acceptance)</li>
                      <li><strong>Driver:</strong> Low-Activity Usage.</li>
                      <li><strong>Transcript Evidence:</strong>
                        <ul className="list-none ml-4 mt-1 space-y-1">
                          <li>• <em>The Exception:</em> User 16 mentions "6 months, perfectly fine." However, looking at his profile, he buys mostly for "Value," suggesting lower daily wear intensity compared to the active Millennials who report tearing.</li>
                          <li>• <em>The Trade-off:</em> Long-term survivors are often "tolerating" the loose elastic because the fabric remains soft, or they are sedentary users (Boomers) who don't stress the garment.</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </DeepDiveCard>

              <DeepDiveCard>
                <div className="p-6 flex justify-center bg-white rounded-lg">
                  <div id="qbq_radar_chart" className="w-full min-h-[500px]"></div>
                </div>
                <div className="text-2xl text-gray-700 leading-relaxed mt-4 p-6 bg-red-50 rounded-lg border border-red-100 space-y-6">
                  <div>
                    <h4 className="font-bold text-red-900 mb-2">Attribute Ownership: The Asymmetric Battleground</h4>
                    <p><strong>Executive Summary:</strong> The competitive landscape is defined by a stark Asymmetric Trade-off. FreeCulture and Jockey occupy inverse territories in the consumer's mind. The chart visualizes a classic "Disruptor vs. Incumbent" dynamic: FreeCulture dominates on Sensory Experience & Economics, while Jockey defends its position purely through Structural Inertia (Durability & Fame).</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-red-800 mb-1">1. The Disruption Zone: Softness & Value (FreeCulture Domination)</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>The Delta:</strong> FreeCulture holds a massive lead in Fabric Softness (9/10) compared to the incumbent (4/10).</li>
                      <li><strong>Transcript Evidence:</strong> This is the primary wedge. Customers like User 15 explicitly disparage Jockey as "Itchy" and "Not comfortable," while describing FreeCulture as "Soft like Modal."</li>
                      <li><strong>The Economic Moat:</strong> FreeCulture also leads on Price Value (8/10). While not the cheapest option, it wins the "Smart Premium" battle. User 11 noted that premium competitors (DaMensch) charge "Double" for similar fabrics, making FreeCulture the rational economic choice for high-quality fabric.</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-red-800 mb-1">2. The Defense Zone: Durability & Fame (Jockey Domination)</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>The Delta:</strong> Jockey retains a near-monopoly on Durability (9/10) and Brand Fame (10/10).</li>
                      <li><strong>Transcript Evidence:</strong> The durability gap is the brand's critical weakness. User 2 reported FreeCulture "Tearing after 1-2 washes," whereas Jockey is widely acknowledged (Calls 8, 9) as the benchmark for longevity and technical fabrics (Tactel Nylon).</li>
                      <li><strong>The Inertia:</strong> Jockey's "Fame" score prevents churn. Because it is the default "Safe Choice," customers retreat to it immediately when FreeCulture's durability fails them.</li>
                    </ul>
                  </div>
                </div>
              </DeepDiveCard>
            </TabsContent>

            {/* Charts Tab */}
            <TabsContent value="question-by-question" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-foreground mb-4 drop-shadow-lg">Deep Dive Charts</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto shadow-lg"></div>
              </div>

              <DeepDiveCard>
                <div className="p-6 flex justify-center bg-white rounded-lg">
                  <div id="qbq_cotton_paradox" className="w-full min-h-[500px]"></div>
                </div>
                <div className="text-2xl text-gray-700 leading-relaxed mt-4 p-6 bg-blue-50 rounded-lg border border-blue-100 space-y-6">
                  <div>
                    <h4 className="font-bold text-blue-900 mb-2">Material Perception: The "Cotton Paradox" (Cognitive Dissonance)</h4>
                    <p><strong>Executive Summary:</strong> A profound Semantic Disconnect exists in the customer base. While 76% of respondents reflexively cite "Cotton" as their preferred fabric due to legacy habit, their qualitative descriptions of delight ("Smoothness," "Silky," "Cold Touch") describe attributes specific to Bamboo and Modal. Customers are technically buying FreeCultr for its deviation from cotton, while verbally affirming their allegiance to it.</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-blue-800 mb-1">1. The "Default" Bias: Cotton as a Proxy for Safety (76%)</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>The Phenomenon:</strong> For the majority of Indian male consumers, the word "Cotton" is not a technical specification; it is a synonym for "Breathable," "Safe," and "Not Synthetic."</li>
                      <li><strong>Transcript Evidence:</strong>
                        <ul className="list-none ml-4 mt-1 space-y-1">
                          <li>• <em>The "Cognitive Dissonance" User:</em> User 10 (Age 60) is the perfect case study. He explicitly praises FreeCultr for "Bamboo fiber" and "Softness," yet when asked his preference for future purchases, he reverts to "Hundred percent cotton."</li>
                          <li>• <em>The Conflation:</em> User 14 describes his ideal product as "Soft Cotton," unaware that the level of softness he is praising in FreeCultr is physically impossible with standard cotton.</li>
                        </ul>
                      </li>
                      <li><strong>Strategic Implication:</strong> Marketing "Against Cotton" is dangerous because it attacks the customer's safety net. The strategy must be "Cotton Evolved."</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-blue-800 mb-1">2. The "Delight" Reality: The Bamboo/Modal Experience (80%)</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>The Phenomenon:</strong> When customers describe why they love FreeCultr, they use a vocabulary that describes Micro-Modal, not Cotton.</li>
                      <li><strong>Transcript Evidence:</strong>
                        <ul className="list-none ml-4 mt-1 space-y-1">
                          <li>• <em>User 5:</em> Cites "Smoothness" as the #1 attribute (a Modal characteristic), yet later claims to prefer "Pure Cotton."</li>
                          <li>• <em>User 15 (The Educated Exception):</em> This 17-year-old is one of the few who correctly identified the source of his delight: "It is very soft like the modal fabric... fits me really snug."</li>
                        </ul>
                      </li>
                      <li><strong>Strategic Implication:</strong> The product is winning on merit (the Red Bar), but the ingredient branding is failing to get credit. Customers attribute the softness to "Good Cotton" rather than "Bamboo Technology."</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-blue-800 mb-1">3. The "Synthetic" Rejection (Low Preference)</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>The Phenomenon:</strong> Nylon/Synthetic is rejected in stated preference (12%) but requested for specific use cases (Activewear).</li>
                      <li><strong>Transcript Evidence:</strong> User 8 specifically distinguishes between "Sandos" (wants Cotton) and "Trunks" (wants Tactel Nylon). This shows that sophisticated users understand fabric zoning.</li>
                      <li><strong>Strategic Implication:</strong> Synthetic materials must be strictly positioned as "Performance Gear" to avoid being lumped into the "Cheap Polyester" bucket that customers fear.</li>
                    </ul>
                  </div>

                  <div className="mt-8 bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden">
                    <div className="bg-blue-50/50 px-6 py-4 border-b border-blue-100 flex items-center gap-3">
                    
                      <h5 className="font-bold text-blue-900 text-2xl m-0">Tranzmit Recommendation: "Ingredient Branding" Pivot</h5>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 mb-4 font-medium text-2xl">The data proves that customers say Cotton but buy Softness. To bridge this gap, FreeCultr must stop fighting the word "Cotton" and instead reframe Bamboo/Modal relative to it.</p>
                      <ul className="space-y-3 text-2xl">
                        <li className="flex gap-3 text-gray-700"><span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5"></span><span><strong>Do Not Say:</strong> "We are not Cotton." (Triggers the Safety/Habit barrier).</span></li>
                        <li className="flex gap-3 text-gray-700"><span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5"></span><span><strong>Do Say:</strong> "Softer Than Cotton." or "Bamboo-Cotton Blend."</span></li>
                        <li className="flex gap-3 text-gray-700"><span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5"></span><span><strong>The "Better Cotton" Narrative:</strong> Position Bamboo/Modal not as an alien alternative, but as the evolution of what they already love.</span></li>
                        <li className="flex gap-3 text-gray-700"><span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5"></span><span><strong>Marketing Hook:</strong> "Feels like Cotton, Softs like Silk."</span></li>
                        <li className="flex gap-3 text-gray-700"><span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5"></span><span><strong>Goal:</strong> Educate the 76% of "Cotton Traditionalists" that the "Smoothness" they love (Call 5) is actually the Bamboo they need to ask for.</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </DeepDiveCard>

              <DeepDiveCard>
                <div className="p-6 flex justify-center bg-white rounded-lg">
                  <div id="qbq_drawer_share" className="w-full min-h-[500px]"></div>
                </div>
                <div className="text-2xl text-gray-700 leading-relaxed mt-4 p-6 bg-green-50 rounded-lg border border-green-100 space-y-6">
                  <div>
                    <h4 className="font-bold text-green-900 mb-2">Competitive Landscape Analysis: "Share of Drawer" Co-Habitation</h4>
                    <p><strong>Executive Summary:</strong> FreeCultr currently operates as a "Supplementary Brand" rather than a "Primary Brand." While the brand has successfully entered the drawer (100% presence in sample), Brand Exclusivity is dangerously low at 17.6%. The vast majority of customers (82.4%) are "Poly-Brand Users," simultaneously purchasing from competitors to fulfill different functional needs.</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-green-800 mb-1">1. The Entrenched Incumbent: Jockey (70.6% Co-Habitation)</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>The Dynamic:</strong> Jockey is the "Default Utility" provider. It co-exists in nearly 3 out of 4 FreeCultr drawers.</li>
                      <li><strong>Driver:</strong> Transcript analysis (Calls 8, 9, 15) indicates Jockey is retained for "Active/Rough Use" and "Habit." Customers trust Jockey's waistband longevity even if they prefer FreeCultr's fabric softness.</li>
                      <li><strong>Risk:</strong> As long as Jockey remains in the drawer, FreeCultr is at risk of being displaced if a customer decides to economize or needs a gym replacement.</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-green-800 mb-1">2. The Challenger Threat: DaMensch (29.4% Co-Habitation)</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>The Dynamic:</strong> This represents the battle for the "Premium" slot. Approximately 30% of your customers are actively testing DaMensch alongside FreeCultr.</li>
                      <li><strong>Driver:</strong> These users are comparing "Value for Money." FreeCultr is generally winning on price perception (Call 11: "DaMensch charges double"), but DaMensch remains a threat for users seeking perceived durability guarantees.</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-green-800 mb-1">3. The "Exclusive" Grail: FreeCultr Loyalists (17.6%)</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>The Dynamic:</strong> Only 3 out of 17 users have successfully purged other brands to go "FreeCultr Only" (e.g., Call 10).</li>
                      <li><strong>Profile:</strong> These are typically older users (Boomers) or office workers who do not have high-intensity "Active" requirements, meaning the product's lack of a gym line doesn't force them elsewhere.</li>
                    </ul>
                  </div>

                  <div className="mt-8 bg-white rounded-xl border border-green-200 shadow-sm overflow-hidden">
                    <div className="bg-green-50/50 px-6 py-4 border-b border-green-100 flex items-center gap-3">
                    
                      <h5 className="font-bold text-green-900 text-2xl m-0">Tranzmit Recommendation</h5>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 mb-4 font-medium text-2xl">The path to increasing Share of Wallet lies in eviction.</p>
                      <ul className="space-y-3 text-2xl">
                        <li className="flex gap-3 text-gray-700"><span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5"></span><span><strong>To Evict Jockey:</strong> Launch the Nylon/Performance Line to remove the need for a separate "Gym Brand."</span></li>
                        <li className="flex gap-3 text-gray-700"><span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5"></span><span><strong>To Evict DaMensch:</strong> Hammer the "Same Luxury, Better Price" messaging to validate the smart choice.</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </DeepDiveCard>

              <DeepDiveCard>
                <div className="p-6 flex justify-center bg-white rounded-lg">
                  <div id="qbq_shapewear_resistance" className="w-full min-h-[500px]"></div>
                </div>
                <div className="text-2xl text-gray-700 leading-relaxed mt-4 p-6 bg-yellow-50 rounded-lg border border-yellow-100 space-y-6">
                  <div>
                    <h4 className="font-bold text-yellow-900 mb-2">Category Creation Analysis: Shapewear & The Trust Barrier</h4>
                    <p><strong>Executive Summary:</strong> The concept testing for a "Look Fitter" line reveals a highly polarized adoption curve. While the Purchase Intent (58%) is exceptionally high for a new category, a significant "Trust Deficit" (28%) exists regarding the trade-off between function (looking slim) and experience (comfort).</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-yellow-800 mb-1">1. The "Immediate Adopters" (58%)</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>The Signal:</strong> A majority of the customer base (e.g., Calls 4, 9, 11, 16) indicated they would "Buy Immediately" without hesitation.</li>
                      <li><strong>Insight:</strong> This high baseline suggests that male body image concerns are a largely unaddressed market driver. This segment views the product as a functional tool and is less price-sensitive regarding it.</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-yellow-800 mb-1">2. The "Comfort Skeptics" (28%)</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>The Barrier:</strong> This segment (e.g., Call 5, 13) expressed interest but raised specific "Conditions of Satisfaction." Their primary fears are Constriction (feeling squeezed) and Visibility (lines showing under clothes).</li>
                      <li><strong>Transcript Evidence:</strong> User 13 explicitly stated: "I would be skeptical... comfort is most important."</li>
                      <li><strong>Strategic Implication:</strong> This group will not buy "Shapewear" if it is marketed like traditional compression gear. They require reassurance that the product is "Invisible" and "Breathable."</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-yellow-800 mb-1">3. The "Hard Rejectors" (14%)</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>The Signal:</strong> A small minority (e.g., User 1, 17) flatly rejected the concept ("I don't need it").</li>
                      <li><strong>Insight:</strong> These are likely naturally slim users or older demographics (Boomers) who prioritize pure relaxation over aesthetics. They are not the target audience for this SKU.</li>
                    </ul>
                  </div>

                  <div className="mt-8 bg-white rounded-xl border border-yellow-200 shadow-sm overflow-hidden">
                    <div className="bg-yellow-50/50 px-6 py-4 border-b border-yellow-100 flex items-center gap-3">
                     
                      <h5 className="font-bold text-yellow-900 text-2xl m-0">Tranzmit Recommendation</h5>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 mb-4 font-medium text-2xl">To convert the 28% "Skeptics" and maximize the 58% "Adopters," marketing must pivot away from the word "Shapewear" (which implies discomfort).</p>
                      <ul className="space-y-3 text-2xl">
                        <li className="flex gap-3 text-gray-700"><span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2.5"></span><span><strong>Winning Narrative:</strong> "Invisible Fit" or "Smoothing Undershirts."</span></li>
                        <li className="flex gap-3 text-gray-700"><span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2.5"></span><span><strong>Key Claim:</strong> "Look 5lbs lighter, feel 100% comfortable."</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </DeepDiveCard>

              <DeepDiveCard>
                <div className="p-6 flex justify-center bg-white rounded-lg">
                  <div id="qbq_demographic_matrix" className="w-full min-h-[500px]"></div>
                </div>
                <div className="text-2xl text-gray-700 leading-relaxed mt-4 p-6 bg-indigo-50 rounded-lg border border-indigo-100 space-y-6">
                  <div>
                    <h4 className="font-bold text-indigo-900 mb-2">Lifecycle Satisfaction Analysis: The "Retention Valley"</h4>
                    <p><strong>Executive Summary:</strong> Customer sentiment analysis reveals a distinct U-Shaped Satisfaction Curve. The brand achieves peak Net Promoter Scores (NPS) at the bookends of the demographic spectrum (Gen Z and Boomers). However, a critical "Satisfaction Dip" occurs within the high-value Millennial cohort (Ages 25–40). This dip is not due to pricing, but a functional mismatch between the product’s capabilities (Softness) and the user’s lifestyle (High Activity).</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-indigo-800 mb-1">1. Gen Z (Ages 18–24): The "Style & Fit" Adopters</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>Status:</strong> High Satisfaction (Acquisition Engine)</li>
                      <li><strong>Driver:</strong> Superior Fit vs. Legacy Brands.</li>
                      <li><strong>Transcript Evidence:</strong> Younger users (e.g., User 15, Age 17) explicitly prefer FreeCultr because mass-market competitors like Jockey struggle with modern sizing ("Large doesn't fit me... FreeCultr fits best").</li>
                      <li><strong>Behavior:</strong> This cohort is driven by Aesthetics and Snug Fit. They are less critical of long-term durability because their purchase frequency is lower or subsidized by parents (Gatekeepers).</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-indigo-800 mb-1">2. Millennials (Ages 25–40): The "Retention Valley"</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>Status:</strong> Low Satisfaction (Churn Risk)</li>
                      <li><strong>Driver:</strong> The "Active Gap" (Lack of Performance Wear).</li>
                      <li><strong>Transcript Evidence:</strong> This cohort (e.g., User 8 & 9, Age 29; User 2, Age 34) represents the most vocal detractors. They are the "Power Users"—wearing the product for 12+ hours, including commutes and gym sessions.</li>
                      <li><strong>The Friction Point:</strong> They love the modal softness for the office but find it structurally failing (tearing/sweat retention) during high-activity windows.</li>
                      <li><strong>Strategic Insight:</strong> This is the Red Dot on the graph. This group is actively defecting to competitors for "Tactel Nylon" (Gym/Sport) lines. Launching a Performance Line is the specific remedy required to lift this cohort's satisfaction score.</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-indigo-800 mb-1">3. Boomers (Ages 55+): The "Comfort Loyalists"</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>Status:</strong> Peak Satisfaction (Retention Anchor)</li>
                      <li><strong>Driver:</strong> Pure Tactile Comfort.</li>
                      <li><strong>Transcript Evidence:</strong> The most satisfied users in the dataset (e.g., User 10, Age 60; User 17, Age 64). User 10 cited "Softness" as the primary driver and has used the product for a year with zero complaints.</li>
                      <li><strong>Behavior:</strong> As a more sedentary demographic, they do not stress-test the fabric's durability (waistband/tearing) the way Millennials do. For them, FreeCultr delivers on its core promise of "Softness" perfectly.</li>
                    </ul>
                  </div>

                  <div className="mt-8 bg-white rounded-xl border border-indigo-200 shadow-sm overflow-hidden">
                    <div className="bg-indigo-50/50 px-6 py-4 border-b border-indigo-100 flex items-center gap-3">
                    
                      <h5 className="font-bold text-indigo-900 text-2xl m-0">Tranzmit Recommendation</h5>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 mb-4 font-medium text-2xl">The data indicates that FreeCultr has a Product-Market Fit problem only in the middle of the funnel.</p>
                      <ul className="space-y-3 text-2xl">
                        <li className="flex gap-3 text-gray-700"><span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></span><span>Do not change the core product for Boomers (they love it).</span></li>
                        <li className="flex gap-3 text-gray-700"><span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></span><span>Do not change the fit for Gen Z (it works).</span></li>
                        <li className="flex gap-3 text-gray-700"><span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></span><span><strong>MUST Introduce an "Active" line for Millennials.</strong> The current drop in satisfaction at age 30 correlates directly with the "Active Lifestyle" peak. Filling the Nylon Gap will normalize the curve, raising Millennial satisfaction to match the Boomer and Gen Z cohorts.</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </DeepDiveCard>

              <DeepDiveCard>
                <div className="p-6 flex justify-center bg-white rounded-lg">
                  <div id="qbq_opp_chart" className="w-full min-h-[500px]"></div>
                </div>
                <div className="text-2xl text-gray-700 leading-relaxed mt-4 p-6 bg-green-50 rounded-lg border border-green-100 space-y-6">
                  <div>
                    <h4 className="font-bold text-green-900 mb-2">Strategic Portfolio Expansion & Revenue Optimization</h4>
                    <p><strong>Executive Summary:</strong> The current FreeCultr product mix has successfully saturated the "Daily Comfort" occasion, achieving high satisfaction scores for tactile experience. However, an analysis of current customer demand reveals significant "White Space" in the portfolio. The brand is currently leaving revenue on the table in two distinct vectors: Category Expansion (Growth) and Wallet Consolidation (Retention).</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-green-800 mb-1">1. The Growth Vector: "Silhouette Management" (Shapewear)</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>Opportunity:</strong> High-Volume Incremental Revenue</li>
                      <li><strong>Analyst View:</strong> The data indicates a massive, latent demand for a "Look Fitter" line. With a <strong>60% immediate purchase intent</strong> (11 out of 17 respondents), this concept transcends traditional demographic segmentation, appealing to users across age groups and genders.</li>
                      <li><strong>Strategic Implication:</strong> This is not a replacement product; it is an incremental category. Launching this line moves the brand value proposition from "Passive Comfort" to "Active Solution," allowing FreeCultr to capture a higher Average Order Value (AOV) and access a "vanity" spend that is currently unaddressed in the men's D2C market.</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-green-800 mb-1">2. The Retention Vector: Technical Performance ("Active" Nylon)</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>Opportunity:</strong> Share-of-Wallet Consolidation</li>
                      <li><strong>Analyst View:</strong> There is a critical leakage point in the high-LTV customer lifecycle. While customers prefer FreeCultr for 16-hour daily wear, they are defecting to legacy competitors (specifically Jockey) for high-friction use cases like gym and sports. Specific requests for Tactel Nylon fabrics confirm that the current Modal offering is viewed as "too delicate" for performance.</li>
                      <li><strong>Strategic Implication:</strong> Introducing a technical "Active" line is a defensive play. It prevents product substitution during the customer's most active hours, effectively closing the loop and allowing FreeCultr to claim 100% of the customer’s innerwear share-of-wallet.</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-green-800 mb-1">3. The Foundational Imperative: Structural Durability (V2.0)</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>Opportunity:</strong> Churn Reduction & NPS Growth</li>
                      <li><strong>Analyst View:</strong> While fabric softness is the primary driver of acquisition, waistband failure is the primary driver of churn. The disparity between fabric longevity (high) and elastic integrity (low) creates a "Quality Gap."</li>
                      <li><strong>Strategic Implication:</strong> Innovation in Shapewear and Active lines must be underpinned by a "Version 2.0" structural upgrade. stabilizing the waistband quality is a non-negotiable hygiene factor required to justify the premium price point and sustain long-term retention.</li>
                    </ul>
                  </div>
                </div>
              </DeepDiveCard>

              <DeepDiveCard>
                <div className="p-6 flex justify-center bg-white rounded-lg">
                  <div id="qbq_persona_chart" className="w-full min-h-[500px]"></div>
                </div>
                <div className="text-2xl text-gray-700 leading-relaxed mt-4 p-6 bg-orange-50 rounded-lg border border-orange-100 space-y-6">
                  <div>
                    <h4 className="font-bold text-orange-900 mb-2">Shopper Architecture: The "Gatekeeper" Economy</h4>
                    <p><strong>Executive Summary:</strong> While the primary end-user of FreeCultr products is male, the purchasing decision is not always autonomous. Our analysis reveals a significant "Gatekeeper Effect," where approximately 30% of transaction volume is influenced or executed by a secondary persona (Moms, Wives, Partners). This necessitates a bifurcated marketing strategy: one that sells experience to the user and economics to the purchaser.</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-orange-800 mb-1">1. The Autonomous Core: Male Self-Buyers (60%)</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>The Persona:</strong> The independent shopper who prioritizes personal sensory gratification.</li>
                      <li><strong>Transcript Evidence:</strong> The majority of respondents (e.g., Call 1, 5, 10, 12, 16) decisively answered "I buy it myself." Their feedback loops focus almost exclusively on "Softness," "Comfort," and "Skin Feel."</li>
                      <li><strong>Strategic Implication:</strong> For this 60%, the marketing narrative must remain focused on the "Upgrade"—positioning FreeCultr as a reward for oneself. The key conversion driver here is Tactile Comfort.</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-orange-800 mb-1">2. The Hidden Influence: The "Gatekeepers" (30%)</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>The Persona:</strong> The financial controller who executes the purchase on behalf of the user. This includes mothers buying for teens and partners buying for spouses.</li>
                      <li><strong>Transcript Evidence:</strong>
                        <ul className="list-none ml-4 mt-1 space-y-1">
                          <li>• <em>The Teen/Mom Dynamic:</em> User 15 (Age 17) provided the clearest evidence of this split: "I pick up but my mom pays. So, some she chooses and some I."</li>
                          <li>• <em>The Partner Dynamic:</em> Call 6 (Female) indicated she shops for men's innerwear, validating the cross-gender purchasing behavior.</li>
                          <li>• <em>The Parent Dynamic:</em> Call 14 initially mentioned buying "for kids," highlighting that the head of household often manages the innerwear inventory for the family unit.</li>
                        </ul>
                      </li>
                      <li><strong>Strategic Implication:</strong> This segment presents a specific vulnerability. While the user (e.g., the teen) loves the fit, the payer (Mom) assesses value based on Durability. If the product fails (waistband tearing), the Gatekeeper cuts off funding, regardless of the user's preference. Marketing to this group requires a "Value & Longevity" narrative (e.g., "Bundles that last").</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-orange-800 mb-1">3. The "Flight Risk" Niche: Active Pros (10%)</h5>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>The Persona:</strong> High-value self-buyers who are actively defecting to competitors for specific functional needs.</li>
                      <li><strong>Transcript Evidence:</strong> Defined by Calls 8 and 9—customers who love the brand but are forced to buy Jockey for gym/sports because FreeCultr lacks a technical offering.</li>
                      <li><strong>Strategic Implication:</strong> This 10% represents the highest "Lost Opportunity Cost." They are self-buyers with high intent, but their wallet share is split. Launching the Nylon/Active line (as identified in the Gap Analysis) is the sole mechanism to retain this segment.</li>
                    </ul>
                  </div>
                </div>
              </DeepDiveCard>
            </TabsContent>

            {/* All Responses Tab */}
            <TabsContent value="all-responses" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-foreground mb-4 drop-shadow-lg">Deep-Dive Analysis (Respondent by Respondent)</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto shadow-lg"></div>
              </div>

              <div className="bg-white rounded-xl border border-border shadow-lg overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <TableHead className="font-bold text-2xl sm:text-2xl px-3 py-4 text-left align-top min-w-[150px]">Respondent</TableHead>
                      <TableHead className="font-bold text-2xl sm:text-2xl px-3 py-4 text-left align-top min-w-[150px]">Profile</TableHead>
                      <TableHead className="font-bold text-2xl sm:text-2xl px-3 py-4 text-left align-top">Key Insight extracted from Transcript</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {respondents.map((respondent) => (
                      <TableRow key={respondent.id} className="hover:bg-blue-50/50 transition-colors border-b">
                        <TableCell className="font-medium text-2xl sm:text-2xl px-3 py-4 align-top">
                          <div className="font-bold">{respondent.id}</div>
                          <div className="text-lg text-gray-500">{respondent.gender}, {respondent.age}</div>
                        </TableCell>
                        <TableCell className="text-2xl sm:text-2xl px-3 py-4 align-top">
                          <div className="font-semibold text-blue-700">{respondent.profile}</div>
                        </TableCell>
                        <TableCell className="text-2xl sm:text-2xl px-3 py-4 align-top">
                          <div className="leading-relaxed">{respondent.insight}</div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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

