### Gria de instalação

#### Comandando inicial 
- npm init -y
- npm i -D typescript
- npm i @types/node
- npx tsc --init
- convert ts para js: npm i -D tsx
- npm i fastify

### Instalar o eslint com padrao da rocketseat 
- npm i eslint @rocketseat/eslint-config -D
- configurar no package.json dentro de scripts "lint": "eslint src --ext .ts fix"

### Instation bd
- npm install knex sqlite3

### CLI no Knex para rodar migration
-  configurar no package.json "knex": "node --no-warnings --loader tsx ./node_modules/.bin/knex",
- npm run knex migrate:make -- create-transactions

- rorar migration
- npm run knex -- migrate:latest

- Desfaz migration, - npm run knex -- migrate:rollback

### Instalar o dot env
- npm i dotenv

### Instaler lib zod
- npm i zod


