# Universal Application Foundation Framework

*A reusable prompt for directing any AI model (GPT, Gemini, Claude, DeepSeek, or similar) to turn an already-built application into a permanent, cloneable Base Framework for every future project.*

---

## 1. Objective

I have an existing application containing a complete architecture: business logic, database layer, security, UI framework, services, utilities, and shared components.

My goal is to transform this application into a **Universal Application Foundation (Base Framework)** — a single, permanent starting point for every future project I build.

Instead of building each new application from scratch, I want to reuse the entire foundation — architecture, infrastructure, logic, and shared modules — and write only the domain-specific features each new application actually needs.

This is not a code review and not a rebuild. Treat it as an extraction task: identify what is already generic and reusable, harden what is weak, and package it as a versioned foundation that every future product is built on top of, never rebuilt from.

---

## 2. Current Process vs. Desired Process

**Current process (not desired) — repeated for every new application:**

- Create a new project
- Rebuild the architecture
- Recreate authentication
- Reconfigure the database
- Rewrite reusable business logic
- Rebuild layouts and common UI
- Recreate settings and permissions
- Reimplement common utilities and services
- Repeat the same work for every project

This causes duplicated effort, inconsistent quality across products, and rising maintenance cost as each copy drifts from the others.

**Desired process:**

1. Maintain one Universal Base Framework containing every common capability already built.
2. To start a new application: clone the base framework.
3. Update branding (name, logo, theme, icons, metadata).
4. Configure project-specific settings.
5. Add only the domain-specific modules, pages, workflows, and business logic that application needs.
6. Reuse all existing infrastructure without modifying the core framework.

Every future application should be developed significantly faster while staying consistent, secure, and maintainable — because the foundation is built once and reused, not rebuilt.

---

## 3. Governing Principle: Harden Before You Freeze

A base framework only multiplies value if what it multiplies is sound. Before anything is extracted into the reusable core:

- **Fix critical weaknesses first** — insecure defaults, client-only enforcement of rules that must be server-side, incomplete or simulated implementations of security-sensitive features (encryption, compression, permission checks), missing validation, missing tests.
- **Then extract** the hardened result into the base framework.
- **Treat the base framework as a versioned package**, not a one-time copy-paste. Downstream applications pull updates from it; they don't re-implement fixes independently.

Why this matters: if a flaw exists at freeze time, it doesn't affect one application — it is copied into every application built from that point forward, simultaneously. A bug fixed in Application #5 does not retroactively fix Applications #1–4 unless the fix happens in the shared base and is pulled downstream.

---

## 4. Reusable Foundation Scope

The base framework must preserve and generalize everything already built, including but not limited to:

**Architecture & Structure**
Complete project architecture · Folder structure · Module boundaries · Routing · Navigation · State management · CSS architecture · Design system · Responsive framework · Mobile support

**Data & Database**
Database abstraction layer · Database provider · Data access layer · Repositories · Mapper / translator layer · Caching · Search · Filtering · Sorting · Pagination · Database indexing strategy · Search optimization

**Business Logic**
Business logic layer · CRUD engine · Form engine · Validation · Workflow engine · Import and export · Backup and restore · File management

**Identity & Access**
Authentication · Authorization · RBAC (roles and permissions) · Security layer

**Platform Services**
Settings system · Configuration management · Reusable services · API layer · Logging · Error handling · Notifications · Audit logs · Activity tracking

**UI & Experience**
Shared UI components · Layout system · Theme management · Common dialogs and modals · Tables · Dashboard framework · Analytics framework · Utility functions · Global hooks

**Engineering Foundation**
Performance optimization · Testing structure · Build configuration · Deployment configuration · Documentation · Developer tools

Any additional reusable module already built belongs in this list too — the criterion is simple: *if it is not tied to one specific business domain, it belongs in the base, not in an individual application.*

---

## 5. Development Principle: What Belongs Where

The base framework should never need to be rebuilt for a new project. Every new application should introduce **only**:

- Domain-specific data entities and schemas
- Domain-specific business rules and workflows
- Domain-specific UI, pages, and components
- Domain-specific reports

Everything else — architecture, infrastructure, shared logic, shared UI, security, settings — already exists in the framework and must be reused without modification.

