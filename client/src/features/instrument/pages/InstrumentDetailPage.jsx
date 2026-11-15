import RecentFillsTable from '../../../components/tables/RecentFillsTable';
import { fills, positions } from '../../../data/mockData';
import { formatQuantity } from '../../../lib/format';

export default function InstrumentDetailPage({ instrument, filters, onBack }) {
  const item = instrument || positions[0];
  return <section className="detail-view">
    <div className="panel detail-panel instrument-summary">
      <div className="panel-title">{item.symbol} <span>Instrument ID {item.id}</span></div>
      <div className="detail-line"><span>Account {item.account}</span><span>Strategy {item.strategy}</span><span>Exchange {item.exchange}</span><span>Underlying {item.underlying}</span><span>Expiry {item.expiry}</span><span>Unit {filters.units}</span></div>
      <div className="detail-line"><span>Buy {formatQuantity(item.buyValue, item, filters.units)} @ {item.buyPrice}</span><span>Sell {formatQuantity(item.sellValue, item, filters.units)} @ {item.sellPrice}</span><span>Net {formatQuantity(item.netValue, item, filters.units)}</span><span>Mark {item.mark}</span></div>
      <small>Average open cost {item.avgOpenCost} <i>•</i> Multiplier {item.multiplier} <i>•</i> Opening position {item.openingPosition}</small>
    </div>
    <RecentFillsTable fills={fills} />
    <div className="panel detail-panel"><div className="panel-title">Valuation and reconciliation</div>
      <div className="detail-line"><span>Mark source MID</span><span>Quote age 80 ms</span><span>OMS matched</span><span>Cost status ESTIMATED</span></div>
    </div>
    <button type="button" className="back" onClick={onBack}>← Back to positions</button>
  </section>;
}
