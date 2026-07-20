# RBAC Audit & Root-Cause Report

**Scope:** Items 10–15 — Sidebar visibility, inconsistent permission behaviour, full
registration audit, root-cause analysis, standardized pipeline, and per-module validation.

**Result:** Build passes (`vite build` ✓). Cross-reference audit: **0 typos / 0 unregistered
references**. 37 modules are now fully consistent (registry ↔ sidebar ↔ route guard ↔ action
gates). 4 capability modules remain registered but are enforced at the DB layer only (see §6).

---

## 1. Root Cause (Requirement 11 / 13)

The reported symptom — *"I granted Documents View+Edit but `/documents` is hidden and direct
navigation returns Access Denied, while Manage Cases and Test Designer work"* — is a
**module-key identity mismatch**, not a broken RBAC engine.

The page at `/documents` (**CaseDocuments**) was registered with the module key **`caseManage`**
("Case Manager") in **both** the route guard and the sidebar, while the user-visible "Documents"
module in the permission registry is **`documents`** ("Document Review"). So:

| Check | Before | Expected (user intent) |
|-------|--------|------------------------|
| Sidebar item `/documents` (`module: 'caseManage'`) | shown only if `caseManage.view` | shown if `documents.view` |
| Route `/documents` (`G('caseManage')`) | allows only `caseManage.view` | allows `documents.view` |
| User granted `documents.view` | ❌ hidden / Access Denied | ✅ visible / allowed |

`Manage Cases` (`manageCase`) and `Test Designer` (`testDesign`) worked because their route,
sidebar, and registry key all agreed. The engine was never the problem — the **key used by the
page did not match the key the user assigned**.

A near-duplicate key `caseManage` vs `manageCase` also existed, which is exactly the
"duplicate module IDs / module name mismatch" failure class.

### Fix
- `src/routes/index.jsx` — `/documents` guard `G('caseManage')` → `G('documents')`.
- `src/routes/navigation.js` — sidebar `/documents` item `module: 'caseManage'` → `'documents'`.
- `src/app/pages/CaseDocuments.jsx` — 21 `PermissionGate module="caseManage"` → `"documents"`
  (so action buttons — rename/delete/upload/download — use the same module as the view).
- `src/constants/permissions.js` — removed the orphan `caseManage` entry; relabelled
  `documents` → "Documents" (route `/documents`) so the registry accurately describes the page.

Now granting `documents.view` makes **Case Documents** appear in the sidebar, opens `/documents`,
and enables its action buttons — exactly as required.

---

## 2. Sidebar Must Be Permission-Driven (Requirement 10)

`Sidebar.jsx` already filtered individual items, but **headings were always rendered
independently of their group**, so an empty group still showed its parent heading (e.g. an empty
"Case Management" or "ADMINISTRATION" heading).

### Fix
Added `buildSections()` which pairs each `heading` entry with the `group` that follows it. A
heading is rendered **only if** its group contains at least one visible item; an empty group (and
its heading) is never rendered. Submenus already hid themselves when all children were invisible,
and that logic is preserved. This satisfies: a module without View hides its menu item, and a
heading with no visible children hides entirely.

---

## 3. Full Registration Audit (Requirement 12)

A script cross-referenced three sources of truth:

- `src/constants/permissions.js` — `MODULES` registry (the permission source of truth)
- `src/routes/navigation.js` — sidebar `module:` keys
- `src/routes/index.jsx` — route guards `G('module')`
- `src/**` — `PermissionGate module="x"` action gates

Findings (all resolved except §6):

| Issue | Modules | Resolution |
|-------|---------|------------|
| View/route/sidebar key mismatch (root cause) | `caseManage` | Rebound to `documents` |
| Action gates use a different module than the view | `judgmentLibrary`, `actLibrary`, `legalNotices` | See §4 |
| Dead/duplicate registry entries (no view guard, no action gate, parent module already covers the page) | `templates`, `versionControl`, `documentArchive` | Removed |
| Capability modules referenced by the DB RLS policy + seed default role but not by a dedicated UI page | `api`, `audit`, `backup`, `schema`, `security` | Kept registered; see §6 |

