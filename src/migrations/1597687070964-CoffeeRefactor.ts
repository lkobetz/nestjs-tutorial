import {MigrationInterface, QueryRunner} from "typeorm";

export class CoffeeRefactor1597687070964 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
          `ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`,
        );
      }

      public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
          `ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`,
        );
      }
}

/* RUNNING MIGRATIONS */

/**
 * 💡 Remember 💡
 * You must BUILD your Nest project (so that everything is output to the `/dist/` folder,
 * before a Migration can run, it needs compilated files.
 */

// // Compile project first
// npm run build

// // Run migration(s)
// npx typeorm migration:run

// // REVERT migration(s)
// npx typeorm migration:revert

// // Let TypeOrm generate migrations (for you)
// npx typeorm migration:generate -n SchemaSync
