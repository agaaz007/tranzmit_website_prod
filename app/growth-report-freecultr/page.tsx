"use client"

import type { ReactNode } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, TrendingUp, Users, Target, ShoppingCart, ArrowRight, Zap, AlertCircle, CheckCircle2, DollarSign } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const GrowthCard = ({
  children,
  className = "",
  title,
  number,
  icon: Icon,
}: {
  children: ReactNode
  className?: string
  title: string
  number: string
  icon: any
}) => (
  <div className={`relative overflow-hidden rounded-[24px] border-2 border-slate-200 bg-white shadow-xl ${className}`}>
    <div className="absolute top-0 right-0 p-6 opacity-5">
      <Icon className="w-32 h-32" />
    </div>
    <div className="relative p-8 sm:p-10 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl">
          {number}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  </div>
)

const SectionBlock = ({ title, children, className = "bg-slate-50" }: { title: string; children: ReactNode; className?: string }) => (
  <div className={`rounded-xl p-6 border-2 border-slate-200 shadow-sm ${className}`}>
    <h3 className="text-lg font-bold uppercase tracking-wider text-slate-500 mb-3">{title}</h3>
    <div className="text-xl text-gray-800 leading-relaxed">{children}</div>
  </div>
)

export default function GrowthReportFreecultrPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-24 pb-24">
        {/* Back Navigation */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-12">
          
          {/* Header Section */}
          <div className="text-center space-y-6 mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm tracking-wide uppercase mb-4">
              Confidential Advisory
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              Strategic Growth Advisory:<br/>
              <span className="text-blue-600">FREECULTR</span>
            </h1>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-gray-600 text-lg">
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Source: Tranzmit Intelligence (N=46)
              </span>
              <span className="hidden sm:inline text-gray-300">|</span>
              <span className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Focus: Revenue, Retention, Market Share
              </span>
            </div>
          </div>

          {/* 1. REDUCE CHURN */}
          <GrowthCard 
            number="1" 
            title='REDUCE CHURN: Plug the "Day-60" Revenue Leak'
            icon={AlertCircle}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <SectionBlock title="The Pain" className="bg-red-50 border-red-100">
                You are acquiring high-value customers but failing to retain them due to a specific product failure. You are burning CAC on a 60-day lifecycle.
              </SectionBlock>
              <SectionBlock title="The Hard Data" className="bg-white border-slate-200">
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <span><strong>NPS Collapse:</strong> Net Promoter Score drops from <strong>9.8/10</strong> (Unboxing) to <strong>~6.0/10</strong> (Day 60).</span>
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <span><strong>The Cause:</strong> "Structural Fatigue." Waistband loses elasticity ("Last se dhila ho jata hai").</span>
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <span><strong>The Impact:</strong> Early promoters become vocal detractors by Month 3.</span>
                  </li>
                </ul>
              </SectionBlock>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-yellow-300" />
                <h3 className="text-xl font-bold uppercase tracking-wider">The Growth Action</h3>
              </div>
              <div className="space-y-4 text-lg">
                <p><strong>Protocol:</strong> Implement a "30-Wash Stress Test" for waistbands immediately.</p>
                <p><strong>The Goal:</strong> Extend the "NPS Cliff" from Day 60 to Day 180.</p>
                <div className="pt-4 border-t border-white/20">
                  <p className="flex items-center gap-2 font-semibold text-yellow-100">
                    <DollarSign className="w-5 h-5" />
                    Financial Impact: Doubling product lifespan Doubles the LTV of every acquired user.
                  </p>
                </div>
              </div>
            </div>
          </GrowthCard>

          {/* 2. INCREASE SHARE OF WALLET */}
          <GrowthCard 
            number="2" 
            title='INCREASE SHARE OF WALLET: The "Anti-Jockey" Defensive'
            icon={Target}
          >
             <div className="grid md:grid-cols-2 gap-6">
              <SectionBlock title="The Pain" className="bg-red-50 border-red-100">
                You are losing ~30% of your customer's daily usage to a legacy competitor because your product is viewed as "Too Delicate."
              </SectionBlock>
              <SectionBlock title="The Hard Data" className="bg-white border-slate-200">
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <span><strong>70.6% Co-Habitation Rate:</strong> Nearly 3 out of 4 customers still have Jockey in their drawer.</span>
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <span><strong>Usage Split:</strong> FreeCultr for "Lounge/Office", Jockey for "Gym/Activity."</span>
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <span><strong>Flight Risk:</strong> 10% ("Active Pros") looking for alternatives due to lack of technical fabric.</span>
                  </li>
                </ul>
              </SectionBlock>
            </div>

            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-yellow-300" />
                <h3 className="text-xl font-bold uppercase tracking-wider">The Growth Action</h3>
              </div>
              <div className="space-y-4 text-lg">
                <p><strong>Product Launch:</strong> Introduce a Tactel Nylon "Active" Line.</p>
                <p><strong>Positioning:</strong> "Performance Gear" (Not Innerwear).</p>
                <div className="pt-4 border-t border-white/20">
                  <p className="flex items-center gap-2 font-semibold text-yellow-100">
                    <DollarSign className="w-5 h-5" />
                    Financial Impact: Capture the remaining 30% of Wallet Share. Stop customers buying Jockey for workouts.
                  </p>
                </div>
              </div>
            </div>
          </GrowthCard>

          {/* 3. INCREASE TOP LINE */}
          <GrowthCard 
            number="3" 
            title='INCREASE TOP LINE: The "Hidden" Demand Vector'
            icon={TrendingUp}
          >
             <div className="grid md:grid-cols-2 gap-6">
              <SectionBlock title="The Pain" className="bg-red-50 border-red-100">
                You are sitting on a massive latent demand for a new category, but you are blocked by a "Trust Deficit."
              </SectionBlock>
              <SectionBlock title="The Hard Data" className="bg-white border-slate-200">
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <span><strong>58% Purchase Intent:</strong> Majority would buy a "Look Fitter" line immediately.</span>
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <span><strong>28% Trust Deficit:</strong> Skeptics fear "Constriction" and "Discomfort" ("Shapewear" = "Suffocating").</span>
                  </li>
                </ul>
              </SectionBlock>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl p-8 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-yellow-300" />
                <h3 className="text-xl font-bold uppercase tracking-wider">The Growth Action</h3>
              </div>
              <div className="space-y-4 text-lg">
                <p><strong>Category Creation:</strong> Launch as "Invisible Fit" or "Smoothing Undershirts."</p>
                <p><strong>Messaging Rule:</strong> Market the benefit ("Sharp Silhouette"), not the mechanism ("Compression").</p>
                <div className="pt-4 border-t border-white/20">
                  <p className="flex items-center gap-2 font-semibold text-yellow-100">
                    <DollarSign className="w-5 h-5" />
                    Financial Impact: Unlock Net New Revenue Stream with 58% immediate adoption.
                  </p>
                </div>
              </div>
            </div>
          </GrowthCard>

          {/* 4. BOOST ACQUISITION */}
          <GrowthCard 
            number="4" 
            title='BOOST ACQUISITION: The "Cotton Paradox" Pivot'
            icon={Users}
          >
             <div className="grid md:grid-cols-2 gap-6">
              <SectionBlock title="The Pain" className="bg-red-50 border-red-100">
                Your current marketing fights the consumer's natural instinct, increasing your cost to convert (CAC).
              </SectionBlock>
              <SectionBlock title="The Hard Data" className="bg-white border-slate-200">
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <span><strong>76% "Default Bias":</strong> Prefer "Cotton" as it feels "Safe" and "Breathable."</span>
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <span><strong>The Disconnect:</strong> Users love FreeCultr for "Silky" feel (Modal) but default to Cotton vocabulary.</span>
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <span><strong>The Mistake:</strong> Marketing "Against Cotton" creates friction.</span>
                  </li>
                </ul>
              </SectionBlock>
            </div>

            <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl p-8 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-white" />
                <h3 className="text-xl font-bold uppercase tracking-wider">The Growth Action</h3>
              </div>
              <div className="space-y-4 text-lg">
                <p><strong>Rebranding:</strong> Switch to "Cotton Evolved" messaging.</p>
                <p><strong>The Hook:</strong> "The safety of Cotton. The softness of Silk."</p>
                <div className="pt-4 border-t border-white/20">
                  <p className="flex items-center gap-2 font-semibold text-white">
                    <DollarSign className="w-5 h-5" />
                    Financial Impact: Increase Conversion Rate (CR) on cold traffic by aligning with "Cotton" anchor.
                  </p>
                </div>
              </div>
            </div>
          </GrowthCard>

          {/* 5. UNLOCK REVENUE */}
          <GrowthCard 
            number="5" 
            title='UNLOCK REVENUE: The "Gatekeeper" Checkout'
            icon={ShoppingCart}
          >
             <div className="grid md:grid-cols-2 gap-6">
              <SectionBlock title="The Pain" className="bg-red-50 border-red-100">
                You are losing sales at the bottom of the funnel because the Chooser (Teen) is not the Payer (Mom).
              </SectionBlock>
              <SectionBlock title="The Hard Data" className="bg-white border-slate-200">
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <span><strong>30% Volume Share:</strong> Driven by "Gatekeepers" (Moms/Wives).</span>
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <span><strong>Cart Abandonment:</strong> Teens abandon when hitting payment wall. Moms care about "Durability/Washability."</span>
                  </li>
                </ul>
              </SectionBlock>
            </div>

            <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl p-8 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-white" />
                <h3 className="text-xl font-bold uppercase tracking-wider">The Growth Action</h3>
              </div>
              <div className="space-y-4 text-lg">
                <p><strong>Feature:</strong> Add a "Share Cart for Payment" button.</p>
                <p><strong>Targeting:</strong> Run "Laundry-Proof Bundles" ads targeting Women (35-50).</p>
                <div className="pt-4 border-t border-white/20">
                  <p className="flex items-center gap-2 font-semibold text-white">
                    <DollarSign className="w-5 h-5" />
                    Financial Impact: Recover lost carts (Student/Teen) and increase AOV via "Mom Bundles."
                  </p>
                </div>
              </div>
            </div>
          </GrowthCard>

          {/* SUMMARY TABLE */}
          <div className="rounded-[24px] border-2 border-slate-200 bg-white shadow-xl overflow-hidden">
            <div className="bg-gray-900 px-8 py-6">
              <h2 className="text-3xl font-bold text-white">SUMMARY: THE MONEY TABLE</h2>
              <p className="text-gray-400 mt-2 text-lg">Prioritized actions for immediate financial impact</p>
            </div>
            <div className="p-6 sm:p-8 overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b-2 border-slate-200">
                    <TableHead className="text-xl font-bold text-gray-900 w-[20%]">Opportunity Area</TableHead>
                    <TableHead className="text-xl font-bold text-gray-900 w-[30%]">The Stat (Evidence)</TableHead>
                    <TableHead className="text-xl font-bold text-gray-900 w-[25%]">The Action</TableHead>
                    <TableHead className="text-xl font-bold text-blue-600 w-[25%]">The Financial Win</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-lg">
                  <TableRow className="hover:bg-slate-50">
                    <TableCell className="font-semibold text-gray-800">Retention</TableCell>
                    <TableCell>NPS drops 9.8 ➝ 6.0 at Day 60</TableCell>
                    <TableCell className="font-medium">Fix Waistband Elastic</TableCell>
                    <TableCell className="text-blue-600 font-semibold">Stabilize LTV</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-slate-50">
                    <TableCell className="font-semibold text-gray-800">Share of Wallet</TableCell>
                    <TableCell>70.6% still buy Jockey</TableCell>
                    <TableCell className="font-medium">Launch "Active" Nylon Line</TableCell>
                    <TableCell className="text-blue-600 font-semibold">+30% Revenue per User</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-slate-50">
                    <TableCell className="font-semibold text-gray-800">New Revenue</TableCell>
                    <TableCell>58% Intent for "Look Fitter"</TableCell>
                    <TableCell className="font-medium">Launch "Invisible Fit"</TableCell>
                    <TableCell className="text-blue-600 font-semibold">New Product Line Revenue</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-slate-50">
                    <TableCell className="font-semibold text-gray-800">Conversion</TableCell>
                    <TableCell>76% prefer "Cotton"</TableCell>
                    <TableCell className="font-medium">Pivot to "Cotton Evolved"</TableCell>
                    <TableCell className="text-blue-600 font-semibold">Lower CAC</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-slate-50">
                    <TableCell className="font-semibold text-gray-800">Cart Recovery</TableCell>
                    <TableCell>30% Gatekeeper Volume</TableCell>
                    <TableCell className="font-medium">Add "Share Cart" Feature</TableCell>
                    <TableCell className="text-blue-600 font-semibold">Recover Lost Carts</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="bg-green-50 px-8 py-6 border-t border-green-100 flex flex-col sm:flex-row items-center justify-between gap-4">
               <div className="flex items-center gap-3">
                 <CheckCircle2 className="w-8 h-8 text-green-600" />
                 <span className="text-xl font-bold text-green-800">Status: High Confidence</span>
               </div>
               <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-green-200 shadow-sm">
                 <span className="text-gray-600 font-semibold uppercase tracking-wider text-sm">Next Step</span>
                 <span className="text-xl font-bold text-gray-900">Execute "Operation Snap Back" (Waistband Fix) immediately</span>
               </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}

