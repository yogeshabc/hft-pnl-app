import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import SpecHeading from './components/layout/SpecHeading';
import ScreenHeader from './components/layout/ScreenHeader';
import SessionFilters from './components/filters/SessionFilters';
import MetricGrid from './components/metrics/MetricGrid';
import StatusFooter from './components/layout/StatusFooter';
import { positions } from './data/mockData';
import { buildSummary, filterPositions, getFilterOptions } from './lib/format';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import './styles.css';

// Each page is a separate bundle and is downloaded only when opened.
const LivePnlPage = lazy(() => import('./features/monitor/pages/LivePnlPage'));
const InstrumentDetailPage = lazy(() => import('./features/instrument/pages/InstrumentDetailPage'));

const initialFilters = {
  account: 'DEMO01', strategy: 'HFT A', exchange: 'NSE', underlying: 'NIFTY',
  expiry: '30-Oct-2026', instrument: 'FUTURE', units: 'Contracts',
};

export default function App() {
  const [screen, setScreen] = useState('monitor');
  const [status, setStatus] = useState('LIVE');
  // Kept in the app shell so the exact same selection survives monitor/detail navigation.
  const [filters, setFilters] = useState(initialFilters);
  const [searchInput, setSearchInput] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState(positions[0]);
  const debouncedSearch = useDebouncedValue(searchInput, 300);
  const filterOptions = useMemo(() => getFilterOptions(positions), []);
  const filteredPositions = useMemo(
    () => filterPositions(positions, filters, debouncedSearch),
    [filters, debouncedSearch]
  );
  const visibleSummary = useMemo(() => buildSummary(filteredPositions, filters.units), [filteredPositions, filters.units]);

  const updateFilter = useCallback((key, value) => {
    setFilters(current => ({ ...current, [key]: value }));
  }, []);
  const openInstrument = useCallback(instrument => {
    setSelectedInstrument(instrument);
    setScreen('detail');
  }, []);

  return <main className="terminal">
    <SpecHeading />
    <ScreenHeader screen={screen} status={status} onToggleStatus={() => setStatus(current => current === 'LIVE' ? 'STALE' : 'LIVE')} />
    <SessionFilters filters={filters} onChange={updateFilter} options={filterOptions} search={searchInput} onSearchChange={setSearchInput} />
    <MetricGrid summary={visibleSummary} detail={screen === 'detail'} />
    <Suspense fallback={<div className="panel loading-state">Loading screen…</div>}>
      {screen === 'monitor'
        ? <LivePnlPage rows={filteredPositions} units={filters.units} onSelectInstrument={openInstrument} />
        : <InstrumentDetailPage instrument={selectedInstrument} filters={filters} onBack={() => setScreen('monitor')} />}
    </Suspense>
    <StatusFooter status={status} />
  </main>;
}
