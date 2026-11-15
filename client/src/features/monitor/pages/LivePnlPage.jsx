import { useState } from 'react';
import SessionPnlChart from '../../../components/charts/SessionPnlChart';
import PositionsTable from '../../../components/tables/PositionsTable';
import { pnlHistory } from '../../../data/mockData';

const tabs = ['Positions', 'Orders', 'Fills', 'Alerts'];

export default function LivePnlPage({ rows, units, onSelectInstrument }) {
  const [activeTab, setActiveTab] = useState('Positions');
  return <>
    <SessionPnlChart data={pnlHistory} />
    <section className="panel positions">
      <nav className="tabs" aria-label="Monitor data tabs">{tabs.map(tab => <button type="button" key={tab} className={activeTab === tab ? 'selected' : ''} onClick={() => setActiveTab(tab)}>{tab}{tab === 'Positions' ? `  ${rows.length}` : ''}</button>)}</nav>
      {activeTab === 'Positions' ? <PositionsTable rows={rows} units={units} onSelect={onSelectInstrument} /> :
        <div className="empty">{activeTab === 'Orders' ? 'No working orders in this illustrative snapshot.' : activeTab === 'Fills' ? '2 executions in this illustrative snapshot.' : 'No active alerts.'}</div>}
    </section>
  </>;
}
