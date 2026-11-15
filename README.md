# HFT PnL Monitor

Desktop-first, read-only HFT P&L monitoring demo based on the supplied HFT PnL Frontend UI Specification. Uses React + JavaScript + Tailwind, Express, and PostgreSQL schema. All displayed fixture values are synthetic and are **not live trading data**.

## Features
- Session header, account/strategy/exchange filtering, snapshot/feed status, P&L cards, session chart, position grid and instrument drawer.
- Search, exchange filter, CSV export, stable row identity, missing mark rendered as an em dash, stale mark state.
- API snapshot contract includes scope, epoch, sequence, timestamp, summary, rows and feed health.
- Backend-owned accounting; frontend only formats authoritative decimal values.
- SQL schema includes effective-dated instrument metadata, account permissions, position snapshots and idempotent execution IDs.

## Requirements
Node.js 20+ and PostgreSQL 15+ (the UI currently runs on synthetic fixtures; the API snapshot endpoint is a deterministic demo adapter).

## Setup
```bash
cp server/.env.example server/.env
# Set a unique JWT_SECRET and DATABASE_URL before production use
npm install
npm run dev
```
Frontend: http://localhost:5173 · API: http://localhost:4000/health · Snapshot: http://localhost:4000/api/monitor/snapshot

## Tests / build
```bash
npm test
npm run build
```

## Structure
```text
client/                 React app, UI components, formatting utilities
server/src/config.js     environment configuration
server/src/middleware/   centralized errors and auth helpers
server/src/routes/       monitor API adapter
server/schema.sql        PostgreSQL schema and indexes
server/test/             Node test runner tests
```

## Design decisions
- **Separation:** browser app and API are separate workspace packages; frontend accesses data through monitor endpoints.
- **State:** React local state for view filters and selected instrument; derived totals use `useMemo`. For production, move stream state to a scoped reducer/store (Redux Toolkit or Zustand) and commit snapshot + deltas atomically.
- **Accounting:** backend is authoritative. Do not calculate P&L from a paginated set of fills. Use fixed precision decimal strings or integer minor units; never use JS floating point for accounting.
- **Streaming:** production WebSocket messages must carry epoch, sequence, previous sequence, scope hash and matching summary. On gap/epoch change, freeze values, mark reconciling, fetch snapshot and replay contiguous events. Batch visual updates 100–250ms; bound buffers and chart history.
- **Security:** authorize every account snapshot, endpoint and subscription server-side. Keep exchange/broker credentials out of the browser. JWT secret and DB URL are environment variables. The included auth middleware is a helper, not a complete login/refresh flow; wire it to an identity provider and account-permission repository before deployment.
- **Errors/observability:** centralized JSON error envelope, request ID, Helmet, bounded JSON body, origin allowlist and structured startup logging. Add production logger, metrics, tracing and audit logs.
- **AI assistance:** use AI for code explanation, test generation and operator-facing summaries only; never let an AI model author authoritative P&L, trading commands, or bypass account authorization.

## Production gaps to close
Connect approved OMS/position, execution, mark and cost services; implement PostgreSQL repositories and migrations; add real authentication/refresh and authorization integration; implement WebSocket snapshot/delta recovery; cursor pagination; instrument drawer APIs; quote-age/reconciliation alerts; observability; accessibility review; security review; and agreed load tests (spec proposes 5,000 positions / 10,000 row changes per second). Validate accounting against the authoritative ledger before production.