**Rule of thumb for classifying anything:** if renaming or removing one specific application would make this piece of code meaningless, it's domain-specific and belongs in that application. If it would still make sense in a completely unrelated application, it belongs in the base framework.

### Worked example: authority vs. domain

The same discipline that keeps permissions generic should keep the whole framework generic. Consider role-based access:

> A security desk never checks a badge for the printed job title — "CEO," "Administrator," "Boss," "Owner." It checks what the badge is *authorized* to open. If the authorization includes "Manage Building," the door opens; if not, it stays locked, no matter what the badge says.

Applied to software: the base framework's permission engine should check `user.permissions.includes("case.manage")` or `user.capabilities.canManageCases` — never `user.role === "Admin"`. The **engine that evaluates permission strings** is a base-framework asset, reused untouched by every application. The **list of permission strings** (`case.manage`, `patient.admit`, `room.assign`) is domain-specific and defined per application. Renaming a role, or swapping "legal case management" for "hotel reservations," must never require touching the permission engine itself — only the list of permission strings that application defines.

This same "engine is generic, content is domain-specific" split applies everywhere in the framework: the CRUD engine is generic, the entities it manages are domain-specific; the notification engine is generic, the notification templates are domain-specific; the backup engine is generic, the schema it backs up is domain-specific; the search engine is generic, the indexed fields are domain-specific.

---

## 6. Base Framework Repository Layout

```
base-framework/
├── frontend/
│   ├── src/
│   │   ├── app/                  # Composition root, routing shell
│   │   ├── components/           # Generic UI kit — no domain components
│   │   ├── hooks/                # useAuth, usePermission, useQuery wrapper
│   │   ├── graphql|api/          # Base queries/mutations (auth, users, roles, settings)
│   │   ├── styles/                # Design tokens, reset, component-level styles
│   │   ├── shared/                # Types, permission-string helpers
│   │   └── utils/                 # id generation, date handling, field mapping
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── auth/                  # Token issue/verify, provider integration
│   │   ├── api|graphql/           # Base schema: users, roles, settings, audit
│   │   ├── services/              # AuthService, RBAC middleware, SettingsService, BackupService
│   │   ├── db/                    # Base schema/migrations (users, roles, settings, audit_logs)
│   │   ├── storage/                # Object storage client, signed URLs
│   │   ├── queue/                  # Background job runner (backup, notifications)
│   │   └── middleware/             # Rate limiting, audit, CORS, permission guard
│   └── package.json
├── shared/
│   ├── permissions.ts               # Permission-string helpers (engine only — string list is app-specific)
│   ├── validation/                  # Shared schema-validation helpers
│   └── types.ts
├── .github/workflows/                # CI: lint, test, build gate
├── docs/
│   └── ARCHITECTURE.md               # This blueprint, versioned with the repo
└── package.json                      # Workspace root
```

Everything under `frontend/src/components`, the base services in `backend/src/services`, and everything in `shared/` is what every application inherits **unmodified**. Application-specific domain models, pages, and workflows live in an app-level layer added on top.

---

## 7. Extension Workflow for a New Application

1. **Clone or reference** the base framework (a git submodule or private package dependency lets updates be pulled rather than re-copied).
2. **Do not modify** the generic UI kit, the base services, or anything under `shared/` — this is the reused core.
3. **Add the new domain:**
   - Define entity schemas in an app-level migrations folder, following the same pattern as the base migrations.
   - Add permission strings to the shared permission list (e.g. `case.*`, `patient.*`, `reservation.*`) — the engine checking `user.permissions.includes(x)` never changes, only the list of strings.
   - Add app-level API types/resolvers and services.
   - Add pages, domain components, and workflows in the app layer.
4. **Reuse without modification:** authentication, the permission engine, the UI kit, the backup/export engine, and the settings system.
5. Only three categories of code are ever written per application: domain schema, domain services/resolvers, and domain UI/workflows.

### Example: five applications sharing one base

