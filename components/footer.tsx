export function Footer() {
  return (
    <footer className="py-12 sm:py-16" style={{ borderTop: "1px solid var(--t-border)" }}>
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="font-bold text-xl tracking-tight" style={{ color: "var(--t-text)" }}>
                Tranzmit
              </span>
              <p className="mt-2 text-sm" style={{ color: "var(--t-text-muted)" }}>
                AI that listens, understands, and retains.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              <a
                href="mailto:contact@trazmit.com"
                className="text-sm transition-colors hover:opacity-70"
                style={{ color: "var(--t-text-secondary)" }}
              >
                contact@trazmit.com
              </a>
              <a
                href="https://calendly.com/tranzmitai/new-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: "var(--t-text-secondary)" }}
              >
                Book a Demo
              </a>
            </div>
          </div>

          <div
            className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid var(--t-border)" }}
          >
            <p className="text-xs" style={{ color: "var(--t-text-muted)" }}>
              &copy; {new Date().getFullYear()} Tranzmit. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs transition-colors hover:opacity-70" style={{ color: "var(--t-text-muted)" }}>
                Privacy
              </a>
              <a href="#" className="text-xs transition-colors hover:opacity-70" style={{ color: "var(--t-text-muted)" }}>
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
