export default function StatusFooter({ status }) {
  const tone = status === 'LIVE' ? 'green' : 'amber';
  return <footer><span className={tone}>Market data {status}</span><i>•</i><span className={tone}>Execution feed {status}</span><i>•</i><span className="green">Position snapshot MATCHED</span><span className="footer-right">Valuation quality: GOOD <i>•</i> Reconciliation: MATCHED</span></footer>;
}