| | Shared (unchanged) | Application-specific |
|---|---|---|
| App 1 — Legal case management | Auth, permission engine, UI kit, backup, settings, CI | Cases, hearings, courts, citations |
| App 2 — Hospital management | Same | Patients, appointments, prescriptions, wards |
| App 3 — School management | Same | Students, classes, grading, attendance |
| App 4 — Inventory management | Same | Products, stock levels, suppliers, purchase orders |
| App 5 — CRM | Same | Leads, deals, pipelines, contacts |
| App 6 — Hotel management | Same | Rooms, reservations, guests, housekeeping schedules |

None of these applications touch the login flow, the permission-checking code, the backup format, or the shared component library. Each one only adds rows to its own domain schema and its own pages. In the hotel example: a developer defines a `Room` and `Reservation` entity, adds permission strings like `reservation.create` and `room.assign`, builds a booking calendar page — and reuses the same authentication screen, the same permission engine, the same data table component, and the same backup system that the legal-case and hospital applications also use.

---

## 8. Keeping the Base Framework Alive

A cloned-and-forgotten base degrades the same way an unmaintained application does. To prevent that:

- **Version the base framework** and track which version each application is running on.
- **Security and dependency fixes propagate as version bumps**, pulled into each application rather than manually reapplied — this is the entire point of a shared foundation.
- **No domain logic in the base repository.** The moment app-specific code leaks into the base UI kit or base services, every application inherits it, and the coupling the framework was built to avoid creeps back in.
- **Run CI on the base repository itself** — lint, unit tests, and a contract test suite (e.g. "does the permission engine still work against a stub permission list") before any version is tagged for downstream use.
- **Keep a changelog per version** so each application team can decide when to upgrade and understand what's breaking versus additive.

---

## 9. Expected Outcome

The result should be a scalable, enterprise-grade, modular, and highly reusable application framework that enables rapid development of multiple applications while preserving one consistent codebase and architecture.

This framework acts as the permanent foundation for all future projects — eliminating repetitive development, reducing maintenance cost, ensuring architectural consistency, and letting every new application focus solely on its unique business requirements instead of rebuilding common functionality that already exists.


The document you uploaded is already a very strong foundation, but it's still focused on **transforming an existing application into a base framework**. 

Based on your latest requirement, I would expand it into a **Universal Enterprise Application Foundation Specification**. The goal should no longer be "extract" or "audit" or "discover." Instead, it should define **every architecture, layer, policy, engine, service, component, and enterprise standard** that every future application must contain by default.

I would add the following major sections that are currently missing.

---

# 1. Enterprise Architecture Principles

Add a complete architecture philosophy.

Include

* Clean Architecture
* Onion Architecture
* Hexagonal Architecture
* Layered Architecture
* Domain Driven Design (DDD)
* SOLID Principles
* DRY
* KISS
* Separation of Concerns
* Composition over Inheritance
* Dependency Injection
* Event Driven Architecture
* CQRS (optional)
* Modular Monolith
* Microservice Ready
* Plugin Architecture
* Feature-first Architecture
* Multi-package Workspace
* White-label Architecture
* Multi-tenant Architecture
* Offline-first Architecture
* API-first Architecture
* AI-ready Architecture

---

# 2. Universal Folder Architecture

Not just folders.

Define every folder.

Examples

```
app/

core/

foundation/

platform/

kernel/

config/

bootstrap/

constants/

enums/

interfaces/

contracts/

providers/

services/

repositories/

business/

workflows/

policies/

rules/

validation/

schema/

mappers/

translators/

converters/

serializers/

deserializers/

database/

storage/

cache/

search/

security/

permission/

authority/

authentication/

authorization/

audit/

history/

notification/

scheduler/

backup/

retention/

analytics/

telemetry/

monitoring/

health/

performance/

components/

layouts/

pages/

widgets/

hooks/

contexts/

styles/

themes/

tokens/

utilities/

shared/

plugins/

extensions/

tests/

documentation/

scripts/

migration/

deployment/
```

---

# 3. Data Architecture

Include everything.

Data Layer

Business Layer

Presentation Layer

Application Layer

Infrastructure Layer

Persistence Layer

Storage Layer

Synchronization Layer

Caching Layer

Search Layer

Integration Layer

API Layer

Gateway Layer

Queue Layer

Background Job Layer

Worker Layer

Monitoring Layer

Audit Layer

