export const matchesInstrument = (position, query) => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return position.id.toLowerCase().includes(normalized) || position.symbol.toLowerCase().includes(normalized);
};

export const getFilterOptions = rows => ({
  account: [...new Set(rows.map(row => row.account))].sort(),
  strategy: [...new Set(rows.map(row => row.strategy))].sort(),
  exchange: [...new Set(rows.map(row => row.exchange))].sort(),
  underlying: [...new Set(rows.map(row => row.underlying))].sort(),
  expiry: [...new Set(rows.map(row => row.expiry))].sort(),
  instrument: [...new Set(rows.map(row => row.instrument))].sort(),
});

export const filterPositions = (rows, filters, search = '') => rows.filter(row =>
  ['account', 'strategy', 'exchange', 'underlying', 'expiry', 'instrument']
    .every(key => filters[key] === 'ALL' || row[key] === filters[key]) && matchesInstrument(row, search)
);

export const formatQuantity = (quantity, row, units) => {
  const value = units === 'Lots' ? quantity / row.lotSize : quantity;
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(value);
};

export const buildSummary = (rows, units = 'Contracts') => {
  const sum = key => rows.reduce((total, row) => total + (row[key] || 0), 0);
  const signed = value => `${value > 0 ? '+' : ''}${value.toLocaleString('en-IN')}`;
  const money = value => `${value < 0 ? '-₹' : '+₹'}${Math.abs(value).toLocaleString('en-IN')}`;
  const mixedLots = units === 'Lots' && new Set(rows.map(row => row.id)).size > 1;
  const quantity = key => units === 'Lots'
    ? rows.reduce((total, row) => total + (row[key] || 0) / row.lotSize, 0)
    : sum(key);
  const quantityText = key => mixedLots ? '—' : quantity(key).toLocaleString('en-IN', { maximumFractionDigits: 2 });
  return {
    netPnl: money(sum('netPnlValue')), realised: money(sum('realisedValue')),
    unrealised: money(sum('unrealisedValue')), costs: `₹${sum('costsValue').toLocaleString('en-IN')}`,
    buyFilled: quantityText('buyValue'), sellFilled: quantityText('sellValue'),
    netPosition: mixedLots ? '—' : signed(quantity('netValue')),
    working: mixedLots ? '—' : `${quantityText('workingBuyValue')} / ${quantityText('workingSellValue')}`,
  };
};
