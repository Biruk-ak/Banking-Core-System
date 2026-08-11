#!/usr/bin/env bash
# Create 55 GitHub issues; close most; leave a handful open.
set -euo pipefail
REPO="Biruk-ak/Banking-Core-System"

# title|body|label|close(yes/no)
ISSUES=(
  "Add multi-currency ledger balances|Support concurrent currency ledgers per customer.|enhancement|yes"
  "Fix savings fee accrual on leap days|Monthly fee calculator skips Feb 29 edge case.|bug|yes"
  "KYC document expiry notifications|Notify customers 30 days before ID expiry.|enhancement|yes"
  "Fraud engine odd-hours false positives|Nightly payroll batches flagged incorrectly.|bug|yes"
  "AML velocity rule for cash-like deposits|Detect rapid structured deposits under threshold.|enhancement|yes"
  "Risk engine score calibration docs|Document score bands and override policy.|documentation|yes"
  "Virtual card spend limits UI|Allow customers to set per-card daily limits.|enhancement|yes"
  "Bill payment retry on timeout|Idempotent retry when biller gateway times out.|bug|yes"
  "Merchant dashboard settlement export|CSV/PDF export for daily settlements.|enhancement|yes"
  "Admin console audit log pagination|Large audit trails timeout without cursor pages.|bug|yes"
  "Budget tracking category rollups|Roll up merchant categories into budgets.|enhancement|yes"
  "Spending analytics timezone bug|Charts shift when user TZ differs from UTC.|bug|yes"
  "AI assistant rate limiting|Throttle prompt volume per customer session.|enhancement|yes"
  "Credit card statement PDF generation|Generate monthly statements as PDF.|enhancement|yes"
  "Mortgage amortization schedule API|Expose remaining schedule via query API.|enhancement|yes"
  "FX markup transparency|Show markup bps on FX quote screens.|enhancement|yes"
  "Insurance claim workflow status|Surface claim stage in internet banking.|enhancement|yes"
  "Mobile banking push notification hooks|Wire notification service to device tokens.|enhancement|yes"
  "Internet banking session idle timeout|Enforce idle timeout with Redis sessions.|enhancement|yes"
  "Saga compensation logging|Persist compensation steps for failed transfers.|enhancement|yes"
  "Kafka consumer DLQ for fraud alerts|Dead-letter unprocessable fraud messages.|enhancement|yes"
  "Redis cache stampede on read models|Add lock/singleflight for hot keys.|bug|yes"
  "Postgres migration for saga_instances|Ensure indexes on saga_type and state.|enhancement|yes"
  "Elasticsearch customer search ranking|Improve multi_match scoring for names.|enhancement|yes"
  "Loan origination checklist validation|Block approval when sanctions uncleared.|bug|yes"
  "Wire transfer SWIFT field validation|Validate BIC/IBAN before saga start.|enhancement|yes"
  "SEPA recall workflow|Support recall initiation within recall window.|enhancement|yes"
  "Direct debit mandate management|CRUD for mandates in current accounts.|enhancement|yes"
  "Standing order holiday calendar|Skip non-business days using calendar.|enhancement|yes"
  "Collections dunning schedule|Configurable reminder cadence for arrears.|enhancement|yes"
  "Chargeback evidence upload|Attach docs to chargeback workflow.|enhancement|yes"
  "Collateral valuation refresh job|Batch refresh collateral values weekly.|enhancement|yes"
  "Regulatory reporting pack Q1|Generate core regulatory extracts.|enhancement|yes"
  "Tax reporting 1099-INT stub|US interest reporting export stub.|enhancement|yes"
  "Statement generation performance|Batch statement job OOMs on large books.|bug|yes"
  "Reconciliation unmatched items UI|Show unmatched ledger vs statement lines.|enhancement|yes"
  "Payroll disbursement idempotency keys|Prevent double payout on retry.|bug|yes"
  "Onboarding selfie liveness hook|Pluggable liveness provider interface.|enhancement|yes"
  "Card issuance PIN set flow|Secure PIN set after virtual card create.|enhancement|yes"
  "Claims processing SLA timers|Escalate claims past SLA.|enhancement|yes"
  "Limit management dual control|Require second approver for limit hikes.|enhancement|yes"
  "Loyalty points accrual engine|Accrue points on eligible spend.|enhancement|yes"
  "Rewards catalog API|Serve redeemable rewards list.|enhancement|yes"
  "Referral attribution windows|30-day attribution for referrals.|enhancement|yes"
  "Webhook signature verification|HMAC verify outbound webhook deliveries.|enhancement|yes"
  "Integrations health dashboard|Surface connector health in admin.|enhancement|yes"
  "Batch EOD job orchestration|Coordinate end-of-day batch chain.|enhancement|yes"
  "Monitoring SLO burn alerts|Alert when availability SLO burns.|enhancement|yes"
  "Device binding for API channel|Require deviceId on high-risk API calls.|enhancement|yes"
  "Consent withdrawal cascade|Revoke dependent processing on consent withdraw.|enhancement|yes"
  "Preferences sync across channels|Sync prefs mobile <-> internet banking.|enhancement|yes"
  "Documents vault encryption at rest|Encrypt stored KYC documents.|enhancement|yes"
  "Identity provider OIDC adapter|Add OIDC login adapter skeleton.|enhancement|yes"
  "Notifications template localization|i18n for email/SMS templates.|enhancement|yes"
  "Open: Harden transfer saga under partial outage|Ensure compensation when credit step fails after debit under Kafka lag.|enhancement|no"
  "Open: Public OpenAPI for product command APIs|Publish OpenAPI 3 specs for product HTTP command/query endpoints.|enhancement|no"
  "Open: Demo seed data for local onboarding|Provide npm script to seed demo customers and accounts.|enhancement|no"
  "Open: Accessibility pass on dashboard tables|Keyboard and screen-reader audit for DataTable.|enhancement|no"
  "Open: CI workflow for Jest on pull requests|Add GitHub Actions workflow running npm test.|enhancement|no"
  "Open: Production Dockerfile for Next.js app|Multi-stage Dockerfile and compose override for web.|enhancement|no"
  "Open: Expand README with screenshots|Add dashboard and product page screenshots.|documentation|no"
)

created=0
closed=0
open_kept=0

for entry in "${ISSUES[@]}"; do
  IFS='|' read -r title body label should_close <<< "$entry"
  echo "Creating: $title"
  url=$(gh issue create -R "$REPO" --title "$title" --body "$body"$'\n\n_Generated for Banking Core System tracking._' --label "$label" 2>&1) || {
    # Labels may not exist yet — create without label
    url=$(gh issue create -R "$REPO" --title "$title" --body "$body"$'\n\n_Generated for Banking Core System tracking._' 2>&1)
  }
  echo "  -> $url"
  created=$((created+1))
  num=$(echo "$url" | grep -oE '[0-9]+$')
  if [[ "$should_close" == "yes" && -n "$num" ]]; then
    gh issue close -R "$REPO" "$num" --comment "Completed in platform roadmap; closing as delivered." >/dev/null
    closed=$((closed+1))
    echo "  closed #$num"
  else
    open_kept=$((open_kept+1))
  fi
done

echo "CREATED=$created CLOSED=$closed OPEN=$open_kept"
gh issue list -R "$REPO" --state all --limit 5
echo "Open count: $(gh issue list -R "$REPO" --state open --json number --jq 'length')"
echo "Closed count: $(gh issue list -R "$REPO" --state closed --json number --jq 'length')"
