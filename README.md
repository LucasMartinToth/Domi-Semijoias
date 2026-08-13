# Domi Semijoias — E-commerce

Monorepo do e-commerce da **Domi** (semijoias, pt-BR / BRL). Arquitetura e
convenções completas estão no [CLAUDE.md](./CLAUDE.md) — leia antes de mexer.

## Peças

| Pasta | O que é | Roda em |
|---|---|---|
| `apps/storefront` | Vitrine — Next.js 16 + TypeScript + Tailwind v4 | `localhost:3000` |
| `apps/medusa` | Motor de comércio — Medusa v2 + Postgres + Admin | `localhost:9000` (Admin em `/app`) |
| `sanity` | CMS de conteúdo — Sanity Studio | `localhost:3333` |
| `packages` | Utilitários/tipos compartilhados (quando necessário) | — |

> O monorepo **não usa npm workspaces**: cada app tem seu próprio `node_modules`
> (Medusa/Next/Sanity não convivem bem com hoisting). A raiz só tem scripts de
> conveniência.

## Pré-requisitos

- **Node.js ≥ 20** (recomendado 20 ou 22; testado aqui com 24).
- **Git**.
- Um **Postgres**. Em dev usamos um projeto no **Supabase** (nuvem) — não é
  preciso instalar Postgres nem Docker. A `DATABASE_URL` vai no `apps/medusa/.env`.
- Conta no **Sanity** (grátis) para criar o projeto de conteúdo.

## Variáveis de ambiente

Cada app tem um `.env.example`. Copie e preencha (os `.env` reais estão no
`.gitignore` — **nunca** commite segredos):

```bash
cp apps/storefront/.env.example apps/storefront/.env.local
cp apps/medusa/.env.example     apps/medusa/.env
cp sanity/.env.example          sanity/.env
```

## Como rodar

### 1. Storefront (vitrine)

```bash
npm --prefix apps/storefront install
npm --prefix apps/storefront run dev
```
Abre em `http://localhost:3000`. Hoje mostra a **home placeholder** que exercita
o design system (ver seção abaixo).

### 2. Medusa (comércio + Admin)

```bash
npm --prefix apps/medusa install
# 1. configure apps/medusa/.env (DATABASE_URL do Supabase, DATABASE_SSL=true, segredos)
npm --prefix apps/medusa exec medusa db:migrate   # cria o schema no banco
npm --prefix apps/medusa run seed                 # dados de exemplo (regiões, etc.)
# cria um usuário admin:
npm --prefix apps/medusa exec medusa user -- -e admin@domi.com.br -p suaSenhaForte
npm --prefix apps/medusa run dev
```
- API em `http://localhost:9000`
- **Medusa Admin** em `http://localhost:9000/app`
- Depois, no Admin: **Settings → Publishable API Keys** — copie a chave para
  `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` no storefront.

### 3. Sanity (conteúdo)

```bash
npm --prefix sanity install
npm --prefix sanity exec sanity login      # autentica na sua conta
npm --prefix sanity exec sanity init --env # cria/associa o projeto e gera .env
npm --prefix sanity run dev
```
Studio em `http://localhost:3333`. Ainda sem schemas definitivos — só a base.

### Atalhos na raiz

```bash
npm run dev:storefront   # = npm --prefix apps/storefront run dev
npm run dev:medusa
npm run dev:sanity
npm run install:all      # instala os três de uma vez
```

## Design system (extraído do handoff)

O visual vem do **Claude Design** (`design_handoffs/home.zip`). O que já está no
código (`apps/storefront/src/app/globals.css` + `layout.tsx`):

- **Cores** (tokens Tailwind): `brand #96695e`, `cream #ece9e5`, `ink #2b201c`,
  `porcelain #f6f2ee`, `body`, `muted`, `subtle`, `nav`, `rose`.
- **Tipografia**: serifada de display **EB Garamond** (fallback de *TAN Twinkle*,
  a fonte de marca a ser licenciada/hospedada) + **Inter** para UI/texto.
- **Placeholders de imagem**: utilitários `.stripe-product` / `.stripe-hero` /
  `.stripe-brand` / `.stripe-dark` (faixas diagonais em CSS, trocáveis por foto).
- **Logo**: `public/domi-logo.svg`, colorida por máscara CSS (`.domi-logo-mask`).
- **Estética**: cantos retos (raio 0), exceto badges (`--radius-badge`).

## Workflow

`main` = produção. Toda mudança nasce em branch própria (`feat/…`, `fix/…`) —
ver as três trilhas no [CLAUDE.md](./CLAUDE.md). Conteúdo é editado no Sanity e
operação da loja (produtos, preços, estoque) no Medusa Admin — sem deploy.