No remaining **typos** (every nav/route/gate key exists in the registry) and no **unregistered
references** (every referenced key is registered).

---

## 4. Standardized Authorization Pipeline (Requirement 14)

Intended pipeline (already present, now consistent everywhere):

```
Login → load role → resolve permissions (rbacLogic) → Permission Resolver
   ├─ Sidebar visibility   (canViewModule)
   ├─ Route access         (RequireAuth → canViewModule)
   ├─ Component rendering  (PermissionGate)
   ├─ Action buttons       (PermissionGate module/action)
   └─ API authorization    (permissionGuard.requireModuleView / requireCapability)
```

Three pages broke the pipeline by guarding their **view** with the *parent* module
(`research` / `drafting`) while their **action buttons** used a *separate* sub-module
(`judgmentLibrary` / `actLibrary` / `legalNotices`). That meant granting `judgmentLibrary.view`
would never reveal the page (same class of bug as Documents).

### Fix (unify view + actions under one module)
- `routes/index.jsx`: `/judgment-library` and `/judgment-library/:id` → `G('judgmentLibrary')`;
  `/research/act-library` → `G('actLibrary')`; `/drafting/legal-notices` → `G('legalNotices')`.
- `routes/navigation.js`: those sidebar items' `module` updated to match.
- Action gates in `JudgmentLibrary.jsx`, `JudgmentDetail.jsx`, `AddJudgmentModal.jsx`,
  `ActLibrary.jsx`, `LegalNotices.jsx` already used the sub-module, so they now agree with the
  view. Each of these pages is governed by exactly one module for both navigation and actions.

`/admin/security` (top-level route) was similarly rebound from `settings` → `security`.

---

## 5. Per-Module Validation (Requirement 15)

For every **registered** module we validated: registered ✓, permission key exists ✓, sidebar key
matches permission key ✓, route key matches permission key ✓, route guard references correct
permission ✓, View enables navigation ✓, CRUD controls actions only ✓.

| Category | Count | Status |
|----------|-------|--------|
| Fully consistent (nav + route + gate aligned) | 37 | ✅ |
| Capability modules (registered, DB RLS/seed-enforced, UI inherits parent) | 4 | ⚠️ see §6 |
| Typos / unregistered references | 0 | ✅ |

---

## 6. Residual Inconsistency & Recommendation

`api`, `audit`, `backup`, `schema` are registered modules that the **database RLS policy**
(`src/data-provider/migrations/steps/009-rls.js`) and the **seed default role** treat as
independent grants (OR-list alongside `databaseCenter`/`settings`/`env`). Their UI pages, however,
inherit the parent guard:

- `/admin/database-center/{data-explorer,backup-recovery,audit-activity}` inherit `databaseCenter`
  (the parent `<RequireAuth module="databaseCenter">` wraps the layout).
- `/admin/env-api` is shared by `env` and `api`.

These were **deliberately left as-is** because:
1. Repointing the three `database-center` children to their own `G('schema'|'backup'|'audit')`
   would require **both** `databaseCenter.view` **and** the sub-module view (nested AND-semantics),
   which is stricter than the RLS OR-semantics and would *reduce* access for roles holding only the
   sub-module.
2. Removing them from the registry would desync the registry from the RLS/seed grant set.

**Recommendation (separate, careful follow-up):** refactor the `database-center` route so the
parent layout guard is permissive (any of the sub-permissions) and each child carries its own
`RequireAuth` module — making the UI guards match the RLS OR-semantics. This is the only remaining
gap to a 41/41 fully self-consistent registry.

---

## 7. Migration Notes (behaviour changes)

- Roles that previously saw **Judgment Library / Act Library / Legal Notices** via
  `research.view` / `drafting.view` now require `judgmentLibrary.view` / `actLibrary.view` /
  `legalNotices.view` respectively (consistent with the single-module model). The seed default
  role already grants these, so administrators are unaffected.
- Super-admin (`all: true`) is unaffected by any of these changes.
- `documents.view` now governs **both** "Case Documents" (`/documents`) and "Document Review"
  (`/documents/review`), which is the intended single "Documents" module.
