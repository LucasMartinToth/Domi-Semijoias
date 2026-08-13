# CLAUDE.md — Domi Semijoias · E-commerce

## O que é este projeto

E-commerce da **Domi**, marca brasileira de semijoias. Público: consumidoras no Brasil.
Idioma do site e de todo conteúdo: **português (pt-BR)**. Moeda: **BRL**.

O layout/visual é criado no **Claude Design** e entregue como referência (protótipos/specs).
Seu papel aqui é implementar e manter o código fiel a esse design — não inventar direção
visual própria sem pedir.

## Arquitetura (decidida — não alterar sem discutir)

| Peça | Tecnologia | Onde roda | Papel |
|---|---|---|---|
| Vitrine (storefront) | Next.js + TypeScript + Tailwind | Cloudflare Pages | Site público: home, catálogo, produto, carrinho, checkout |
| Motor de comércio | Medusa.js + Postgres | Railway (plano Hobby) | Produtos, variações, estoque, carrinho, pedidos, cupons, clientes + Medusa Admin |
| CMS de conteúdo | Sanity (headless, hospedado) | Nuvem do Sanity (free tier) | Banners, vitrines de destaque, textos institucionais, páginas de campanha, blog |
| Pagamentos | Mercado Pago | — | Pix, cartão parcelado, boleto — integrado ao Medusa via provider |
| DNS/CDN/SSL | Cloudflare | — | Domínio .com.br (Registro.br) com DNS na Cloudflare |
| Analytics | Cloudflare Web Analytics | — | Ativado no painel do Pages (um clique); GA4 entra depois, com tráfego pago |

Princípios da arquitetura:
- A vitrine **não guarda dados**: consome a API do Medusa (comércio) e o Sanity (conteúdo).
- **Layout vive no código**; o Sanity guarda apenas conteúdo estruturado (campos), nunca estilo.
- Maximizar páginas estáticas (SSG/ISR) — na Cloudflare, requisição estática é grátis e ilimitada;
  Functions (SSR/rotas dinâmicas) contam contra a cota de 100k requisições/dia do plano free.
  Dinâmico só onde precisa: carrinho, checkout, estoque em tempo real.

## Estrutura sugerida do repositório

Monorepo com dois apps:

```
domi/
├── apps/
│   ├── storefront/        # Next.js (deploy: Cloudflare Pages)
│   └── medusa/            # Medusa.js (deploy: Railway)
├── packages/              # tipos/utilitários compartilhados, se necessário
├── sanity/                # Sanity Studio + schemas de conteúdo
└── CLAUDE.md
```

Se o monorepo criar atrito no deploy (Pages/Railway apontando para subpastas), repositórios
separados também são aceitáveis — decidir na configuração inicial e registrar aqui.

## Deploy e ambientes

- **Git flow:** `main` = produção. Toda mudança nasce em branch própria.
- **Cloudflare Pages:** deploy automático; `main` → domínio oficial; qualquer branch → URL de
  preview automática; branch `staging` → subdomínio fixo de homologação
  (ex.: `staging.<dominio>.com.br`), protegido por Cloudflare Access.
- **Railway:** deploy automático da pasta `apps/medusa` a partir da `main`.
- **Next.js na Cloudflare:** usar o adaptador OpenNext/Cloudflare (`@opennextjs/cloudflare`).
  Esperar ajustes de configuração — é menos plug-and-play que Vercel; não usar APIs Node
  indisponíveis no runtime Workers nas rotas dinâmicas.

## Variáveis de ambiente (nunca commitar valores)