Logging Layer

Analytics Layer

AI Layer

---

# 4. Database Architecture

Go beyond schema.

Include

Database Providers

Database Adapter

Database Driver

Connection Manager

Query Builder

Schema Builder

Migration Engine

Seeder Engine

Version Control

Transaction Manager

Connection Pool

Retry Logic

Database Health

Database Monitoring

Replication

Sharding

Partitioning

Read Replica

Write Replica

Archive Database

Cold Storage

Hot Storage

Data Lifecycle

Retention

Backup

Recovery

Disaster Recovery

---

# 5. Schema System

Include

Entity Schema

Validation Schema

API Schema

DTO

View Model

Mapper

Translator

Serializer

Deserializer

Converter

Normalizer

Denormalizer

Metadata

Dynamic Schema

Schema Registry

Schema Versioning

Schema Compatibility

Schema Evolution

---

# 6. Universal Mapper Architecture

Everything should have mapper.

Entity Mapper

DTO Mapper

Database Mapper

View Mapper

Permission Mapper

Authority Mapper

Storage Mapper

Cache Mapper

Search Mapper

API Mapper

Configuration Mapper

Language Mapper

Theme Mapper

Backup Mapper

Import Mapper

Export Mapper

---

# 7. Universal Translator Layer

Include

Database Translator

Schema Translator

Permission Translator

Role Translator

Authority Translator

Language Translator

Configuration Translator

Import Translator

Export Translator

Backup Translator

Migration Translator

Version Translator

API Translator

Storage Translator

Search Translator

Notification Translator

Theme Translator

---

# 8. Authority Architecture

Never role based.

Always authority based.

Authority

Capability

Permission

Privilege

Policy

Rule

Ownership

Inheritance

Delegation

Evaluation

Resolver

Cache

Hierarchy

Context

Scope

Dynamic Authority

Temporary Authority

Time-based Authority

Conditional Authority

---

# 9. Security Architecture

Very deep.

Authentication

Authorization

RBAC

ABAC

PBAC

Capability Based Access

Zero Trust

Least Privilege

Defense in Depth

Secure by Default

Encryption

Key Rotation

Secret Management

Password Policy

Token Policy

JWT

Refresh Token

Session

CSRF

XSS

CSP

SQL Injection

File Upload

Download Protection

RLS

ExecSQL

Audit Trail

Immutable Logs

Tamper Detection

Rate Limit

Bot Protection

API Security

Webhook Security

Tenant Isolation

---

# 10. Universal UI Design System

Include

Buttons

Inputs

Select

Checkbox

Radio

Switch

Badge

Chip

Alert

Toast

Snackbar

Tooltip

Dropdown

Navbar

Sidebar

Tabs

Accordion

Timeline

Calendar

Table

Tree

Kanban

Cards

Wizard

Forms

Dialogs

Drawer

Bottom Sheet

Search

Pagination

Filters

CRUD Manager

Color Swatches

Avatar

Icons

Typography

Spacing

Grid

Responsive

Accessibility

Dark Mode

Light Mode

Animation

Loading

Skeleton

Empty State

Error State

Success State

---

# 11. Shared Engines

Every application should already contain

CRUD Engine

Search Engine

Filter Engine

Sort Engine

Export Engine

Import Engine

Backup Engine

Restore Engine

Notification Engine

Workflow Engine

Validation Engine

Permission Engine

Authority Engine

Settings Engine

Theme Engine

Localization Engine

Logging Engine

Audit Engine

History Engine

Analytics Engine

Scheduler Engine

Automation Engine

AI Engine

Plugin Engine

Feature Flag Engine

---

# 12. Universal Services

Authentication Service

Authorization Service

Permission Service

Authority Service

User Service

Role Service

Configuration Service

Settings Service

Backup Service

Restore Service

Search Service

Storage Service

Email Service

SMS Service

Push Notification Service

Logger Service

Audit Service

Analytics Service

Health Service

Cache Service

Queue Service

File Service

Theme Service

Localization Service

AI Service

---

# 13. Centralized Managers

Every application should include

Centralized Settings

Centralized Date Input

Centralized Time Input

Centralized Validation

Centralized Error Handler

Centralized Notification

