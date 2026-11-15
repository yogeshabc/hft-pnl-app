import { formatQuantity } from '../../lib/format';

export default function PositionsTable({ rows, onSelect, units }) {
  return <div className="table-wrap"><table><thead><tr>
    <th>Instrument</th><th>Underlying</th><th>Expiry</th><th>Buy</th><th>Sell</th><th>Net</th><th>Mark</th><th>Gross P&amp;L</th><th>Net P&amp;L</th><th>Status</th>
  </tr></thead><tbody>
    {rows.map(row => <tr key={row.id} onClick={() => onSelect(row)} tabIndex={0} onKeyDown={e => e.key === 'Enter' && onSelect(row)}>
      <td>{row.symbol}<small className="row-subtitle">{row.id} · {row.exchange} · {row.account} · {row.strategy}</small></td>
      <td>{row.underlying}</td><td>{row.expiry}</td>
      <td>{formatQuantity(row.buyValue, row, units)}</td><td>{formatQuantity(row.sellValue, row, units)}</td><td>{formatQuantity(row.netValue, row, units)}</td>
      <td>{row.mark}</td><td>{row.grossPnlValue < 0 ? '-' : '+'}₹{Math.abs(row.grossPnlValue).toLocaleString('en-IN')}</td>
      <td>{row.netPnlValue < 0 ? '-' : '+'}₹{Math.abs(row.netPnlValue).toLocaleString('en-IN')}</td><td>{row.status}</td>
    </tr>)}
    {!rows.length && <tr><td colSpan="10" className="no-results">No positions match the selected filters.</td></tr>}
  </tbody></table><div className="hint">Showing {rows.length} matching instrument(s). Select a row to inspect its position and fills.</div></div>;
}
