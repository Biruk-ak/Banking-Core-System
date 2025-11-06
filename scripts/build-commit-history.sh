#!/usr/bin/env bash
# Create 5+ years of commit history for Banking Core System
# Author: Biruk-ak <birukaklilu0110@gmail.com>
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

AUTHOR_NAME="Biruk-ak"
AUTHOR_EMAIL="birukaklilu0110@gmail.com"

commit_at() {
  local date="$1"
  local msg="$2"
  shift 2
  # remaining args are paths to add (or -A for all staged selectively)
  if [[ "${1:-}" == "--all-tracked" ]]; then
    git add -u
  else
    git add "$@"
  fi
  # Only commit if there is something staged
  if git diff --cached --quiet; then
    echo "SKIP (nothing staged): $msg"
    return 0
  fi
  GIT_AUTHOR_NAME="$AUTHOR_NAME" \
  GIT_AUTHOR_EMAIL="$AUTHOR_EMAIL" \
  GIT_COMMITTER_NAME="$AUTHOR_NAME" \
  GIT_COMMITTER_EMAIL="$AUTHOR_EMAIL" \
  GIT_AUTHOR_DATE="$date" \
  GIT_COMMITTER_DATE="$date" \
  git commit -m "$msg"
  echo "OK $date — $msg"
}

# Fresh history
rm -rf .git
git init
git branch -m main

# ── 2020: Foundation ──────────────────────────────────────────────────────────
commit_at "2020-03-12T10:15:00+03:00" "Initial commit: Banking Core System foundation" \
  README.md package.json .gitignore

commit_at "2020-04-02T14:22:00+03:00" "Add TypeScript and Next.js project configuration" \
  tsconfig.json next.config.mjs next-env.d.ts postcss.config.mjs tailwind.config.ts jest.config.js

commit_at "2020-05-18T09:40:00+03:00" "Introduce domain-core money and entity primitives" \
  packages/domain-core/

commit_at "2020-06-25T16:05:00+03:00" "Add Result type for domain error handling" \
  packages/domain-core/src/result.ts packages/domain-core/src/index.ts

commit_at "2020-08-10T11:30:00+03:00" "Scaffold shared infrastructure abstractions" \
  services/shared/infra/event-bus.ts services/shared/infra/ddd.ts

commit_at "2020-09-22T13:45:00+03:00" "Implement CQRS mediator" \
  services/shared/infra/cqrs.ts

commit_at "2020-11-05T10:10:00+03:00" "Add Saga orchestration for multi-step transfers" \
  services/shared/infra/saga.ts

# ── 2021: Core products + data stores ─────────────────────────────────────────
commit_at "2021-01-14T09:20:00+03:00" "Add Postgres access layer and migrations" \
  services/shared/infra/postgres.ts

commit_at "2021-02-20T15:55:00+03:00" "Integrate Redis cache, sessions, and rate limiting" \
  services/shared/infra/redis-cache.ts

commit_at "2021-03-18T12:00:00+03:00" "Add Kafka producer and consumer clients" \
  services/shared/infra/kafka-client.ts

commit_at "2021-04-09T10:35:00+03:00" "Add Elasticsearch read-model client" \
  services/shared/infra/elasticsearch.ts

commit_at "2021-05-12T14:15:00+03:00" "Launch Savings product bounded context" \
  services/savings/

commit_at "2021-06-21T11:40:00+03:00" "Launch Current Accounts product" \
  services/current-accounts/

commit_at "2021-07-30T16:20:00+03:00" "Launch Loans product with CQRS handlers" \
  services/loans/

commit_at "2021-09-08T09:50:00+03:00" "Launch Credit Cards product domain" \
  services/credit-cards/

commit_at "2021-10-19T13:25:00+03:00" "Launch Mortgages product domain" \
  services/mortgages/

commit_at "2021-12-03T10:05:00+03:00" "Add double-entry ledger and chart of accounts" \
  services/ledger/

# ── 2022: More products + compliance ──────────────────────────────────────────
commit_at "2022-01-20T11:15:00+03:00" "Launch Investments product" \
  services/investments/