Centralized Theme

Centralized Search

Centralized Cache

Centralized Permission

Centralized Authority

Centralized API

Centralized Storage

Centralized Configuration

Centralized Logging

Centralized Monitoring

Centralized Health

Centralized Backup

Centralized Restore

Centralized Scheduler

Centralized Feature Flags

---

# 14. Enterprise Database Performance

Include

Indexes

Composite Indexes

Partial Indexes

Unique Indexes

GIN

GIN Trigram

Hash Index

BRIN

Full Text Search

Materialized Views

Partitioning

Clustering

Pagination

Query Optimizer

Execution Plan

Slow Query Detection

Query Cache

Read Cache

Write Cache

Object Cache

Search Cache

Statistics

Vacuum

Analyze

Auto Maintenance

---

# 15. Universal Storage Architecture

Local Storage

Session Storage

IndexedDB

Object Storage

Blob Storage

CDN

Media Storage

Attachment Storage

Version Storage

Archive Storage

Encrypted Storage

Temporary Storage

Persistent Storage

---

# 16. Observability

Logging

Audit

Metrics

Tracing

Health Checks

Performance Metrics

Alerting

Crash Reporting

Monitoring Dashboard

Usage Analytics

Error Analytics

System Analytics

Database Analytics

Security Analytics

---

# 17. Setup Wizard

Include

System Installation

Database Configuration

Admin Creation

Company Profile

Logo

Branding

Theme

Timezone

Language

Currency

Storage

Email

SMS

Security

Permissions

Backup Schedule

Retention Policy

Feature Toggles

License

---

# 18. Enterprise Quality Standards

Code Standards

Architecture Standards

Naming Standards

Folder Standards

Documentation Standards

Testing Standards

Accessibility Standards

Performance Standards

Security Standards

Database Standards

UI Standards

API Standards

Versioning Standards

Git Standards

Release Standards

Deployment Standards

Backup Standards

Monitoring Standards

Compliance Standards

---

# 19. Future-Proofing Requirements

The framework should support without architectural changes:

* PostgreSQL
* MySQL
* MariaDB
* SQL Server
* Oracle
* SQLite
* MongoDB
* Supabase
* Firebase
* Appwrite
* PocketBase
* REST APIs
* GraphQL
* gRPC
* WebSockets
* Serverless deployments
* Edge runtimes
* Desktop applications
* Mobile applications
* PWAs
* Multi-language
* Multi-currency
* Multi-region
* Multi-tenant
* White-label products
* Plugin ecosystems
* AI agents
* MCP servers
* Vector databases
* Retrieval-Augmented Generation (RAG)
* Hybrid cloud deployments

---


**No.** Based on the document you uploaded, that requirement is **partially covered but not fully guaranteed**. 

Your document mentions:

* Database abstraction layer
* Database provider
* Data access layer
* Repositories
* Mapper / translator layer

Those are the right concepts, but they **do not explicitly guarantee** the most important enterprise requirement:

> **Changing the database provider must require changing only ONE file, while the rest of the application remains completely untouched.**

That guarantee should be written as a **non-negotiable architecture rule**, not left as an implication.

---

# Add this as a new mandatory section

## Universal Database Provider Architecture (Single-File Swap Principle)

The framework **must** be completely database-agnostic.

The entire application must communicate **only** with the Data Layer.

No page, component, service, business logic, hook, utility, workflow, API route, or shared module may directly import or depend on any database SDK.

The application must never know whether the underlying database is:

* Supabase
* Firebase
* PostgreSQL
* MySQL
* MariaDB
* SQLite
* SQL Server
* Oracle
* MongoDB
* Appwrite
* PocketBase
* DynamoDB
* Cassandra
* CockroachDB
* PlanetScale
* Neon
* Turso
* Redis
* Elasticsearch
* Any future database

The entire application must communicate through a **single universal provider interface**.

---

## Required Architecture

```
Application

↓

Pages

↓

Components

↓

Business Layer

↓

Services

↓

Data Layer

↓

Universal Provider Interface

↓

Database Provider

↓

Actual Database
```

Nothing above the Provider Interface should ever know which database is being used.

---

## Single File Replacement Rule

