# HFT / Live P&L monitor — client mockup

A React + JavaScript mockup based on the two screens in `HFT_PnL_Frontend_UI_Specification(1).pdf`. The current scope is a visual client demo with synthetic fixture data only. It does not connect to a broker, OMS, exchange, database, authentication provider, or live market-data feed.

## Screens in the specification

1. **Live P&L monitor** — session header, account/strategy/exchange/units filters, eight metric cards, session net P&L chart, Positions / Orders / Fills / Alerts tabs, positions grid, persistent status footer.
2. **Instrument detail** — same session context and four P&L cards, selected instrument summary, recent fills, valuation and reconciliation panel, persistent status footer. Open it by selecting a position row; return with “Back to positions”.

## Scalable frontend structure

```text
client/src/
  App.jsx                         # app shell, shared state, lazy page loading
  components/
    layout/                       # spec heading, header, persistent footer
    filters/                      # session filters and search field
    metrics/                      # reusable metric card/grid
    charts/                       # session P&L chart
    tables/                       # positions and recent fills tables
  features/
    monitor/pages/                 # Live P&L monitor screen
    instrument/pages/              # Instrument detail screen
  data/mockData.js                 # synthetic demo fixtures, replace with API adapters later
  hooks/useDebouncedValue.js       # reusable debounced input hook
  lib/format.js                    # pure search/formatting helpers
```

### Design choices

- Each screen is imported with `React.lazy()` and rendered inside `Suspense`, so the detail screen is loaded only when opened. Vite creates separate page chunks at build time.
- Search input is debounced by 300 ms. Filtering is performed on the debounced value, not on every keystroke. The search matches contract ID and full symbol.
- Shared UI is in `components/`; screen-specific composition is in `features/`. Add future screens under `features/<domain>/pages/` and lazy-import them from the app shell.
- The filters and selected instrument stay in the app shell, so navigation between the two screens preserves the selected session scope.
- All displayed values are mock fixtures and intentionally labelled illustrative. Do not interpret them as real P&L.

## Step-by-step setup

### 1. Install prerequisites

- Node.js 20 or newer (LTS recommended)
- npm (included with Node.js)
- VS Code or another editor

Check versions:

```bash
node -v
npm -v
```

### 2. Extract the ZIP

Extract `HFT_PnL_Project_Download.zip` and open the `hft-pnl-app` folder in VS Code.

### 3. Install dependencies

Open a terminal in the project root (the folder containing the root `package.json`) and run:

```bash
npm install
```

### 4. Start the mockup

```bash
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

### 5. Walk through the two screens

- The first screen opens as **HFT / Live P&L monitor**.
- Type `DEMO` or `DEMO-FUT-01` into the search field. Results update after approximately 300 ms.
- Select the `DEMO INDEX FUT` row to open **HFT / Instrument detail**.
- Use **Back to positions** to return to the dashboard. The session filters remain in place.
- Use the refresh icon to toggle the illustrative feed status between LIVE and STALE.
- Try the Positions, Orders, Fills and Alerts tabs.

### 6. Create a production build

```bash
npm run build
```

The output is generated in `client/dist/`. Inspect the build output to see the separate lazy-loaded page chunks.

## Future implementation plan (not part of this mockup)

1. Confirm screen flows, fields, responsive behaviour and client feedback.
2. Define API contracts and typed domain models for session scope, snapshots, positions, orders, fills and alerts.
3. Add authentication and server-side account authorization.
4. Connect backend-owned P&L and valuation services; keep exact decimal values as strings or integer minor units.
5. Implement WebSocket snapshot/delta sequencing, gap detection, reconnect and reconciliation states.
6. Add server-side filtering, cursor pagination, virtualization for large position grids, and query caching/state management.
7. Add automated component, integration, accessibility, security and performance tests.

Do not add trading controls or calculate authoritative P&L in the browser. The frontend should display values supplied by the authorized backend.
