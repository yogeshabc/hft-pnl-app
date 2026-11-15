export default function RecentFillsTable({ fills }) {
  return <div className="panel detail-panel"><div className="panel-title">Recent fills</div>
    <div className="table-wrap"><table><thead><tr><th>Time IST</th><th>Execution ID</th><th>Side</th><th>Filled qty</th><th>Price</th></tr></thead>
      <tbody>{fills.map(fill => <tr key={fill.executionId}><td>{fill.time}</td><td>{fill.executionId}</td><td>{fill.side}</td><td>{fill.quantity}</td><td>{fill.price}</td></tr>)}</tbody>
    </table></div>
  </div>;
}
