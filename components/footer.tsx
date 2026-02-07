export function Footer() {
  return (
    <footer className="py-10 sm:py-14" style={{ borderTop: "1px solid var(--t-border)" }}>
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-bold text-xl tracking-tight" style={{ color: "var(--t-text)" }}>
              Tranzmit
            </span>
            <p className="mt-2 text-sm" style={{ color: "var(--t-text-muted)" }}>
              AI that listens, decides, and speaks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            <a
              href="mailto:contact@trazmit.com"
              className="text-sm transition-colors"
              style={{ color: "var(--t-text-secondary)" }}
            >
              contact@trazmit.com
            </a>
            <a
              href="https://calendly.com/tranzmitai/new-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium transition-colors"
              style={{ color: "var(--t-text-secondary)" }}
            >
              Request a Demo
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
