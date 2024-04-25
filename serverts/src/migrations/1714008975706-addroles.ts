import { MigrationInterface, QueryRunner } from "typeorm";

export class Addroles1714008975706 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("INSERT INTO roles(name) VALUES ('ROLE_USER'),('ROLE_ADMIN')");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("delete from roles where name = 'ROLE_USER' or name = 'ROLE_ADMIN'");
    }

}
