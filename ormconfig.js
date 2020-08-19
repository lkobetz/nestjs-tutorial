module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  // migrations are for production mode when we can't rely on 'synchronize: true' from app.module.ts
  // they help us rename our existing column and maintain all of our previous data
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

// Creating a TypeOrm Migration
// npx typeorm migration:create -n CoffeeRefactor
// CoffeeRefactor being the NAME we are giving "this" migration
