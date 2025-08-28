# Banking Core System

[![CI](https://img.shields.io/badge/tests-63%20passing-brightgreen)](./tests)
[![License](https://img.shields.io/badge/license-UNLICENSED-lightgrey)](./package.json)
[![Stack](https://img.shields.io/badge/stack-Next.js%20%7C%20TypeScript%20%7C%20DDD-0d9488)](#tech-stack)
[![Owner](https://img.shields.io/badge/owner-Biruk--ak-blue)](https://github.com/Biruk-ak)

**Banking Core System** is a full-stack digital banking platform for modern financial institutions. It covers retail products, compliance engines, payments workflows, and operator consoles — built with Domain-Driven Design, CQRS, and event-driven microservices.

> Owner: **Biruk-ak** · `birukaklilu0110@gmail.com`  
> Repository: [github.com/Biruk-ak/Banking-Core-System](https://github.com/Biruk-ak/Banking-Core-System)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Products & Features](#products--features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Banking Core System provides a production-shaped foundation for:

- **Customer channels** — internet and mobile banking experiences
- **Product ledgering** — savings, current accounts, loans, cards, mortgages, FX, investments, insurance
- **Risk & compliance** — fraud detection, AML, KYC, and a configurable risk engine
- **Operations** — merchant dashboard, admin console, virtual cards, bill payments, analytics

The codebase is organized as a Next.js web application plus TypeScript domain services that demonstrate CQRS commands/queries, Saga orchestration, and integrations with Kafka, Redis, Postgres, and Elasticsearch.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Web | Next.js 14, React 18, TypeScript, Tailwind CSS |
| Domain | DDD aggregates, value objects, specifications |
| Patterns | CQRS, Saga, event bus |
| Data | Postgres (transactional), Redis (cache/sessions), Elasticsearch (read models) |
| Messaging | Kafka topics for domain events |
| Tests | Jest + ts-jest (60+ unit tests) |
| Infra (local) | Docker Compose |

---

## Products & Features

### Products

Savings · Current Accounts · Loans · Credit Cards · Mortgages · Investments · Foreign Exchange · Insurance · Mobile Banking · Internet Banking

### Features

Fraud Detection · AML · KYC · Risk Engine · AI Assistant · Budget Tracking · Spending Analytics · Bill Payments · Virtual Cards · Merchant Dashboard · Admin Console

---

## Architecture

```
┌─────────────────┐     commands/queries      ┌──────────────────────┐
│  Next.js Web    │ ─────────────────────────► │  Product Services    │
│  (App Router)   │ ◄───────────────────────── │  (CQRS + Aggregates) │
└─────────────────┘        read models         └──────────┬───────────┘
                                                          │ domain events
                                                          ▼
                                               ┌──────────────────────┐
                                               │ Kafka · Saga · Bus   │
                                               └──────────┬───────────┘
                          ┌──────────────┬────────────────┼──────────────┐
                          ▼              ▼                ▼              ▼
                     Postgres         Redis         Elasticsearch    Compliance
                     (write)         (cache)         (search)         Engines
```

See [docs/architecture.md](./docs/architecture.md) for bounded contexts and design notes.

---

## Prerequisites

- **Node.js** 18+ (recommended 20 or 24)
- **npm** 9+
- **Docker** & **Docker Compose** (optional, for local Postgres / Redis / Kafka / Elasticsearch)
- **Git**

---

## Installation

```bash
# 1. Clone the repository
git clone git@github.com:Biruk-ak/Banking-Core-System.git
cd Banking-Core-System

# 2. Install dependencies
npm install

# 3. (Optional) Start infrastructure
docker compose up -d

# 4. Start the web application
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Usage

### Development server

```bash
npm run dev
```

### Production build

```bash
npm run build
npm start
```

### API examples

**Health check**

```bash
curl -s http://localhost:3000/api/health | jq
```

Example response:

```json
{
  "service": "Banking Core System",
  "status": "healthy",
  "owner": "Biruk-ak",
  "email": "birukaklilu0110@gmail.com"
}
```

**List demo accounts**

```bash
curl -s http://localhost:3000/api/accounts | jq
```

**Create a transfer**

```bash
curl -s -X POST http://localhost:3000/api/transfers \
  -H 'Content-Type: application/json' \
  -d '{
    "fromAccountId": "acc-sav-001",
    "toAccountId": "acc-cur-001",
    "amount": 100,
    "currency": "USD",
    "memo": "Rent"
  }' | jq
```

### Domain usage (TypeScript)

```typescript
import { Money } from './packages/domain-core/src/money';
import { SavingsAggregate } from './services/savings/src/domain/aggregate';

const fees = {
  monthlyMaintenanceMinor: 100,
  transactionFeeMinor: 10,
  overdraftFeeMinor: 500,
  earlyClosurePenaltyBps: 10,
  fxMarkupBps: 20,
};

const limits = {
  dailyDebitMinor: 1_000_000_00,
  dailyCreditMinor: 2_000_000_00,
  singleTxnMinor: 500_000_00,
  monthlyVolumeMinor: 10_000_000_00,
  openPositionsMax: 5,
};

const account = SavingsAggregate.open('sav-1', 'customer-1', 'USD', fees, limits, 'teller');
account.activate('ops');
account.credit(Money.of(250, 'USD'), 'teller', 'DEP-1001');

console.log(account.toSnapshot().balanceMinor); // 25000
```

### Saga (payment transfer)

```typescript
import { createPaymentTransferSaga } from './services/shared/infra/saga';

const saga = createPaymentTransferSaga({
  debit: async () => { /* debit source */ },
  credit: async () => { /* credit destination */ },
  notify: async () => { /* notify parties */ },
  reverseDebit: async () => {},
  reverseCredit: async () => {},
  reverseNotify: async () => {},
});

const result = await saga.run();
// { id, state: 'completed' | 'failed', error? }
```

---

## Testing

```bash
npm test
```

The suite covers money/value objects, product aggregates, CQRS handlers, Saga compensation, Redis/Kafka/ES shims, compliance engines, ledger posting, and workflows.

```bash
# Watch mode
npm run test:watch
```

---

## Project Structure

```
├── src/                      # Next.js App Router UI + API routes
├── packages/domain-core/     # Money, Entity, AggregateRoot, Result
├── services/
│   ├── savings|loans|.../    # Product bounded contexts (CQRS)
│   ├── features/             # Fraud, AML, KYC, AI, analytics, ...
│   ├── workflows/            # Onboarding, wires, SEPA, SWIFT, ...
│   ├── platform/             # Notifications, identity, settlement, ...
│   ├── ledger/               # Double-entry ledger
│   └── shared/infra/         # Kafka, Redis, Postgres, ES, CQRS, Saga
├── tests/                    # Jest unit tests
├── docs/                     # Architecture documentation
├── docker-compose.yml        # Local infra stack
└── .github/                  # Issue & PR templates
```

---

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, branch naming, PR expectations, and coding standards.

---

## License

UNLICENSED — All rights reserved by **Biruk-ak** (`birukaklilu0110@gmail.com`), unless otherwise stated.