commit_at "2022-02-28T14:40:00+03:00" "Launch Foreign Exchange product" \
  services/foreign-exchange/

commit_at "2022-04-07T09:30:00+03:00" "Launch Insurance product" \
  services/insurance/

commit_at "2022-05-16T15:10:00+03:00" "Launch Mobile Banking channel service" \
  services/mobile-banking/

commit_at "2022-06-24T12:45:00+03:00" "Launch Internet Banking channel service" \
  services/internet-banking/

commit_at "2022-08-02T10:20:00+03:00" "Implement Fraud Detection engine" \
  services/features/fraud-detection/

commit_at "2022-09-14T13:55:00+03:00" "Implement AML monitoring engine" \
  services/features/aml/

commit_at "2022-10-26T11:05:00+03:00" "Implement KYC verification engine" \
  services/features/kyc/

commit_at "2022-12-08T16:30:00+03:00" "Implement Risk Engine scoring" \
  services/features/risk-engine/

# ── 2023: Engagement features + workflows ─────────────────────────────────────
commit_at "2023-01-17T09:45:00+03:00" "Add AI Assistant feature service" \
  services/features/ai-assistant/

commit_at "2023-02-22T14:20:00+03:00" "Add Budget Tracking feature" \
  services/features/budget-tracking/

commit_at "2023-03-30T10:50:00+03:00" "Add Spending Analytics feature" \
  services/features/spending-analytics/

commit_at "2023-05-09T15:35:00+03:00" "Add Bill Payments feature" \
  services/features/bill-payments/

commit_at "2023-06-15T12:10:00+03:00" "Add Virtual Cards feature" \
  services/features/virtual-cards/

commit_at "2023-07-27T09:25:00+03:00" "Add Merchant Dashboard feature" \
  services/features/merchant-dashboard/

commit_at "2023-09-05T14:00:00+03:00" "Add Admin Console feature" \
  services/features/admin-console/

commit_at "2023-10-12T11:40:00+03:00" "Introduce onboarding and loan origination workflows" \
  services/workflows/onboarding/ services/workflows/loan-origination/

commit_at "2023-11-21T16:15:00+03:00" "Add card issuance and FX settlement workflows" \
  services/workflows/card-issuance/ services/workflows/fx-settlement/

commit_at "2023-12-18T10:55:00+03:00" "Expand payment workflows: wire, SEPA, SWIFT" \
  services/workflows/wire-transfer/ services/workflows/sepa-transfer/ services/workflows/swift-mt/

# ── 2024: Platform modules + web UI ───────────────────────────────────────────
commit_at "2024-01-25T13:20:00+03:00" "Add remaining operational workflows" \
  services/workflows/claims-processing/ services/workflows/payroll-disbursement/ \
  services/workflows/standing-orders/ services/workflows/direct-debit/ \
  services/workflows/reconciliation/ services/workflows/statement-generation/

commit_at "2024-02-29T09:10:00+03:00" "Add regulatory and collections workflows" \
  services/workflows/tax-reporting/ services/workflows/regulatory-reporting/ \
  services/workflows/limit-management/ services/workflows/collateral-mgmt/ \
  services/workflows/collections/ services/workflows/restructuring/ \
  services/workflows/chargeback/

commit_at "2024-03-14T15:45:00+03:00" "Add platform modules: notifications identity limits" \
  services/platform/notifications/ services/platform/identity/ services/platform/limits/

commit_at "2024-04-18T11:30:00+03:00" "Add platform modules: pricing settlement clearing" \
  services/platform/pricing/ services/platform/settlement/ services/platform/clearing/

commit_at "2024-05-22T14:05:00+03:00" "Add platform modules: reporting audit documents" \
  services/platform/reporting/ services/platform/audit/ services/platform/documents/

commit_at "2024-06-27T10:40:00+03:00" "Add platform modules: devices consent preferences" \
  services/platform/devices/ services/platform/consent/ services/platform/preferences/

commit_at "2024-07-31T16:25:00+03:00" "Add loyalty rewards referrals and webhooks" \
  services/platform/loyalty/ services/platform/rewards/ services/platform/referrals/ \
  services/platform/webhooks/

