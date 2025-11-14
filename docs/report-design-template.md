# Professional Research Report Design Template

This template documents the design system used for brand health studies and market research reports, inspired by Kantar/Nielsen professional standards.

## Table of Contents
1. [Design Principles](#design-principles)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Component Patterns](#component-patterns)
5. [Section Templates](#section-templates)
6. [Code Examples](#code-examples)

---

## Design Principles

### Core Philosophy
- **Data-First**: Metrics and insights take precedence over decoration
- **Hierarchy**: Clear visual hierarchy guides the reader through insights
- **Professional**: Clean, corporate aesthetic matching research industry standards
- **Scannable**: Key findings should be quickly identifiable
- **Consistent**: Repeating patterns create familiarity and trust

### Layout Guidelines
- **White Space**: Generous padding (p-5, p-8) around content blocks
- **Grid Systems**: Use 2-3 column grids for KPI cards
- **Borders**: Left-border color accents (border-l-4) for emphasis
- **Containers**: White backgrounds with subtle shadows (shadow-sm)
- **Spacing**: Consistent gap-4, gap-6, space-y-8 between elements

---

## Color System

### Semantic Colors

#### Primary/Blue - Market Leaders, Positive Metrics
```
- bg-blue-50: Light backgrounds
- bg-blue-100: Border colors (border-blue-100)
- border-blue-600: Strong left-border accents (border-l-4)
- text-blue-900: Strong emphasis text
```

#### Red - Negative Metrics, Problems, Barriers
```
- bg-red-50: Light backgrounds for warnings
- bg-red-100: Border colors
- border-red-600: Strong left-border accents
- text-red-600: Error/problem metrics (46%)
```

#### Green - Positive Outcomes, Opportunities
```
- bg-green-50: Success backgrounds
- border-green-600: Positive metric accents
- text-green-600: Growth/success metrics
```

#### Amber/Yellow - Warnings, Insights, Key Findings
```
- bg-amber-50: Insight boxes
- border-amber-100: Subtle warnings
- text-amber-600: Highlighted concepts
```

#### Gray - Neutral, Secondary Information
```
- bg-gray-50: Section headers (bg-gradient-to-r from-gray-50 to-white)
- bg-gray-50: Methodology boxes
- border-gray-200: Container borders
- text-gray-600: Secondary text
- text-gray-700: Body text
- text-gray-900: Headings
```

#### Purple/Teal - Alternative Brands, Secondary Segments
```
- bg-purple-50: Female segment data
- bg-teal-50: Alternative options
- border-purple-100, border-teal-500: Differentiation
```

---

## Typography

### Heading Hierarchy

```jsx
// Section Headers (Main sections like "BRAND LANDSCAPE")
<h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
  SECTION TITLE
</h2>

// Sub-section Headers
<h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-5">
  Sub-section Title
</h3>

// Card Headers
<h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
  CARD LABEL
</h4>
```

### Body Text

```jsx
// Standard Body Text
<p className="text-sm text-gray-700 leading-relaxed">
  Regular paragraph content
</p>

// Emphasized Body Text
<strong className="font-semibold">Key Point:</strong>

// Metric Labels
<p className="text-xs text-gray-600">
  Descriptive label
</p>

// Large Metrics
<p className="text-3xl font-bold text-gray-900">
  79%
</p>

// Medium Metrics
<p className="text-2xl font-bold text-gray-900">
  6.25
</p>
```

---

## Component Patterns

### 1. Section Container (Outer Wrapper)

```jsx
<div className="mb-16">
  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
    {/* Header Bar */}
    <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-8 py-5">
      <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
        SECTION TITLE
      </h2>
    </div>
    
    {/* Content Area */}
    <div className="p-8 space-y-8">
      {/* Content goes here */}
    </div>
  </div>
</div>
```

### 2. KPI Metric Card (Single Metric)

```jsx
<div className="bg-blue-50 rounded-md p-5 border-l-4 border-blue-600">
  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
    METRIC LABEL
  </p>
  <p className="text-3xl font-bold text-gray-900 mt-1">
    79%
  </p>
  <p className="text-sm text-gray-700 mt-2">
    Descriptive subtitle
  </p>
</div>
```

### 3. KPI Dashboard (Multiple Metrics)

```jsx
<div className="grid md:grid-cols-3 gap-4">
  <div className="bg-blue-50 rounded-md p-5 border-l-4 border-blue-600">
    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Metric 1</p>
    <p className="text-3xl font-bold text-gray-900 mt-1">50%</p>
    <p className="text-sm text-gray-700 mt-2">Market leader</p>
  </div>
  
  <div className="bg-gray-50 rounded-md p-5 border-l-4 border-gray-400">
    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Metric 2</p>
    <p className="text-3xl font-bold text-gray-900 mt-1">21%</p>
    <p className="text-sm text-gray-700 mt-2">Challenger</p>
  </div>
  
  <div className="bg-gray-50 rounded-md p-5 border-l-4 border-gray-300">
    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Metric 3</p>
    <p className="text-3xl font-bold text-gray-900 mt-1">29%</p>
    <p className="text-sm text-gray-700 mt-2">Others</p>
  </div>
</div>
```

### 4. Insight Box (Strategic Finding)

```jsx
<div className="bg-blue-50 rounded-md p-5 border border-blue-100">
  <p className="text-sm text-gray-700 leading-relaxed">
    <strong className="font-semibold">Key Insight Title:</strong> 
    Detailed explanation of the strategic finding with context and implications.
  </p>
</div>
```

### 5. Two-Column Comparison

```jsx
<div className="grid md:grid-cols-2 gap-6">
  <div className="bg-blue-50 rounded-md p-5 border border-blue-100">
    <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
      Category A
    </h4>
    <p className="text-sm text-gray-700 leading-relaxed mb-3">
      Description and analysis for category A
    </p>
    <p className="text-xs text-gray-600">Key driver: Factor</p>
  </div>
  
  <div className="bg-purple-50 rounded-md p-5 border border-purple-100">
    <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
      Category B
    </h4>
    <p className="text-sm text-gray-700 leading-relaxed mb-3">
      Description and analysis for category B
    </p>
    <p className="text-xs text-gray-600">Key driver: Factor</p>
  </div>
</div>
```

### 6. Detailed Metric Card (With Breakdown)

```jsx
<div className="flex items-center gap-4 bg-red-50 rounded-md p-4 border-l-4 border-red-600">
  <div className="flex-1">
    <p className="text-sm font-semibold text-gray-900">Issue Name</p>
    <p className="text-xs text-gray-600 mt-0.5">Detailed description of the issue</p>
  </div>
  <div className="text-right">
    <p className="text-xl font-bold text-red-600">46%</p>
    <p className="text-xs text-gray-600">of sample</p>
  </div>
</div>
```

### 7. List of Strategic Points

```jsx
<div className="bg-blue-50 rounded-md p-5 border border-blue-200">
  <h4 className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-3">
    STRATEGIC IMPLICATIONS
  </h4>
  <div className="space-y-2 text-sm text-gray-700">
    <p><strong className="font-semibold">• Point 1:</strong> Description</p>
    <p><strong className="font-semibold">• Point 2:</strong> Description</p>
    <p><strong className="font-semibold">• Point 3:</strong> Description</p>
  </div>
</div>
```

### 8. Methodology Box

```jsx
<div className="bg-gray-50 rounded-md p-5 border border-gray-200">
  <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
    Methodology: Title
  </h4>
  <div className="flex flex-wrap gap-4 text-xs text-gray-700">
    <span><strong className="font-semibold">#1 Rank:</strong> 4 points</span>
    <span className="text-gray-400">|</span>
    <span><strong className="font-semibold">#2 Rank:</strong> 3 points</span>
    <span className="text-gray-400">|</span>
    <span><strong className="font-semibold">#3 Rank:</strong> 2 points</span>
  </div>
</div>
```

---

## Section Templates

### Executive Summary Template

```jsx
<div className="mb-16">
  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
    {/* Header Bar */}
    <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-white tracking-wide">
          EXECUTIVE SUMMARY
        </h2>
        <div className="flex flex-wrap gap-6 text-sm">
          <div>
            <span className="text-gray-300">Study:</span>
            <span className="text-white font-semibold ml-2">Study Name</span>
          </div>
          <div>
            <span className="text-gray-300">Sample:</span>
            <span className="text-white font-semibold ml-2">N=14</span>
          </div>
          <div>
            <span className="text-gray-300">Date:</span>
            <span className="text-white font-semibold ml-2">Nov 2024</span>
          </div>
        </div>
      </div>
    </div>

    {/* KPI Dashboard */}
    <div className="p-8 bg-gray-50 border-b border-gray-200">
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-md p-5 border-l-4 border-blue-600 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            KPI 1
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-2">50%</p>
          <p className="text-xs text-gray-600 mt-1">Description</p>
        </div>
        {/* Repeat for 3 more KPIs */}
      </div>
    </div>

    {/* Category Dynamics */}
    <div className="p-8 border-b border-gray-200">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
        Category Dynamics
      </h3>
      <p className="text-sm text-gray-700 leading-relaxed">
        Strategic insights paragraph...
      </p>
    </div>

    {/* Strategic Imperatives */}
    <div className="p-8 border-b border-gray-200 bg-blue-50/30">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-6">
        Strategic Imperatives
      </h3>
      <div className="space-y-5">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
            1
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">Title</h4>
            <p className="text-sm text-gray-700 leading-relaxed">Description</p>
          </div>
        </div>
        {/* Repeat for 2-3 more imperatives */}
      </div>
    </div>

    {/* Market Composition Footer */}
    <div className="p-8 bg-gray-50">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">79%</p>
          <p className="text-xs text-gray-600 uppercase tracking-wider mt-1">
            Self Purchase
          </p>
        </div>
        {/* Repeat for 3 more metrics */}
      </div>
    </div>
  </div>
</div>
```

### Data Section Template

```jsx
<div className="mb-16">
  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
    {/* Header Bar */}
    <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-8 py-5">
      <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
        SECTION TITLE
      </h2>
    </div>
    
    {/* Content Area */}
    <div className="p-8 space-y-8">
      {/* Sub-section 1: Key Findings */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-5">
          Key Findings
        </h3>
        
        {/* KPI Dashboard */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-md p-5 border-l-4 border-blue-600">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Primary Metric
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-1">50%</p>
            <p className="text-sm text-gray-700 mt-2">Description</p>
          </div>
          {/* More metrics... */}
        </div>
        
        {/* Insight Box */}
        <div className="bg-blue-50 rounded-md p-5 border border-blue-100">
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="font-semibold">Strategic Insight:</strong> 
            Detailed explanation...
          </p>
        </div>
      </div>

      {/* Chart Container */}
      <div className="p-4">
        <div id="chart_id" className="w-full min-h-[500px]"></div>
      </div>

      {/* Sub-section 2: Detailed Analysis */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
          Detailed Analysis
        </h3>
        <div className="space-y-3">
          {/* Detailed metric cards */}
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Code Examples

### Complete Section Example: Market Share Analysis

```jsx
<div className="mb-16">
  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
    <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-8 py-5">
      <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
        MARKET SHARE ANALYSIS
      </h2>
    </div>
    
    <div className="p-8 space-y-8">
      {/* Market Leaders */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-5">
          Competitive Landscape
        </h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-md p-5 border-l-4 border-blue-600">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Market Leader
            </p>
            <p className="text-xl font-bold text-gray-900 mt-1">Brand X</p>
            <p className="text-sm text-gray-600 mt-0.5">50% primary usage</p>
          </div>
          <div className="bg-gray-50 rounded-md p-5 border-l-4 border-gray-400">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Challenger
            </p>
            <p className="text-xl font-bold text-gray-900 mt-1">Brand Y</p>
            <p className="text-sm text-gray-600 mt-0.5">21% primary usage</p>
          </div>
          <div className="bg-gray-50 rounded-md p-5 border-l-4 border-gray-300">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Others
            </p>
            <p className="text-xl font-bold text-gray-900 mt-1">Various</p>
            <p className="text-sm text-gray-600 mt-0.5">29% combined</p>
          </div>
        </div>
        <div className="bg-blue-50 rounded-md p-5 border border-blue-100">
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="font-semibold">Market Dynamics:</strong> 
            Brand X maintains category dominance with 50% primary brand usage, 
            leveraging distribution strength and habitual purchase patterns.
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="p-4">
        <div id="market_share_chart" className="w-full min-h-[500px]"></div>
      </div>
    </div>
  </div>
</div>
```

---

## Best Practices

### Do's ✅
- Use semantic colors (red for problems, green for opportunities, blue for primary data)
- Maintain consistent spacing (space-y-8 for major sections)
- Include descriptive labels under metrics
- Use uppercase tracking-wide for headers
- Add left-border accents to KPI cards
- Provide context in insight boxes
- Keep text sizes small and professional (text-sm, text-xs)
- Use bold selectively for emphasis

### Don'ts ❌
- Don't use large decorative fonts
- Don't use multiple bright colors in one section
- Avoid excessive shadows or gradients
- Don't center-align body text
- Don't use emojis in professional reports
- Avoid mixing too many font sizes in one section
- Don't use icons without purpose
- Avoid overly complex nested structures

---

## Responsive Design

### Mobile Considerations
```jsx
// Use responsive grid columns
className="grid md:grid-cols-3 gap-4"  // Stack on mobile, 3 cols on desktop

// Responsive text sizes
className="text-sm md:text-base"

// Responsive flex direction
className="flex flex-col md:flex-row"

// Responsive padding
className="px-4 md:px-8"
```

---

## Chart Integration

### Chart Container Pattern
```jsx
<div className="p-4">
  <div id="chart_id" className="w-full min-h-[500px]"></div>
</div>

// For larger charts
<div className="p-4">
  <div id="chart_id" className="w-full min-h-[600px]"></div>
</div>
```

### Chart Grid Layout
```jsx
<div className="grid md:grid-cols-2 gap-8">
  <div className="p-4">
    <div id="chart_1" className="w-full min-h-[500px]"></div>
  </div>
  <div className="p-4">
    <div id="chart_2" className="w-full min-h-[500px]"></div>
  </div>
</div>
```

---

## Quick Reference: Common Patterns

### Pattern 1: Stat + Description Card
```jsx
<div className="bg-blue-50 rounded-md p-5 border-l-4 border-blue-600">
  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Label</p>
  <p className="text-3xl font-bold text-gray-900 mt-1">79%</p>
  <p className="text-sm text-gray-700 mt-2">Description text</p>
</div>
```

### Pattern 2: Problem/Issue Card
```jsx
<div className="flex items-center gap-4 bg-red-50 rounded-md p-4 border-l-4 border-red-600">
  <div className="flex-1">
    <p className="text-sm font-semibold text-gray-900">Issue Name</p>
    <p className="text-xs text-gray-600 mt-0.5">Context and description</p>
  </div>
  <div className="text-right">
    <p className="text-xl font-bold text-red-600">46%</p>
    <p className="text-xs text-gray-600">affected</p>
  </div>
</div>
```

### Pattern 3: Insight Box
```jsx
<div className="bg-amber-50 rounded-md p-5 border border-amber-100">
  <p className="text-sm text-gray-700 leading-relaxed">
    <strong className="font-semibold">Key Insight:</strong> Strategic finding...
  </p>
</div>
```

### Pattern 4: Two-Column Split
```jsx
<div className="grid md:grid-cols-2 gap-6">
  <div>{/* Left content */}</div>
  <div>{/* Right content */}</div>
</div>
```

---

## Version History
- v1.0 (Nov 2024) - Initial template based on Innerwear Report design system
- Applied to: Innerwear Market Research Report

## Credits
Design inspired by: Kantar BrandZ, Nielsen Market Studies, McKinsey Reports

