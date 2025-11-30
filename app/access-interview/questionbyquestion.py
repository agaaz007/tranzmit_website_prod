import plotly.graph_objects as go
import pandas as pd

# --- GLOBAL THEME CONFIGURATION ---
# Matching the "Strategic Dark Mode" from the Report
BG_COLOR = '#1a1a2e'     # Dark Navy Background
CARD_COLOR = '#16213e'   # Card Background
TEXT_MAIN = '#e94560'    # Critical/Accent (Red)
TEXT_SUB = '#a2a8d3'     # Sub-text (Muted Blue)
ACCENT_BLUE = '#0f3460'  # Structural Blue
WHITE = '#ffffff'

def apply_strategic_theme(fig, title_text):
    """Applies the custom FreeCulture brand theme to any Plotly figure."""
    fig.update_layout(
        title=dict(text=f"<b>{title_text}</b>", font=dict(size=22, color=TEXT_MAIN)),
        paper_bgcolor=BG_COLOR,
        plot_bgcolor=CARD_COLOR,
        font=dict(family="Segoe UI, sans-serif", color=TEXT_SUB),
        xaxis=dict(showgrid=True, gridcolor='rgba(255,255,255,0.05)', zeroline=False),
        yaxis=dict(showgrid=True, gridcolor='rgba(255,255,255,0.05)', zeroline=False),
        legend=dict(font=dict(color=WHITE), orientation="h", y=1.1),
        margin=dict(t=80, b=40, l=40, r=40),
        hovermode="x unified"
    )
    return fig

# ==============================================================================
# 1. THE SURVIVAL CURVE (Time-to-Failure Analysis)
# Insight: Satisfaction crashes at Day 60 due to elastic fatigue.
# ==============================================================================
def plot_survival_curve():
    time_points = ['Unboxing', 'Week 2', 'Month 1', 'Month 1.5', 'Month 2', 'Month 3', 'Month 6']
    # Satisfaction scores derived from R9, R12, R2 transcripts
    satisfaction_scores = [9.8, 9.5, 8.8, 7.5, 5.5, 4.0, 3.0]

    fig = go.Figure()

    # The Satisfaction Line
    fig.add_trace(go.Scatter(
        x=time_points, 
        y=satisfaction_scores,
        mode='lines+markers',
        line=dict(color=TEXT_MAIN, width=4, shape='spline'),
        marker=dict(size=12, color=BG_COLOR, line=dict(width=3, color=TEXT_MAIN)),
        name='Product Integrity Score',
        fill='tozeroy',
        fillcolor='rgba(233, 69, 96, 0.1)'
    ))

    # The "Cliff" Annotation
    fig.add_annotation(
        x='Month 2', y=5.5,
        text="⚠️ THE CHURN CLIFF<br>(Elastic Fatigue & Tearing)",
        showarrow=True,
        arrowhead=2,
        arrowsize=1,
        arrowwidth=2,
        arrowcolor=WHITE,
        ax=0, ay=-60,
        bgcolor=TEXT_MAIN,
        bordercolor=WHITE,
        font=dict(color=WHITE, size=12)
    )

    fig = apply_strategic_theme(fig, "📉 The Product 'Survival Curve'")
    fig.update_yaxes(range=[0, 11], title="Satisfaction Score (0-10)")
    fig.show()

# ==============================================================================
# 2. THE COTTON PARADOX (Behavioral Economics)
# Insight: Users say "Cotton" (Habit) but buy "Bamboo" (Experience).
# ==============================================================================
def plot_cotton_paradox():
    categories = ['Cotton', 'Bamboo/Modal', 'Synthetic/Nylon']
    stated_pref = [76, 12, 12]  # What they SAY (R1, R4, R12)
    actual_praise = [15, 80, 5] # What they PRAISE (Softness/Smoothness)

    fig = go.Figure()

    fig.add_trace(go.Bar(
        x=categories, y=stated_pref,
        name='Stated Preference (Habit)',
        marker_color=ACCENT_BLUE,
        text=[f"{x}%" for x in stated_pref], textposition='auto'
    ))

    fig.add_trace(go.Bar(
        x=categories, y=actual_praise,
        name='Actual Delight (Experience)',
        marker_color=TEXT_MAIN,
        text=[f"{x}%" for x in actual_praise], textposition='auto'
    ))

    fig = apply_strategic_theme(fig, "🧵 The 'Cotton Paradox' (Cognitive Dissonance)")
    fig.update_layout(barmode='group')
    fig.update_yaxes(title="Percentage of Respondents")
    fig.show()

