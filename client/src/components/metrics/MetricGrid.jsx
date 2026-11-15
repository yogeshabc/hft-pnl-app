import MetricCard from './MetricCard';

const dashboardMetrics = [
  ['NET P&L', 'netPnl', true], ['REALISED', 'realised'], ['UNREALISED', 'unrealised'], ['COSTS EST.', 'costs'],
  ['BUY FILLED', 'buyFilled'], ['SELL FILLED', 'sellFilled'], ['NET POSITION', 'netPosition'], ['WORKING BUY / SELL', 'working'],
];
const detailMetrics = dashboardMetrics.slice(0, 4);

export default function MetricGrid({ summary, detail = false }) {
  const metrics = detail ? detailMetrics : dashboardMetrics;
  return <section className={`metrics ${detail ? 'metrics-detail' : ''}`} aria-label="P&L summary">
    {metrics.map(([label, key, primary]) => <MetricCard key={key} label={label} value={summary[key]} primary={primary} />)}
  </section>;
}
