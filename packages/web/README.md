# Web

## Getting Started

Run the development server:

```bash
cd packages/web
yarn dev
```

### DB

For DB features, web attaches to postgres via prisma. To develop locally, first add the WEB_DATABASE_URL to `packages/web/.env`. On mac it will look something like this:

```bash
WEB_DATABASE_URL="postgresql://petersugihara@localhost:5432/mailing"
```

Then run migrate to create the DB and initialize the schema.

```bash
cd packages/web
npx prisma migrate dev
```

In prod, we set MAILING_DATABASE_URL to a postgres db on neon.tech.