Changing the database provider must require modifying only one location.

Example

```
src/
    database/
        provider/
            provider.js
```

or

```
src/
    data-provider/
        index.js
```

or

```
src/
    foundation/
        database/
            provider.js
```

Every other file in the application must remain unchanged.

No imports anywhere else should reference:

* Supabase SDK
* Firebase SDK
* MongoDB SDK
* SQL client
* Prisma
* Drizzle
* Sequelize
* Mongoose
* Appwrite SDK

Only the provider file may import the database SDK.

---

## Zero Page Modification Rule

Changing

```
Supabase

↓

Firebase
```

must require

* ZERO page changes
* ZERO component changes
* ZERO business logic changes
* ZERO service changes
* ZERO hook changes
* ZERO workflow changes
* ZERO routing changes
* ZERO CSS changes
* ZERO UI changes
* ZERO CRUD changes
* ZERO permission changes
* ZERO RBAC changes
* ZERO authority changes
* ZERO search changes
* ZERO backup changes
* ZERO API changes

Only the provider implementation changes.

---

## Universal Provider Contract

Every provider must expose the exact same interface regardless of the underlying database.

Examples include capabilities for:

* Authentication
* User management
* CRUD operations
* Batch operations
* Transactions
* File storage
* Search
* Pagination
* Filtering
* Sorting
* Backup
* Restore
* Realtime subscriptions
* Permissions
* Audit logging
* Index management
* Health monitoring
* Migrations

Business logic must never contain provider-specific code.

---

## Universal Schema Translation Layer

The framework must include a Schema Translation Layer capable of mapping the application's canonical schema to any supported database.

Examples:

Application Schema

↓

Supabase Tables

↓

Firebase Collections

↓

MongoDB Documents

↓

MySQL Tables

↓

PostgreSQL Tables

↓

SQLite Tables

↓

Future Database Structures

The application defines its schema once; translators adapt it to the chosen provider.

---

## Universal Query Translation Layer

Business logic must never construct provider-specific queries.

Instead:

Business Request

↓

Universal Query

↓

Query Translator

↓

Provider Query

↓

Database

Each provider translates the universal query into its own syntax.

---

## Universal Storage Translation Layer

Storage operations must be abstracted.

Whether using:

* Supabase Storage
* Firebase Storage
* S3
* Cloudflare R2
* Azure Blob
* Google Cloud Storage
* Local Storage

the application uses the same storage interface.

---

## Universal Authentication Translation Layer

Authentication providers should be replaceable without changing application code.

Supported providers include:

* Supabase Auth
* Firebase Auth
* Auth0
* Clerk
* Keycloak
* Cognito
* Azure AD
* OAuth/OIDC providers
* Custom JWT

---

## Universal Search Translation Layer

Search implementation should be interchangeable.

Support:

* PostgreSQL Full Text Search
* Elasticsearch
* Meilisearch
* Typesense
* Algolia
* MongoDB Atlas Search
* SQLite FTS
* Future search engines

---

## Universal Migration Layer

Schema migrations should target the canonical application schema first, then translate to provider-specific migrations.

---

## Universal Backup Format

Backups should use a provider-independent format (such as your proposed `.udb` format) so they can be restored to any supported database without changing application logic.

---

## Provider Independence Guarantee

The framework must guarantee:

* Database independence
* Storage independence
* Authentication independence
* Search independence
* Cache independence
* Queue independence
* Notification independence
* File system independence
* Logging independence
* Analytics independence

Replacing any infrastructure provider must never require changes to application code outside the corresponding provider implementation.

---

This section is one of the **most important additions** because it turns your framework into a truly infrastructure-agnostic platform. In practice, it means you could switch from Supabase today to Firebase tomorrow or MongoDB next year by replacing the relevant provider implementation while leaving the rest of the application—including pages, components, business logic, and workflows—unchanged. This aligns with the enterprise architecture used by large SaaS platforms that isolate infrastructure concerns behind stable contracts.

Dark Mode/ light mode button in top nav bar