# ==============================================================================
# 3. SHARE OF DRAWER (Co-Habitation)
# Insight: FreeCulture is a "Roommate" to Jockey, not a replacement.
# ==============================================================================
def plot_drawer_share():
    labels = ['Also Own Jockey', 'Also Own DaMensch', 'Also Own XYXX', 'Exclusive to FreeCulture']
    values = [85, 35, 25, 15] # Note: Overlapping data visualized as relative share
    colors = ['#2c3e50', '#e94560', '#8e44ad', '#27ae60']

    fig = go.Figure(data=[go.Pie(
        labels=labels, 
        values=values, 
        hole=.6, # Donut chart
        marker=dict(colors=colors, line=dict(color=BG_COLOR, width=4)),
        textinfo='percent',
        hoverinfo='label+percent',
        textfont=dict(size=14)
    )])

    # Center Text
    fig.add_annotation(
        text="THE<br>ROOMMATE<br>EFFECT",
        x=0.5, y=0.5,
        font=dict(size=16, color=WHITE, weight="bold"),
        showarrow=False
    )

    fig = apply_strategic_theme(fig, "🩳 'Share of Drawer' Co-Habitation")
    fig.show()

# ==============================================================================
# 4. SHAPEWEAR RESISTANCE (Stacked Bar)
# Insight: 30% are skeptical due to "Visible Lines" & "Comfort".
# ==============================================================================
def plot_shapewear_resistance():
    fig = go.Figure()

    # Stacked Horizontal Bar
    fig.add_trace(go.Bar(
        y=['Sentiment'], x=[58],
        name='Immediate Buy',
        orientation='h', marker=dict(color='#27ae60'),
        text="58% Buy Now", textposition='auto'
    ))

    fig.add_trace(go.Bar(
        y=['Sentiment'], x=[28],
        name='Skeptical (Fear of Lines)',
        orientation='h', marker=dict(color='#f1c40f'),
        text="28% Skeptical", textposition='auto'
    ))

    fig.add_trace(go.Bar(
        y=['Sentiment'], x=[14],
        name='Reject',
        orientation='h', marker=dict(color='#c0392b'),
        text="14% Reject", textposition='auto'
    ))

    fig = apply_strategic_theme(fig, "🛡️ Shapewear: The Trust Barrier")
    fig.update_layout(barmode='stack', xaxis=dict(range=[0,100], title="Percentage"))
    fig.show()

# ==============================================================================
# 5. DEMOGRAPHIC MATRIX (Bubble Chart)
# Insight: Millennials are the highest churn risk due to Active needs.
# ==============================================================================
def plot_demographic_matrix():
    # Data: [Segment, Age, Satisfaction, Market Size]
    segments = ['Gen Z (Style)', 'Millennials (Churn Risk)', 'Boomers (Comfort)']
    age = [20, 32, 60]          # X-Axis
    satisfaction = [85, 35, 95] # Y-Axis (Millennials low due to "Active" gap)
    market_size = [40, 60, 30]  # Bubble Size
    colors = ['#27ae60', '#e94560', '#0f3460']

    fig = go.Figure()

    for i in range(len(segments)):
        fig.add_trace(go.Scatter(
            x=[age[i]], y=[satisfaction[i]],
            mode='markers',
            marker=dict(
                size=market_size[i] * 1.5,
                color=colors[i],
                line=dict(width=2, color=WHITE)
            ),
            name=segments[i],
            text=f"<b>{segments[i]}</b><br>Avg Age: {age[i]}<br>Satisfaction: {satisfaction[i]}%",
            hoverinfo='text'
        ))

    # Add "Active Gap" Annotation
    fig.add_annotation(
        x=32, y=25,
        text="<b>THE ACTIVE GAP</b><br>(Need Nylon Line)",
        showarrow=True, arrowcolor=WHITE, ax=0, ay=40,
        font=dict(color=TEXT_MAIN, weight="bold")
    )

    fig = apply_strategic_theme(fig, "🎯 Demographic Priorities Matrix")
    fig.update_xaxes(title="Average Age", range=[15, 70])
    fig.update_yaxes(title="Satisfaction Score (%)", range=[0, 110])
    fig.show()

# ===================== =========================================================
# MAIN EXECUTION
# ==============================================================================
if __name__ == "__main__":
    print("Generating FreeCulture Strategic Visualizations...")
    plot_survival_curve()
    plot_cotton_paradox()
    plot_drawer_share()
    plot_shapewear_resistance()
    plot_demographic_matrix()
    print("Interactive dashboards generated successfully.")