# Contributing to Banking Core System

Thank you for your interest in improving **Banking Core System**. This guide explains how to clone, run, and submit changes to this repository.

**Owner:** Biruk-ak (`birukaklilu0110@gmail.com`)  
**Repo:** https://github.com/Biruk-ak/Banking-Core-System

---

## Code of Conduct

Be respectful, constructive, and focused on the problem. Assume good intent. Harassment or personal attacks are not tolerated.

---

## Getting Started

### 1. Fork and clone

```bash
# Fork via GitHub UI, then:
git clone git@github.com:<your-username>/Banking-Core-System.git
cd Banking-Core-System
git remote add upstream git@github.com:Biruk-ak/Banking-Core-System.git
```

### 2. Install dependencies

```bash
npm install
```

Requires **Node.js 18+**.

### 3. (Optional) Start local infrastructure

```bash
docker compose up -d
```

This starts Postgres, Redis, Kafka, and Elasticsearch used by integration-style modules.

### 4. Run the app

```bash
npm run dev
```

Visit http://localhost:3000.

### 5. Run tests

```bash
npm test
```

All tests must pass before you open a pull request.

---

## Development Workflow

### Branch naming

Use short, descriptive branch names:

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/<short-name>` | `feature/fx-markup-rules` |
| Bug fix | `fix/<short-name>` | `fix/ledger-unbalance-check` |
| Docs | `docs/<short-name>` | `docs/readme-install` |
| Chore | `chore/<short-name>` | `chore/gitignore-secrets` |

### Commit messages

Write clear commits in the imperative mood:

```
Add SEPA recall compensation step to wire saga

Clarify why the reverse path must publish AML audit events.
```

- Prefer small, focused commits over large mixed ones
- Do **not** add `Co-authored-by: Cursor` or similar tooling trailers unless the maintainer asks

### Coding standards

- Prefer TypeScript with strict typing where practical
- Keep domain logic in `services/*/src/domain` — avoid leaking UI concerns into aggregates
- Follow existing CQRS patterns (`commands` / `queries` / handlers)
- Do not commit secrets, `.env` files, or API keys
- Match formatting and naming already used in neighboring files

---

## Submitting a Pull Request

1. Sync with upstream `main`:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. Push your branch:

   ```bash
   git push -u origin HEAD
   ```

3. Open a PR against `Biruk-ak/Banking-Core-System:main` using the repository PR template.

4. Fill in:
   - **What** changed and **why**
   - How you tested (`npm test`, manual steps, screenshots if UI)
   - Linked issues (`Closes #123`)

5. Keep the PR focused. Large changes should be split when possible.

### Review expectations

Maintainers may request changes for:

- Missing or failing tests
- Domain boundary violations
- Incomplete docs for public APIs
- Security or compliance concerns (AML/KYC/fraud paths)

---

## Reporting Bugs & Requesting Features

Use the GitHub issue templates:

- **Bug report** — `.github/ISSUE_TEMPLATE/bug_report.md`
- **Feature request** — `.github/ISSUE_TEMPLATE/feature_request.md`

Search existing issues before opening a new one.

---

## Project Map (where to contribute)

| Area | Path |
|------|------|
| Web UI & API routes | `src/` |
| Shared domain primitives | `packages/domain-core/` |
| Banking products | `services/<product>/` |
| Compliance & engagement | `services/features/` |
| Infra adapters | `services/shared/infra/` |
| Workflows / sagas | `services/workflows/` |
| Tests | `tests/` |

---

## Questions

Open a discussion or issue on GitHub, or contact the owner at **birukaklilu0110@gmail.com**.

Thank you for contributing.