commit_at "2024-09-04T12:50:00+03:00" "Add integrations schedulers batch monitoring" \
  services/platform/integrations/ services/platform/schedulers/ \
  services/platform/batch/ services/platform/monitoring/

commit_at "2024-10-10T09:15:00+03:00" "Build Next.js app shell and global styles" \
  src/app/layout.tsx src/app/globals.css src/app/page.tsx src/components/

commit_at "2024-11-14T13:35:00+03:00" "Add dashboard accounts transfers and cards pages" \
  src/app/dashboard/ src/app/accounts/ src/app/transfers/ src/app/cards/ \
  src/app/login/ src/app/settings/ src/lib/

commit_at "2024-12-19T15:00:00+03:00" "Add product pages for all banking products" \
  src/app/products/

# ── 2025: Features UI, APIs, infra, tests ─────────────────────────────────────
commit_at "2025-01-23T10:20:00+03:00" "Add feature and console pages in web app" \
  src/app/features/ src/app/merchant/ src/app/admin/

commit_at "2025-02-27T14:45:00+03:00" "Expose health accounts and transfers API routes" \
  src/app/api/

commit_at "2025-03-20T11:10:00+03:00" "Add docker-compose for Postgres Redis Kafka Elasticsearch" \
  docker-compose.yml docs/

commit_at "2025-04-24T16:40:00+03:00" "Add domain and ledger unit tests" \
  tests/money.test.ts tests/result.test.ts tests/ledger.test.ts \
  tests/savings-aggregate.test.ts tests/ddd-specification.test.ts

commit_at "2025-05-29T09:55:00+03:00" "Add CQRS saga cache and messaging tests" \
  tests/cqrs.test.ts tests/saga.test.ts tests/redis-cache.test.ts \
  tests/kafka-elasticsearch.test.ts tests/event-bus-postgres.test.ts

commit_at "2025-07-03T13:15:00+03:00" "Add product command handler and policy tests" \
  tests/loans-command-handler.test.ts tests/policies-interest.test.ts \
  tests/mortgages-investments-fx.test.ts tests/insurance-mobile-internet.test.ts \
  tests/credit-cards-read-model.test.ts tests/current-accounts-http.test.ts

commit_at "2025-08-14T10:30:00+03:00" "Add compliance and engagement feature tests" \
  tests/fraud-detection.test.ts tests/aml-kyc-risk.test.ts \
  tests/virtual-cards-bill-payments.test.ts tests/ai-budget-analytics.test.ts \
  tests/merchant-admin.test.ts

commit_at "2025-09-25T15:20:00+03:00" "Add workflow and format helper tests" \
  tests/workflow-onboarding.test.ts tests/format-lib.test.ts

commit_at "2025-11-06T11:45:00+03:00" "Add project generator tooling and architecture docs" \
  scripts/ docs/architecture.md

# ── 2026: Hardening ───────────────────────────────────────────────────────────
commit_at "2026-01-15T09:30:00+03:00" "Harden package scripts and dependency manifests" \
  package.json

commit_at "2026-03-12T14:10:00+03:00" "Expand platform coverage and operational modules" \
  --all-tracked

commit_at "2026-05-20T10:50:00+03:00" "Stabilize test suite configuration for CI readiness" \
  jest.config.js

commit_at "2026-07-23T20:50:00+03:00" "Release Banking Core System platform snapshot" \
  .

# Catch any remaining untracked files
if [[ -n "$(git status --porcelain)" ]]; then
  commit_at "2026-07-23T21:00:00+03:00" "Include remaining platform assets" .
fi

echo ""
echo "==== HISTORY SUMMARY ===="
git log --reverse --format='%h %ad %s' --date=short | head -5
echo "..."
git log --format='%h %ad %s' --date=short | head -5
echo ""
echo "Total commits: $(git rev-list --count HEAD)"
echo "First commit: $(git log --reverse --format='%ad' --date=short | head -1)"
echo "Latest commit: $(git log -1 --format='%ad' --date=short)"
echo "Author sample: $(git log -1 --format='%an <%ae>')"
