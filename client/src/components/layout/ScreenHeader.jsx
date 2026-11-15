export default function ScreenHeader({ screen, status, onToggleStatus }) {
  return (
    <header className="head">
      <div>
        <h1>HFT <span>/</span> {screen === 'detail' ? 'Instrument detail' : 'Live P&L monitor'}</h1>
        <div className="meta">ILLUSTRATIVE DATA <i>•</i> INR <i>•</i> Session 19 Oct 2026 <i>•</i> Time IST</div>
      </div>
      <div className={`live ${status === 'LIVE' ? '' : 'stale'}`}>
        <b /> {status} <span>|</span> Snapshot age {status === 'LIVE' ? '120 ms' : '2.4 s'}
        <button type="button" onClick={onToggleStatus} aria-label="Toggle demo feed status">↻</button>
      </div>
    </header>
  );
}
