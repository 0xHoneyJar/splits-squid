module.exports = class Data1744943274302 {
    name = 'Data1744943274302'

    async up(db) {
        await db.query(`CREATE TABLE "recipient" ("id" character varying NOT NULL, "address" text NOT NULL, "allocation" numeric NOT NULL, "split_id" character varying, CONSTRAINT "PK_9f7a695711b2055e3c8d5cfcfa1" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_fce0fdb597afa75e61451d3b3c" ON "recipient" ("split_id") `)
        await db.query(`CREATE INDEX "IDX_a2922eeb0d659efeec35c1c0eb" ON "recipient" ("address") `)
        await db.query(`CREATE TABLE "split" ("id" character varying NOT NULL, "owner" text NOT NULL, "creator" text NOT NULL, "distribution_incentive" integer NOT NULL, "total_allocation" numeric NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_a656ea46749d1567ca7e7d5923a" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_bc3af98cb6b808477ccc5a21a8" ON "split" ("owner") `)
        await db.query(`CREATE INDEX "IDX_e6b17f62f5f078a79da5b7d08a" ON "split" ("creator") `)
        await db.query(`ALTER TABLE "recipient" ADD CONSTRAINT "FK_fce0fdb597afa75e61451d3b3c1" FOREIGN KEY ("split_id") REFERENCES "split"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "recipient"`)
        await db.query(`DROP INDEX "public"."IDX_fce0fdb597afa75e61451d3b3c"`)
        await db.query(`DROP INDEX "public"."IDX_a2922eeb0d659efeec35c1c0eb"`)
        await db.query(`DROP TABLE "split"`)
        await db.query(`DROP INDEX "public"."IDX_bc3af98cb6b808477ccc5a21a8"`)
        await db.query(`DROP INDEX "public"."IDX_e6b17f62f5f078a79da5b7d08a"`)
        await db.query(`ALTER TABLE "recipient" DROP CONSTRAINT "FK_fce0fdb597afa75e61451d3b3c1"`)
    }
}
