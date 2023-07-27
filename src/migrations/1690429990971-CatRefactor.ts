import { MigrationInterface, QueryRunner } from "typeorm"

export class CatRefactor1690429990971 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "cat" RENAME COLUMN "name" TO "title"`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "cat" RENAME COLUMN "title" TO "name"`
        )
    }

}
