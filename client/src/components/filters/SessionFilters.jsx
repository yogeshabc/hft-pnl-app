const filterConfig = [
  ['account', 'Account', 'All accounts'],
  ['strategy', 'Strategy', 'All strategies'],
  ['exchange', 'Exchange', 'All exchanges'],
  ['underlying', 'Underlying', 'All underlyings'],
  ['expiry', 'Expiry', 'All expiries'],
  ['instrument', 'Instrument', 'All instruments'],
  ['units', 'Quantity unit', null],
];

export default function SessionFilters({ filters, onChange, options, search, onSearchChange }) {
  return (
    <div className="filters" aria-label="Session filters">
      {filterConfig.map(([key, label, allLabel], index) => (
        <span className="filter-item" key={key}>
          {index > 0 && <i aria-hidden="true">|</i>}
          <label>{label}
            <select aria-label={label} value={filters[key]} onChange={event => onChange(key, event.target.value)}>
              {key === 'units' ? <><option value="Contracts">Contracts</option><option value="Lots">Lots</option></> : <>
                <option value="ALL">{allLabel}</option>
                {options[key].map(value => <option key={value} value={value}>{value}</option>)}
              </>}
            </select>
          </label>
        </span>
      ))}
      <div className="filter-extra"><input aria-label="Search contract ID or symbol" placeholder="Search contract ID or symbol" value={search} onChange={e => onSearchChange(e.target.value)} /></div>
    </div>
  );
}