Storefront:
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` — URL do Medusa no Railway
- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
- Chave pública do Mercado Pago (checkout)

Medusa (Railway):
- `DATABASE_URL` — Postgres do próprio projeto Railway
- `JWT_SECRET`, `COOKIE_SECRET`
- Credenciais do Mercado Pago (access token — **secreto, só no servidor**)
- `STORE_CORS` / `ADMIN_CORS` — incluir domínio oficial, staging e previews

Manter `.env.example` atualizado em cada app com todas as chaves (sem valores).

## Sanity — regras dos schemas

- Schemas em código, versionados no repo (`sanity/`). Campos em pt-BR nos títulos/descrições
  do Studio (quem edita não é técnico).
- Conteúdo editável na v1: banner(s) da home, vitrine de destaques (referência a produtos por
  handle/ID do Medusa), textos institucionais (quem somos, trocas e devoluções, guia de banhos),
  páginas de campanha, posts de blog.
- O que muda com frequência vira campo editável; o estrutural fica fixo no código.
- Imagens de conteúdo: pipeline de imagens do próprio Sanity (crop/format automáticos).
- Fotos de produto: ficam no Medusa, não no Sanity.

## Pagamentos — Mercado Pago

- Integrar como payment provider do Medusa. Suportar **Pix** (essencial no Brasil),
  cartão com parcelamento e boleto.
- Webhooks de confirmação de pagamento → atualizar status do pedido no Medusa.
- Testar em modo sandbox antes de credenciais de produção.

## Convenções

- TypeScript estrito em todo o código.
- Preços sempre em centavos no backend; formatação BRL (`Intl.NumberFormat('pt-BR')`) na vitrine.
- SEO desde o início: metadata por página, Open Graph, sitemap, dados estruturados
  (Product/Offer schema.org nas páginas de produto).
- Imagens de produto otimizadas (formatos modernos, lazy loading) — semijoia vende pela foto;
  performance é requisito, não detalhe.
- Acessibilidade básica: alt em imagens, contraste, navegação por teclado no checkout.
- Commits e código comentado em português são bem-vindos; nomes de variáveis em inglês.

## Workflow de desenvolvimento

O projeto opera em três trilhas. Você (Claude Code) atua na Trilha 1; as outras duas são
autosserviço do dono da loja e **não devem depender de você nem de deploy**.

**Trilha 1 — Visual e funcionalidades (você):**
1. Toda mudança nasce em branch própria (`feat/...`, `fix/...`) — **nunca commitar direto na `main`**.
2. Push → o Cloudflare Pages gera URL de preview automática. Informe a URL ao final da tarefa
   para conferência.
3. Mudança pequena e de baixo risco: PR da branch direto para `main` após aprovação no preview.
4. Mudança grande (layout novo, checkout, integração): merge primeiro em `staging` para validação
   no subdomínio de homologação; só depois `staging` → `main`.
5. Merge na `main` = produção. Não há deploy manual.
6. Hotfix urgente: mesmo fluxo encurtado (branch → preview → merge), nunca push direto.
7. Mudanças no Medusa (backend) que alterem banco: sempre via migrations versionadas; conferir
   compatibilidade com dados existentes antes do merge.

**Trilha 2 — Operação da loja (dono, via Medusa Admin):** produtos, variações, fotos de produto,
preços, estoque, cupons, pedidos. Efeito imediato, sem deploy. Se uma tarefa sua parecer exigir
hardcode de produto/preço, pare: isso pertence ao Medusa Admin.

**Trilha 3 — Conteúdo (dono, via Sanity):** banners, destaques, textos, campanhas, blog.
Publicação imediata, sem deploy. Seu papel é garantir que os schemas existam e que os componentes
consumam o Sanity — nunca hardcodar conteúdo que já tem schema. Seção nova = primeiro schema +
componente (Trilha 1), depois edição livre na Trilha 3.

Regra geral: se a mudança pedida é de **conteúdo ou operação**, a resposta certa costuma ser
apontar o painel correto (Medusa/Sanity), não escrever código.

## Ordem de trabalho sugerida (primeiras sessões)

1. **Bootstrap:** monorepo, Medusa rodando local com Postgres, storefront Next.js base,
   Sanity Studio inicializado. `.env.example` completos.
2. **Deploy cedo:** Medusa no Railway + storefront vazio no Cloudflare Pages + branch staging.
   Validar o pipeline antes de escrever features.
3. **Catálogo:** integração storefront ↔ Medusa (listagem, página de produto com variações),
   seed de produtos de exemplo.
4. **Conteúdo:** schemas do Sanity + seções da home consumindo o CMS.
5. **Carrinho e checkout:** fluxo completo com Mercado Pago em sandbox.
6. **Lançamento:** domínio, Cloudflare Access no staging, Web Analytics, credenciais de
   produção do Mercado Pago, revisão de SEO/performance.

## O que NÃO fazer

- Não trocar peças da arquitetura (ex.: Vercel, outro CMS, outro gateway) sem discutir —
  as escolhas acima têm justificativa documentada (PDF de decisões do projeto).
- Não colocar lógica de comércio (preço, estoque, desconto) na vitrine ou no Sanity —
  isso pertence ao Medusa.
- Não criar conteúdo hardcoded para seções que já têm schema no Sanity.
- Não commitar segredos, nem usar o access token do Mercado Pago no client.
