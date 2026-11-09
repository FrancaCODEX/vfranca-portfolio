# vfranca — portfólio

Portfólio pessoal de **Vinicius França**, desenvolvedor back-end.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · MDX · Cloudflare Workers (OpenNext) · Resend · Turnstile

## Rodando localmente

```bash
npm install
npm run dev          # http://localhost:3000
```

Outros comandos:

| Comando | O que faz |
|---|---|
| `npm run lint` | ESLint |
| `npm run typecheck` | Checagem de tipos |
| `npm test` | Testes (Vitest) |
| `npm run preview` | Build da Cloudflare e preview local no runtime real (workerd) |
| `npm run deploy` | Build e deploy na Cloudflare |

## Atualizando o conteúdo

Não precisa mexer em componentes, só nos arquivos de `src/content/`:

| O que | Onde |
|---|---|
| Dados pessoais, links, experiência, serviços, stack | `src/content/profile.ts` |
| Graduação e certificados | `src/content/education.ts` (arquivos em `public/certificados/`) |
| Cards de projetos | `src/content/projects.ts` |
| Estudos de caso | `src/content/projects/<slug>.pt.mdx` e `<slug>.en.mdx` |
| Textos da interface (PT/EN) | `src/i18n/dictionaries.ts` |
| CV para download | `public/cv-vinicius-franca.pdf` |

**Adicionar um certificado:** copie uma entrada em `certificates` (`education.ts`), cole o link de verificação da Alura e use `featured: true` para que ele apareça na Home.

## Deploy (Cloudflare)

1. Crie uma conta gratuita na Cloudflare.
2. Gere um API Token com o template **"Edit Cloudflare Workers"**.
3. No GitHub, vá em **Settings → Secrets and variables → Actions** e adicione:
   - Secrets: `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID`
   - Variables (opcionais): `NEXT_PUBLIC_TURNSTILE_SITE_KEY` e `NEXT_PUBLIC_SITE_URL`
4. A cada push na `main`, o GitHub Actions roda os testes e publica o site.

### Formulário de contato

1. Crie uma conta no [Resend](https://resend.com) e gere uma API key.
2. (Anti-spam) Crie um widget do Turnstile no painel da Cloudflare.
3. Configure os segredos no Worker:
   ```bash
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put TURNSTILE_SECRET_KEY
   ```
`CONTACT_TO_EMAIL` fica em `wrangler.jsonc`. Para testar localmente, copie `.dev.vars.example` para `.env.local`.
