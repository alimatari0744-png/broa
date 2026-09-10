export function WindowMotif({ className = '' }: { className?: string }) {
  return (
    <span className={`window-motif ${className}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  )
}