- Alerts and status badges:
- - Theme toggle:
  - Typo-tolerant, field-boosted, relevance-sorted search. like Google autocomplete. No need to type the full word. in search field
  - - Web Vitals tracking:
    - - Error reporting:
      - - Duplicate submission prevention:
        - - Automatic retry: If your internet briefly dropped while saving a case (e.g., Wi-Fi hiccup), previously you'd see an error and have to manually retry. Now the app retries automatically with increasing delays (0.5s → 1s → 2s). If it succeeds on retry, you never even notice there was a problem.
         
          - - DataTable virtualization:
            - - Password hashing offloaded:
              - - Tab switching:
list scrolling: Opening a case list with 500+ cases used to render all 500 rows as HTML elements. The browser struggled. Now it only renders ~20 rows at a time — the ones visible on screen. As you scroll, it swaps rows in and out. 500 cases scroll just as fast as 20.
Performance - Pages load instantly. Scrolling through case lists is butter-smooth. Tab switches are immediate.

- Password policy: Password123 used to work. Now the app forces you to pick something like Jury$2024Summit — upper, lower, number, special character all required. If you try password or 123456, it's immediately rejected. The password input shows a live checklist (✓ uppercase ✓ number ✓ not common) with live progress 

- Login reliability: Previously, changing your password in the app sometimes broke login — you'd get "Invalid credentials" even with the right password, requiring an admin to manually fix it. Now passwords work end-to-end. You change it once, and it just works.

- Secret API key removed: The app previously shipped with a master key that could bypass all permissions — like giving the office boy a key to the partner's office. That key is gone. Everyone must use their own credentials.

- XSS protection: If someone pasted malicious text (e.g., <script>steal data</script>) into a judgment note or case description, it used to execute like a real program. Now the app strips out anything dangerous — it treats it as plain text, not code. Posting a cleverly crafted text to steal cookies no longer works.

- Arkansas-level SQL fix: The database previously allowed anonymous visitors to run arbitrary SQL commands on the database — like letting a random person off the street walk into the server room and type commands. Now only authenticated, authorized users can run database operations.

- Pass 1

System, folder, dependency, deployment, and runtime architecture

Architecture diagrams, dependency flow, module boundaries, design smells

Pass 2

Database architecture, schema mapping, translators, data layer, indexes, search, RLS, ExecSQL

ER analysis, data flow, indexing strategy, security policies, optimization recommendations

Pass 3

Authentication, RBAC, authority engine, permissions, policies, security layer

Authority model, permission matrix, policy engine, threat analysis, least-privilege review

Pass 4

Business logic, workflows, services, centralized managers, domain rules

Domain model, workflow analysis, orchestration patterns, transaction boundaries

Pass 5

UI design system, CSS architecture, shared components, CRUD manager, forms, tables, filters, modals, badges

Design system audit, component inventory, reuse analysis, accessibility, consistency improvements

Pass 6

Performance, caching, storage, backup, retention, monitoring, logging, observability, disaster recovery

Performance bottlenecks, caching strategy, backup plan, health monitoring, resilience improvements

Pass 7

Complete enterprise redesign

Target architecture, migration roadmap, implementation phases, governance standards, reusable blueprint

shared components and crudmanger

This structured, multi-pass process consistently produces a far deeper reverse-engineering analysis than a single monolithic prompt and results in a reusable enterprise architecture that can serve as the foundation for all future applications.



DO NOT redesign architecture. 
DO NOT create new abstraction layers. 
DO NOT create new frameworks.
use existing CSS rules from index.css if not available then create don’t keep CSS rules inside any pages
every CSS rule kept inside index.css
all icons should kept in icon.jsx only
The platform must be designed so that:
No frontend page directly depends on any database provider.
No frontend page directly depends on any AI provider.
No frontend page directly depends on any storage provider.
No frontend page directly depends on any search provider.
Reusable Components
Reuse the existing:
•	Modal
•	Badge
•	Buttons
•	Cards
•	Tables
•	Filters
•	Search
•	Pagination
•	Color Swatches
•	Dropdowns
•	Form Controls
Do not create duplicate components.
________________________________________
CSS
Use only:
•	Existing index.css
If additional styles are required:
•	Add them to index.css.
Do not place CSS inside components or pages.
________________________________________
Icons
All new icons must be added only to:
•	icon.jsx
No inline SVGs.
No duplicate icons.
