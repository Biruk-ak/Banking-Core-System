# Banking Core System Architecture

Owner: Biruk-ak <birukaklilu0110@gmail.com>

## Style

- DDD aggregates per product bounded context
- CQRS command/query separation
- Saga orchestration for multi-step payments
- Kafka for domain events
- Redis for session/rate-limit/cache
- Postgres for transactional state
- Elasticsearch for read models and search

## Bounded contexts

Products, Features (compliance & engagement), Ledger, Workflows, Platform modules.

## Quickstart for contributors

1. Read `CONTRIBUTING.md`
2. Run `npm test` before opening a PR
3. Prefer small PRs scoped to one bounded context
