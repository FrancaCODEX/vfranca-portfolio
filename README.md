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

## Briefing de clientes

Página privada de indexação em `/pt/briefing` (apenas português), fora do menu e do sitemap, com `noindex, nofollow`. O endereço continua acessível por link; isso não é autenticação.

- Edite perguntas, opções, obrigatoriedade, ordem e avisos apenas em `src/content/briefing.ts`. Esse arquivo tipado gera os campos, a revisão, o schema Zod usado pelo cliente/servidor e os grupos do e-mail. Preserve os IDs `name`, `business`, `email` e `whatsapp`, usados no cabeçalho do e-mail.
- O endpoint `POST /api/briefing` usa as mesmas `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (inclusive o mesmo fallback) e `CONTACT_TO_EMAIL` do contato atual. Nenhuma variável ou dependência nova é necessária.
- O Turnstile usa as chaves já existentes: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` no build e `TURNSTILE_SECRET_KEY` no Worker. Configure ambas para ativar a proteção. O domínio do portfólio deve estar autorizado no widget. Sem as chaves, ficam ativos o honeypot, a checagem de Origin e os limites de entrada; não há rate limit próprio.
- O rascunho fica somente no localStorage desse navegador; o aceite não é restaurado. Após sucesso, o rascunho é apagado. O envio não persiste respostas no servidor, mas elas ficam na caixa de e-mail: exclua os briefings sem contrato em até 6 meses conforme o aviso.

### Verificação

1. Copie `.dev.vars.example` para `.env.local` e use as credenciais existentes (nunca faça commit delas); `npm ci && npm run dev`.
2. Abra `/pt/briefing`; confira os seis passos em 360px, 768px e desktop, nos dois temas e com Tab/Shift+Tab/Enter. Enter em input avança, textarea permite novas linhas e o envio exige o botão final.
3. Confira erros, foco no primeiro campo inválido, edição do resumo, restauração ao recarregar, armazenamento bloqueado, aceite obrigatório e falha de rede sem perder dados.
4. Envie um briefing de teste identificado como teste. Confirme na caixa `CONTACT_TO_EMAIL` o assunto, todas as respostas, o link WhatsApp e o endereço Reply-To do cliente. Confira a exclusão do rascunho.
5. Rode `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` e `npx opennextjs-cloudflare build`. O deploy continua pelo fluxo existente da `main`, após aprovação/merge do PR. Em produção repita o envio pela mesma origem do site e confirme entrega e Reply-To.

Testes automatizados de segurança/handler usam Resend simulado; eles não comprovam entrega real. Não é necessário novo DNS, domínio, conta Resend ou host.
