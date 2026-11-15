// Synthetic client-demo fixtures only. Never use these values for trading/accounting.
export const session = {
  date: '19 Oct 2026', timezone: 'IST', currency: 'INR', account: 'DEMO01',
  strategy: 'HFT A', exchange: 'NSE', units: 'Contracts', snapshotAge: '120 ms',
};

// Each row includes the filter dimensions from the specification.
export const positions = [
  { id: 'DEMO-FUT-01', symbol: 'DEMO INDEX FUT', exchange: 'NSE', account: 'DEMO01', strategy: 'HFT A', underlying: 'NIFTY', expiry: '30-Oct-2026', instrument: 'FUTURE', lotSize: 25, buyValue: 1000, sellValue: 800, netValue: 200, mark: '107.50', grossPnlValue: 5500, netPnlValue: 5300, status: 'LIVE', avgOpenCost: '100.00', multiplier: '1', openingPosition: '0', buyPrice: '100.00', sellPrice: '105.00', realisedValue: 4000, unrealisedValue: 1500, costsValue: 200, workingBuyValue: 100, workingSellValue: 150 },
  { id: 'DEMO-OPT-02', symbol: 'NIFTY 30 OCT 25000 CE', exchange: 'NSE', account: 'DEMO01', strategy: 'HFT B', underlying: 'NIFTY', expiry: '30-Oct-2026', instrument: 'OPTION', lotSize: 25, buyValue: 500, sellValue: 250, netValue: 250, mark: '212.40', grossPnlValue: 1800, netPnlValue: 1720, status: 'LIVE', avgOpenCost: '205.00', multiplier: '1', openingPosition: '0', buyPrice: '200.00', sellPrice: '210.00', realisedValue: 1250, unrealisedValue: 550, costsValue: 80, workingBuyValue: 50, workingSellValue: 0 },
  { id: 'DEMO-BSE-03', symbol: 'SENSEX FUT', exchange: 'BSE', account: 'DEMO02', strategy: 'HFT A', underlying: 'SENSEX', expiry: '27-Nov-2026', instrument: 'FUTURE', lotSize: 10, buyValue: 300, sellValue: 100, netValue: 200, mark: '81250.00', grossPnlValue: -900, netPnlValue: -950, status: 'STALE', avgOpenCost: '81300.00', multiplier: '1', openingPosition: '0', buyPrice: '81300.00', sellPrice: '81200.00', realisedValue: -100, unrealisedValue: -800, costsValue: 50, workingBuyValue: 0, workingSellValue: 100 },
];

export const summary = {
  netPnl: '+₹5,300', realised: '+₹4,000', unrealised: '+₹1,500', costs: '₹200',
  buyFilled: '1,000', sellFilled: '800', netPosition: '+200', working: '100 / 150',
};

export const pnlHistory = [
  { time: '09:15', pnl: 900 }, { time: '09:25', pnl: 1200 }, { time: '09:35', pnl: 600 },
  { time: '09:45', pnl: 2400 }, { time: '09:55', pnl: 2100 }, { time: '10:05', pnl: 3800 },
  { time: '10:15', pnl: 3500 }, { time: '10:25', pnl: 4800 }, { time: '10:30', pnl: 5300 },
];

export const fills = [
  { time: '10:00:00.120', executionId: 'EXEC-001', side: 'BUY', quantity: '1,000', price: '100.00' },
  { time: '10:15:00.240', executionId: 'EXEC-002', side: 'SELL', quantity: '800', price: '105.00' },
];
