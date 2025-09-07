# Installation

## Turborepo

<https://turborepo.com/docs/getting-started/installation>

```sh
pnpm dlx create-turbo@latest
```

## add nextjs app to turborepo

- create turbo.json
- update pnpm-workspace.yaml

```sh
mkdir apps
pnpm create next-app@latest apps/fe
pnpm install --filter=fe

```

```output
> pnpm create next-app@latest apps/fe
.../1992175b876-acd2                     |   +1 +
.../1992175b876-acd2                     | Progress: resolved 1, reused 0, downloaded 1, added 1, done
✔ Would you like to use TypeScript? … No / Yes
✔ Which linter would you like to use? › ESLint
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack? (recommended) … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
The application path is not writable, please check folder permissions and try again.
It is likely you do not have write permissions for this folder.
```

## add UI shadcn

<https://ui.shadcn.com/docs/installation/manual>

```sh
mkdir packages/ui 
cd packages/ui 
pnpm add class-variance-authority clsx tailwind-merge lucide-react tw-animate-css
```

```sh
pnpm dlx shadcn@latest add --all
```

```sh
pnpm create next-app@latest apps/be
pnpm create next-app@latest apps/cp
```
