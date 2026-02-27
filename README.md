# Schedule

Aplicação web para gerenciamento de tarefas e agendamentos diários. Permite visualizar, criar, editar e excluir tarefas organizadas por hora do dia, com navegação entre datas e resumo de agendamentos.

---

## Tecnologias

| Tecnologia | Motivo |
|---|---|
| **React 19** | Biblioteca principal de UI com suporte ao React Compiler para otimização automática de re-renders |
| **Vite** | Bundler moderno com HMR instantâneo e builds otimizados |
| **TypeScript** | Tipagem estática para segurança e melhor DX |
| **TanStack Router** | Roteamento type-safe com geração automática da árvore de rotas |
| **TanStack Query** | Gerenciamento de cache e estado do servidor |
| **TanStack Form** | Gerenciamento de formulários com validação integrada |
| **Zod** | Validação de esquemas de dados em formulários e APIs |
| **Tailwind CSS v4** | Estilização utility-first com design system customizado |
| **Base UI** | Componentes headless e acessíveis como base da UI |
| **dayjs** | Manipulação e formatação de datas de forma leve |
| **Biome** | Linter e formatter unificado, substituto do ESLint + Prettier |
| **Vitest + Storybook** | Testes unitários e de integração de componentes |
| **Docker + Nginx** | Containerização e proxy reverso para produção |

---

## Como rodar

### Pré-requisitos

- **Bun** (recomendado) ou **Node.js 20+** com npm/yarn
- **Docker** (opcional, para o build de produção)

### Desenvolvimento local

```bash
# Instalar dependências
bun install
# ou: npm install

# Iniciar o servidor de desenvolvimento
bun dev
# ou: npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Build de produção (local)

```bash
# Gerar o build
bun run build
# ou: npm run build

# Visualizar o build gerado
bun run serve
# ou: npm run serve
```

### Docker (build + Nginx)

Faz o build da aplicação e sobe um container com o Nginx servindo os arquivos estáticos e atuando como proxy reverso.

```bash
bun run docker:build
# ou: npm run docker:build
```

A aplicação ficará disponível em `http://localhost:5174`.

> O comando equivale a `docker compose -f ./docker/prod/docker-compose.yml up -d --build --remove-orphans`.

---

## Scripts disponíveis

| Script | Descrição |
|---|---|
| `bun dev` | Servidor de desenvolvimento com HMR |
| `bun run build` | Build de produção |
| `bun run serve` | Preview do build de produção |
| `bun run lint` | Verificação de tipos (tsc) + lint (Biome) |
| `bun run format` | Formata o código com Biome |
| `bun run test` | Executa todos os testes |
| `bun run test:unit` | Apenas testes unitários |
| `bun run storybook:dev` | Storybook em modo desenvolvimento |
| `bun run docker:build` | Build e start via Docker + Nginx |

---

## Estrutura de pastas

```
src/
├── components/          # Componentes globais e reutilizáveis
│   ├── misc/            # Pequenos elementos visuais (logo, ícones, etc.)
│   └── ui/              # Sistema de design (Button, Card, Dialog, etc.)
├── core/                # Constantes e dados centrais da aplicação
├── hooks/               # Custom hooks genéricos
├── lib/                 # Configurações de bibliotecas (dayjs, tanstack-query, etc.)
├── modules/             # Funcionalidades organizadas por domínio
│   ├── form/            # Abstração de formulários (campos, contexto, lib)
│   ├── notification/    # Sistema de notificações
│   ├── schedule/        # Lógica e componentes do agendamento
│   ├── tasks/           # API, componentes e constantes de tarefas
│   └── theme/           # Tema claro/escuro
├── routes/              # Páginas (file-based routing via TanStack Router)
├── schemas/             # Esquemas Zod de validação
├── types/               # Tipos globais e arquivos gerados
└── utils/               # Funções utilitárias puras
```
