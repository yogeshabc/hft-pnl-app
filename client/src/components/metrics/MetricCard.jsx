export default function MetricCard({ label, value, primary = false }) {
  return <article className={`metric ${primary ? 'primary' : ''}`}><div className="label">{label}</div><strong>{value}</strong></article>;
}
