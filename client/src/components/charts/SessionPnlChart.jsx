import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const formatInr = value => `${value >= 0 ? '+' : '−'}₹${Math.abs(value).toLocaleString('en-IN')}`;

export default function SessionPnlChart({ data }) {
  return <section className="panel chart-panel">
    <div className="panel-title">Session net P&amp;L <span>1m buckets</span></div>
    <div className="chart"><ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
        <defs><linearGradient id="pnlFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#55dfb8" stopOpacity={0.15} /><stop offset="100%" stopColor="#55dfb8" stopOpacity={0} /></linearGradient></defs>
        <XAxis dataKey="time" tick={{ fill: '#8195ae', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: '#162337', border: '1px solid #30435c', color: '#e5edf7' }} formatter={value => [formatInr(value), 'Net P&L']} />
        <Area type="monotone" dataKey="pnl" stroke="#55dfb8" strokeWidth={1.7} fill="url(#pnlFill)" />
      </AreaChart>
    </ResponsiveContainer></div>
  </section>;
}
