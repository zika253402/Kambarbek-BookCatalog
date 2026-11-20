# BookCatalog

A responsive book catalog built with HTML, CSS, and TypeScript. The application supports book search, category filtering, adding books with validation, browser storage, a responsive navigation menu, and light/dark themes.

## Requirements

- Node.js 20 or newer
- npm

## Installation

```bash
npm install
```

## Run the development server

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Type checking

```bash
npm run type-check
```

## Production build

```bash
npm run build
```

The production files are generated in the `dist` directory.

## Preview the production build

```bash
npm run preview
```

## TypeScript configuration

The project uses TypeScript with `strict: true`. Book data is described by interfaces and category/theme values use union types. Storage helpers use generics and validate parsed data before returning it. The project does not use the `any` type.

## Project structure

```text
BookCatalog/
├── img/
│   ├── bookbg.jpg
│   ├── ShatterMe.jpg
│   ├── TheCruelPrince.jpg
│   └── TheSongOfAchilles.jpg
├── js/
│   ├── data.ts
│   ├── filters.ts
│   ├── form.ts
│   ├── menu.ts
│   ├── render.ts
│   ├── storage.ts
│   ├── theme.ts
│   ├── types.ts
│   └── validation.ts
├── index.html
├── package.json
├── script.ts
├── style.css
├── tsconfig.json
└── vite.config.ts
```
