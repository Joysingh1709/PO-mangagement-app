## Repo overview

- Monorepo using npm workspaces: root `package.json` lists `apps/*` and `packages/*`.
- Primary folders: `apps/` (runtime apps) and `packages/` (shared libs — currently empty).
- Active apps in this repo:
  - `apps/client-next` — Next.js 16 frontend (React 19). Main app entry: `apps/client-next/src/app` (`page.tsx`, `layout.tsx`).
  - `apps/orders-management-service` — NestJS 11 backend. Entry and examples under `apps/orders-management-service/src` (`app.controller.ts`, `app.service.ts`, `main.ts`).
  - `apps/products-management-service` — present but empty; do not assume APIs exist there.

## Big-picture architecture

- This is a workspace-style monorepo where each `apps/*` directory is an independently runnable application.
- Frontend and backends are separate processes; interactions (if present) are via HTTP/REST interfaces implemented by the services.
- Shared code would live in `packages/` (currently empty). If new shared modules are added, they should be referenced by package name and included in root workspaces.

## Where to look for authoritative code

- Frontend: `apps/client-next/src/app` (Next app router). Edit `page.tsx` and `layout.tsx` for UI changes.
- Backend: `apps/*-management-service/src` — controllers, services, and modules follow standard NestJS conventions (see `app.controller.ts`, `app.service.ts`).
- Per-app docs: check `apps/*/README.md` for app-specific instructions.

## Common developer workflows (commands)

- From repository root (recommended):
  - Start frontend dev server: `npm run dev:client` (runs `apps/client-next`'s `dev` script)
  - Start orders service in dev: `npm run dev:orders` (runs `apps/orders-management-service`'s `start:dev`)
  - Start products service in dev: `npm run dev:products` (may be a no-op until that app is implemented)

- Per-app scripts (run inside the app folder or via `npm --workspace`):
  - Frontend (`apps/client-next`): `npm run dev`, `npm run build`, `npm run start`, `npm run lint`.
  - Orders service (`apps/orders-management-service`): `npm run start:dev`, `npm run start:prod`, `npm run build`, `npm run test`, `npm run lint`.

- Examples:
  - Run client dev from root: `npm run dev:client`
  - Run orders dev from root: `npm run dev:orders`
  - Run orders tests: `npm --workspace=apps/orders-management-service run test`

## Project-specific conventions and patterns

- Monorepo layout: all runtime apps go under `apps/`; cross-cutting/shared libraries go under `packages/`.
- NestJS services follow standard Nest structure: `src/*.module.ts`, `src/*.controller.ts`, `src/*.service.ts`. Look for `main.ts` for bootstrap configuration.
- Frontend uses Next.js App Router (`src/app`) rather than the pages router. Expect server and client components in that directory.
- Linting & formatting: services include `eslint` and `prettier` tasks. Use per-app `lint` and `format` scripts prior to PRs.

## Tests and debugging

- NestJS service tests use Jest (see `jest` config inside `apps/orders-management-service/package.json`). Unit tests live under `src` and `test/` depending on the app.
- NestJS debug start: `npm run start:debug` (inside the service or use `npm run dev:orders` pattern if exposed).
- Next.js local dev: `npm run dev` in `apps/client-next` (port 3000 by default).

## Integration points & caution notes for AI agents

- Do not assume the `products-management-service` implements endpoints — the folder is empty. Confirm before referencing it in examples.
- There are no CI/CD or deployment manifests in the repo root; check project-specific README files or ask maintainers for preferred pipelines.
- Shared `packages/` is currently empty — if you add new workspace packages, update the root `package.json` `workspaces` if necessary.

## Helpful file references (examples to inspect)

- Root workspace manifest: `/package.json` (contains `dev:client`, `dev:orders`, `dev:products`).
- Frontend example: `apps/client-next/src/app/page.tsx`, `apps/client-next/src/app/layout.tsx`.
- Backend example: `apps/orders-management-service/src/app.controller.ts`, `apps/orders-management-service/src/app.service.ts`, and `apps/orders-management-service/package.json` (scripts/jest config).

## Best-effort guidance for code edits

- When modifying the frontend, run `npm run dev:client` and verify UI changes at `http://localhost:3000`.
- When editing Nest services, run `npm run dev:orders` and call endpoints (e.g., `GET /`) to verify behavior; unit tests live alongside source and can be executed with the service `test` script.
- Prefer small, single-concern PRs scoped to an app; update that app's `README.md` when adding new local dev commands or environment requirements.

---

If any of the above assumptions are incorrect or you want deeper details (CI, infra, inter-service API contracts), tell me which area to inspect next and I will update this file accordingly.
